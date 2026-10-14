// Home page content for Pinaakini Infra. Items marked SAMPLE / CONFIRM must be checked
// with the client before launch (PRD §5.1, §18).

export const FILM = {
  frames: 394,
  base: { desktop: "/film/d/", phone: "/film/m/" },
  poster: "/film/d/000.webp",
};

export const home = {
  hero: {
    kicker: "Pinaakini Infra · Nellore",
    title: ["Building Spaces.", "Creating Futures."],
    line: "Villas, triplex homes, plotted layouts and farmland in and around Nellore, Andhra Pradesh.",
    primary: { label: "Explore properties", href: "#properties" },
    secondary: { label: "Schedule a site visit" },
    // Lines that appear as the film moves (scroll progress 0..1).
    beats: [
      { at: [0.22, 0.42], kicker: "Villas", text: "Homes designed around light, water and privacy." },
      { at: [0.48, 0.68], kicker: "Craft", text: "Stone, glass and timber, finished to last generations." },
      { at: [0.74, 0.94], kicker: "Nellore", text: "Developed in the city we call home." },
    ],
  },

  // CONFIRM: figures must come from the client before launch.
  stats: [
    { value: 350, suffix: "+", label: "Acres developed" },
    { value: 2400, suffix: "+", label: "Families settled" },
    { value: 15, suffix: "", label: "Projects delivered" },
    { value: 4, suffix: "", label: "Kinds of property" },
  ],

  about: {
    kicker: "About Pinaakini",
    heading: "A Nellore developer, building for the long term",
    body: [
      "Pinaakini Infra Private Limited develops residential layouts, plotted communities, villas, triplex homes and farmland across Nellore and its growth corridors.",
      "Every project is planned, built and handed over by our own team, so the people you meet on a site visit are the people who answer for it afterwards.",
    ],
    cta: { label: "Our story", href: "/about" },
    images: { main: "/img/hero.webp", inset: "/img/living.webp" },
  },

  categories: [
    { name: "Villas", note: "Private homes with gardens and pools", image: "/img/evening.webp", href: "/properties?category=Villas" },
    { name: "Triplex Houses", note: "Three-level family homes in gated communities", image: "/img/terrace.webp", href: "/properties?category=Triplex%20Houses" },
    { name: "Layouts", note: "Approved plots with roads and utilities", image: "/world/paddy-palms.webp", href: "/properties?category=Layouts" },
    { name: "Farmlands", note: "Managed farmland on the edge of the city", image: "/world/paddy.webp", href: "/properties?category=Farmlands" },
  ],

  signature: {
    kicker: "The Pinaakini approach",
    heading: "Designed for the way you live",
    body: "Generous rooms, open frontage and gardens that carry the house outdoors. We plan every home and every plot for light, air and the evenings you will spend there.",
    images: ["/img/facade.webp", "/img/pool.webp", "/img/path.webp"],
  },

  pillars: [
    { title: "Every kind of property", text: "Villas, triplex homes, plotted layouts and farmland, from one developer you can visit in person." },
    { title: "Rooted in Nellore", text: "We build in and around the city we live in, along its growing road corridors." },
    { title: "A curated portfolio", text: "We take on a few projects at a time and see each one through to handover." },
    { title: "Personal site visits", text: "Our team meets you on site, walks the property with you and answers every question." },
  ],

  // SAMPLE: replace with approved quotes from real Pinaakini clients.
  testimonials: {
    note: "Sample testimonials shown for layout; to be replaced with approved client quotes.",
    items: [
      {
        quote: "From the first site visit to registration, the team explained every step and every document. We moved into our villa exactly as promised.",
        name: "Client name",
        detail: "Villa owner, Nellore",
        image: "/img/living.webp",
      },
      {
        quote: "We bought a plot for our parents' retirement home. The layout, the roads and the paperwork were all clear from day one.",
        name: "Client name",
        detail: "Plot owner, Podalakur Road",
        image: "/img/garden.webp",
      },
      {
        quote: "We visited three developers before choosing Pinaakini. They were the only ones who walked the land with us themselves.",
        name: "Client name",
        detail: "Farmland buyer, Nellore district",
        image: "/world/paddy.webp",
      },
    ],
  },

  cta: {
    heading: "Find the right space for your future",
    body: "Tell us what you are looking for and when you would like to visit. We will arrange everything else.",
    image: "/img/evening.webp",
  },
};

// Open-licence photographs of Nellore used for land projects.
export const credits = [
  { title: "Paddy fields, Nellore", by: "Ramakrishna Reddy Y", licence: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/w/index.php?curid=33417395" },
  { title: "Nellore paddy field", by: "Vijay Kumar Yerra", licence: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/w/index.php?curid=44998410" },
  { title: "Mypadu beach-sunrise", by: "ManojKRacherla", licence: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/w/index.php?curid=49824567" },
  { title: "Penna river near Nellore", by: "రహ్మానుద్దీన్", licence: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Penna_river_near_Nellore.jpg" },
];
