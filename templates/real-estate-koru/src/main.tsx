import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './sections.css';

/* StrictMode kapalı: effect'ler iki kez çalışınca GSAP zaman çizelgeleri
   üst üste biniyor. Pazarlama sitesi, ihtiyaç yok. */
createRoot(document.getElementById('root')!).render(<App />);
