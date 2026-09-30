import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { reduceMotion } from '../lib/anim';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Hover'da sıvı gibi dalgalanan + RGB'si ayrışan görsel.
 * uProgress 0→1 hover, uMouse imlecin plaka içindeki konumu.
 * uCover, görseli CSS'teki object-fit:cover gibi kırpar.
 */
const FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D uTex;
  uniform vec2  uCover;
  uniform vec2  uMouse;
  uniform float uProgress;
  uniform float uTime;
  uniform float uScroll;

  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv - 0.5) / uCover + 0.5;

    // İmleçten uzaklaştıkça sönen dalga
    float d = distance(uv, uMouse);
    float ring = sin(d * 22.0 - uTime * 2.6) * 0.5 + 0.5;
    float falloff = smoothstep(0.62, 0.0, d);
    vec2 dir = normalize(uv - uMouse + 1e-5);

    vec2 offset = dir * ring * falloff * 0.028 * uProgress;

    // Scroll hızına bağlı dikey esneme
    offset.y += uScroll * 0.05 * sin(uv.x * 3.1415);

    // Kanal ayrıştırma — hover arttıkça açılır
    float split = 0.006 * uProgress * falloff;
    float r = texture2D(uTex, uv + offset + vec2(split, 0.0)).r;
    float g = texture2D(uTex, uv + offset).g;
    float b = texture2D(uTex, uv + offset - vec2(split, 0.0)).b;

    vec3 col = vec3(r, g, b);

    // Hover'da hafif parlaklık ve doygunluk artışı
    float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(vec3(lum), col, 1.0 + 0.35 * uProgress);
    col *= 1.0 + 0.06 * uProgress;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function DistortImage({
  src,
  alt = '',
  className = '',
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const fallback = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || reduceMotion()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      return; // WebGL yoksa <img> fallback'i zaten ekranda
    }

    let raf = 0;
    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uCover: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    scene.add(mesh);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.className = 'distort__canvas';
    el.appendChild(canvas);

    let imgAspect = 1;

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      // object-fit: cover hesabı
      const boxAspect = width / height;
      if (boxAspect > imgAspect) uniforms.uCover.value.set(1, imgAspect / boxAspect);
      else uniforms.uCover.value.set(boxAspect / imgAspect, 1);
    };

    new THREE.TextureLoader().load(src, (tex) => {
      if (disposed) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      imgAspect = tex.image.width / tex.image.height;
      uniforms.uTex.value = tex;
      resize();
      el.dataset.ready = '1';
    });

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let target = 0;
    let lastScroll = window.scrollY;
    let scrollVel = 0;

    const onEnter = () => (target = 1);
    const onLeave = () => (target = 0);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      uniforms.uMouse.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointermove', onMove);

    const clock = new THREE.Clock();
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || !uniforms.uTex.value) return;

      const v = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      scrollVel += (Math.max(-90, Math.min(90, v)) / 90 - scrollVel) * 0.08;

      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uScroll.value = scrollVel;
      uniforms.uProgress.value += (target - uniforms.uProgress.value) * 0.075;

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointermove', onMove);
      uniforms.uTex.value?.dispose();
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      renderer.dispose();
      canvas.remove();
      delete el.dataset.ready;
    };
  }, [src]);

  return (
    <div className={`distort ${className}`} ref={host}>
      <img src={src} alt={alt} ref={fallback} loading="lazy" className="distort__img" />
    </div>
  );
}
