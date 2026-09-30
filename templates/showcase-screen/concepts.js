// One block = one concept (one video). Add a block, drop its images into img/.
// Open: index.html?c=<key>   (defaults to the first concept)   ·   ?loop=6 changes the slide length in seconds
window.CONCEPTS = {
  grill: {
    brand: "EMBER & OAK",
    tagline: "wood-fire grill · since 1998",
    menu: ["Menu", "Our story", "Locations", "Contact"],
    eyebrow: "Wood fire, fresh every day",
    title: ["Flavour", "born of fire."],          // line 2 renders in italic accent colour
    text: "Hand-carved meat, charred peppers and warm flatbread. Your table is ready.",
    cta: "Explore the menu",
    button: "Order now",
    card: { title: "Plate of the day", text: "Carved grill, charred vegetables, ayran" },
    images: ["img/grill-1.jpg", "img/grill-2.jpg"],
    theme: { bg: "#1a0f0a", bg2: "#3a1d10", accent: "#f08a3c", ink: "#f6ead8" },
    particles: "sparks",                            // sparks · dust · bokeh
  },
  barber: {
    brand: "CRAFT",
    tagline: "gentlemen's barber · est. 2004",
    menu: ["Services", "Barbers", "Gallery", "Booking"],
    eyebrow: "Scissors, razor and patience",
    title: ["Every cut", "a signature."],
    text: "Twenty years of steady hands, a hot towel and exactly the line you asked for.",
    cta: "See services",
    button: "Book now",
    card: { title: "Classic cut + beard", text: "45 min · hot towel included" },
    images: ["img/barber-1.jpg", "img/barber-2.jpg", "img/barber-3.jpg"],
    theme: { bg: "#0e0e0f", bg2: "#262320", accent: "#c9a46a", ink: "#efe8dc" },
    particles: "dust",
  },
  estate: {
    brand: "GROVE",
    tagline: "residences · waterfront",
    menu: ["Project", "Homes", "Location", "Contact"],
    eyebrow: "Above the city, inside nature",
    title: ["A life filled", "with light."],
    text: "Three towers, 42 floors, every living room facing the sunset. Completion spring 2027.",
    cta: "View residences",
    button: "Book a visit",
    card: { title: "3 bed · 165 m²", text: "Sea view · 28th floor" },
    images: ["img/estate-1.jpg", "img/estate-2.jpg", "img/estate-3.jpg"],
    theme: { bg: "#0a0f1c", bg2: "#1c2540", accent: "#e7b56a", ink: "#eef1f7" },
    particles: "bokeh",
  },
};
