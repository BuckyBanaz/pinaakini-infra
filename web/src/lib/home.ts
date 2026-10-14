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
    title: ["Exceptional living", "in Nellore"],
    line: "A considered collection of villas, triplex homes, plotted layouts and farmland across Nellore, chosen for location, design and the way you want to live.",
    primary: { label: "Explore our collection", href: "#collection" },
    secondary: { label: "Speak with an advisor" },
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

  intro: {
    statement:
      "Pinaakini Infra develops homes and land across Nellore, and advises landowners, developers and buyers on theirs. One team, from the first survey to the final handover.",
  },

  // CONFIRM: the client should check this list of consultancy services.
  services: {
    develop: {
      kicker: "We develop",
      title: "Homes and land of our own",
      text: "Villas, triplex homes, plotted layouts and farmland, planned, built and sold by Pinaakini.",
      items: ["Villas", "Triplex houses", "Residential layouts", "Farmland"],
      cta: { label: "See properties", href: "/properties" },
      image: "/img/facade.webp",
    },
    consult: {
      kicker: "We consult",
      title: "Real estate consultancy",
      text: "For landowners, developers and buyers who want an experienced Nellore team on their side.",
      items: ["Land identification and due diligence", "Layout planning and approvals guidance", "Project marketing and sales", "Investment advice for buyers"],
      cta: { label: "Talk to a consultant" },
      image: "/world/paddy-palms.webp",
    },
  },

  // SAMPLE slots: add each brand the client has worked with as { name, logo } (logo in /public/partners).
  partners: {
    heading: "Brands we have worked with",
    note: "Partner logos will appear here once the client shares the list.",
    items: [] as { name: string; logo?: string }[],
    slots: 8,
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
  { title: "Sri Ranganathaswamy Temple, Galigopuram, Nellore", by: "YVSREDDY", licence: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/w/index.php?curid=19123966" },
  { title: "Penna river near Nellore", by: "రహ్మానుద్దీన్", licence: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Penna_river_near_Nellore.jpg" },
];

// ---- Lumera-style home sections ----
export const lux = {
  considered: {
    heading: ["Real estate,", "rooted in Nellore"],
    body: [
      "We believe the right property starts with understanding how you want to live, where your family works, studies and grows.",
      "From gated villa communities to approved plots and managed farmland, we bring together properties chosen with care and explain every step plainly.",
    ],
  },
  ovals: [
    { title: "Villas", text: "Private homes with gardens, terraces and pools.", image: "/img/evening.webp" },
    { title: "Triplex houses", text: "Three-level family homes in gated communities.", image: "/img/terrace.webp" },
    { title: "Residential layouts", text: "Plots with roads, drainage and utilities in place.", image: "/world/paddy-palms.webp" },
    { title: "Farmland", text: "Managed farmland on the edge of the city.", image: "/world/paddy.webp" },
    { title: "Consultancy", text: "Advice for landowners, developers and buyers.", image: "/img/living.webp" },
  ],
  statement: "Homes and land where every morning begins with open sky, wide roads and room to grow.",
  downloads: ["Download brochure", "Download layout plan", "Download price list", "Download site map", "Request documents"],
  // SAMPLE amenities: confirm per project.
  amenities: [
    { label: "Private pools", image: "/img/pool.webp" },
    { label: "Landscaped gardens", image: "/img/garden.webp" },
    { label: "Gated entrances", image: "/img/entrance.webp" },
    { label: "Open terraces", image: "/img/terrace.webp" },
    { label: "Stone pathways", image: "/img/path.webp" },
    { label: "Lit facades", image: "/img/facade.webp" },
  ],
  rooms: {
    heading: "Every Pinaakini home is shaped by light, proportion and lasting materials, so it feels as good in twenty years as it does on the first day.",
    body: "From generous living rooms to terraces that face the evening sky, each space is planned before a single wall goes up.",
    cards: [
      { label: "Living room", image: "/img/living.webp" },
      { label: "Dining", image: "/img/dining.webp" },
      { label: "Terrace", image: "/img/terrace.webp" },
      { label: "Poolside", image: "/img/pool.webp" },
    ],
  },
  core: {
    heading: "Core services",
    text: "Two sides of one team: we develop our own projects and advise others on theirs.",
    left: { title: "We develop", items: ["Villas", "Triplex houses", "Residential layouts", "Farmland", "Site visits on request"] },
    right: { title: "We consult", items: ["Land identification", "Due diligence", "Layout planning guidance", "Project marketing and sales", "Investment advice"] },
    image: "/img/facade.webp",
  },
  experience: {
    words: ["Better way to", "own land", "in Nellore"],
    image: "/world/paddy-palms.webp",
    body: "We look beyond the listing to what makes a property worth owning: its location, its title, its roads and its long-term value. The result is a calmer buying journey, built on clear information.",
  },
  // CONFIRM: figures must come from the client.
  numbers: ["350+ acres developed", "2,400+ families settled", "15+ projects delivered"],
  faq: [
    { q: "Where are Pinaakini projects located?", a: "In and around Nellore, Andhra Pradesh, along roads such as Podalakur Road, the NH 16 bypass, Venkatachalam and Muthukur Road. The map above shows every project." },
    { q: "What types of property do you offer?", a: "Villas, triplex houses, residential plots in approved layouts, and managed farmland. Some completed homes are also available to rent." },
    { q: "Do you offer real estate consultancy?", a: "Yes. We advise landowners, developers and buyers on land identification, due diligence, layout planning, marketing and sales." },
    { q: "How do I arrange a site visit?", a: "Use any Book a visit button, call us or send a WhatsApp message. Our team will fix a time and meet you on site." },
    { q: "Can I get brochures, layout plans and prices?", a: "Yes. Request them for any project and we will share the latest documents and pricing." },
    { q: "Do you help with home loans?", a: "Ask our team about the banks we work with for the project you are interested in." },
  ],
  nearby: [
    { name: "Penna river", note: "The river our name comes from", image: "/world/penna.webp" },
    { name: "Mypadu beach", note: "Nellore's coastline", image: "/world/mypadu.webp" },
    { name: "Ranganathaswamy temple", note: "Nellore's landmark temple", image: "/world/gopuram.webp" },
    { name: "Paddy country", note: "The green belt around the city", image: "/world/paddy.webp" },
  ],
  invest: {
    heading: ["Invest in", "Nellore's next address"],
    text: "Own land or a home in one of Andhra Pradesh's growing coastal cities, with a developer who builds, sells and answers for every project.",
  },
  cta: {
    heading: "Some properties need to be experienced in person",
    text: "Tell us what you are looking for and our team will walk you through the homes and plots that fit your plans.",
    images: ["/img/hero.webp", "/img/living.webp", "/img/pool.webp", "/world/paddy-palms.webp"],
  },
};
