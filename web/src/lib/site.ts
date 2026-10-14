// Central, editable site configuration and branding for Pinaakini Infra Private Limited.
export const site = {
  company: "Pinaakini Infra",
  legalName: "Pinaakini Infra Private Limited",
  tagline: "Prime villas & plotted developments in India",
  domain: "pinakiniinfra.com",
  location: "Nellore, Andhra Pradesh, India",
  project: "Pinaakini Infra",
  villaName: "AVARIA Signature Villa",

  nav: [
    { label: "Available Properties", href: "/properties" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Representative showcase specifications
  stats: [
    { value: "350+", unit: "Acres", label: "Land Developed" },
    { value: "2,400+", label: "Happy Families" },
    { value: "100%", label: "Title Clearances" },
  ],

  overview: {
    eyebrow: "Pinaakini Development Philosophy",
    body: [
      "Wrapped in glass, travertine stone and warm evening light, Pinaakini Infra presents a signature residence designed around the way its rooms open to the water. Living spaces flow out to a private pool terrace, while the upper level frames the landscape through floor-to-ceiling glazing.",
      "Every development has been reconsidered: calm natural materials, generous 14ft ceiling heights, underground utilities, and strict municipal compliance ensuring lasting generational value.",
    ],
  },

  features: [
    {
      title: "4BR + Maid Room Villa",
      text: "Four en-suite bedrooms with a separate maid's room, planned for privacy across two levels.",
      image: "/img/terrace.webp",
      alt: "Upper level of the villa with floor-to-ceiling glass and a glazed balcony",
    },
    {
      title: "Private Pool Lifestyle",
      text: "A still, reflecting pool runs the length of the living spaces, steps from every lounge.",
      image: "/img/pool.webp",
      alt: "Illuminated private pool in front of the villa's open living room at dusk",
    },
    {
      title: "Modern Kitchen",
      text: "A clean-lined kitchen and dining zone that opens straight onto the terrace for easy entertaining.",
      image: "/img/kitchen.webp",
      alt: "Warmly lit ground-floor interior seen through full-height glass doors",
    },
    {
      title: "Bright Open Interiors",
      text: "Full-height glazing and open plans draw daylight deep into the house and the view in.",
      image: "/img/facade.webp",
      alt: "Glass and stone facade of the villa glowing with interior light",
    },
  ],

  spaces: [
    { title: "Living room", text: "Low, layered seating facing the reflecting pool.", image: "/img/living.webp" },
    { title: "Garden retreat", text: "Mature trees and botanical planting framing the sunset.", image: "/img/garden.webp" },
    { title: "Stone garden path", text: "Stepping stones and soft planting along the water.", image: "/img/path.webp" },
    { title: "Dining pavilion", text: "An open dining room that faces the evening sky.", image: "/img/dining.webp" },
    { title: "Arrival court", text: "A quiet drive framed by mature avenue trees.", image: "/img/entrance.webp" },
    { title: "Evening facade", text: "The entire villa glows at dusk like an architectural lantern.", image: "/img/evening.webp" },
  ],

  faq: [
    {
      q: "How do I arrange a private site viewing?",
      a: "Contact our sales coordination desk via phone or WhatsApp, and we will schedule an exclusive chauffeur-driven visit from Nellore town center at your convenience.",
    },
    {
      q: "Can I receive layout plans and brochures?",
      a: "Yes. Send an enquiry through our properties or contact form, and our sales team will dispatch certified high-resolution CAD layouts, sanctions, and specification brochures.",
    },
    {
      q: "Who is developing these properties?",
      a: "Pinaakini Infra Private Limited — premier regional real estate developer headquartered on Grand Trunk Road, Nellore, Andhra Pradesh.",
    },
    {
      q: "Are all layouts approved by DTCP and NUDA?",
      a: "Yes. Pinaakini Infra adheres strictly to statutory planning guidelines. All residential plotted developments carry approved layouts from DTCP and NUDA with clear, marketable title deeds.",
    },
  ],

  contact: {
    phone: "+91 94402 89999",
    phoneHref: "tel:+919440289999",
    whatsappHref: "https://wa.me/919440289999",
    email: "enquiries@pinakiniinfra.com",
    address: "Door No. 24/2/145, Grand Trunk Road, Near RTC Complex, Dargamitta, Nellore, Andhra Pradesh 524003",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Trunk+Road+Nellore+Andhra+Pradesh",
    workingHours: "Monday to Sunday: 9:00 AM – 7:30 PM",
  },

  social: [
    { name: "Instagram", href: "https://instagram.com/pinaakiniinfra" },
    { name: "Facebook", href: "https://facebook.com/pinaakiniinfra" },
    { name: "YouTube", href: "https://youtube.com/@pinaakiniinfra" },
    { name: "LinkedIn", href: "https://linkedin.com/company/pinaakiniinfra" },
  ],
} as const;

export const FRAME_COUNT = 220;
