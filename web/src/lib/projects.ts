import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  // 1. ACTIVE HERO RESIDENCE
  {
    id: "avaria-villa",
    slug: "avaria-signature-villa",
    name: "AVARIA Signature Villa",
    tagline: "Ultra-luxury modern 4BR villa with private infinity pool living",
    category: "Villas",
    status: "Now Selling",
    offer: ["Buy"],
    location: "South Enclave, Nellore Corridor, AP",
    extent: "7,750 sqft",
    units: "Exclusive Single Residence",
    featuredImage: "/img/hero.webp",
    gallery: [
      "/img/hero.webp",
      "/img/living.webp",
      "/img/pool.webp",
      "/img/terrace.webp",
      "/img/kitchen.webp",
      "/img/facade.webp",
      "/img/evening.webp",
    ],
    shortDescription:
      "A signature residence composed in glass, Roman travertine stone, and water. Features 14ft ceiling heights, reflecting pool terrace, and automated ambient lighting.",
    description: [
      "Wrapped in glass, travertine stone and warm evening light, Pinaakini Infra presents AVARIA, an upgraded four-bedroom villa designed around the way its rooms open to the water.",
      "Living spaces flow out to a private reflecting pool terrace, while the upper level frames the landscape through floor-to-ceiling glazing. Every surface has been reconsidered: calm natural materials, generous 14ft ceiling heights, and automated lighting that turns the whole residence into an architectural lantern at dusk.",
      "The residence integrates modern energy efficiency, discreet service quarters, and private manicured perimeter landscaping to guarantee utmost tranquility.",
    ],
    keyHighlights: [
      {
        title: "Private Pool Lifestyle",
        description: "A 25-meter reflecting pool runs along the full length of the primary living space.",
      },
      {
        title: "Four En-Suite Bedrooms",
        description: "Generous bedroom suites with walk-in dressing rooms, marble baths, and private balconies.",
      },
      {
        title: "Chef's Exhibition Kitchen",
        description: "Fully fitted imported cabinetry with seamless indoor-to-alfresco entertaining terrace.",
      },
      {
        title: "Discreet Staff Quarters",
        description: "Independent service entrance, utility room, and ensuite staff accommodation.",
      },
    ],
    specifications: [
      { label: "Built-up Area", value: "7,750 sq.ft" },
      { label: "Plot Dimension", value: "60 x 80 ft (East Facing)" },
      { label: "Bedrooms", value: "4 Ensuite Bedrooms + Powder Room" },
      { label: "Ceiling Height", value: "14 ft Clear Volume" },
      { label: "Structure", value: "Earthquake-resistant RCC Framed" },
      { label: "Approval Status", value: "Sanctioned Clear Title Plan" },
    ],
    clearance: "Sanctioned Plan with 100% Clear Title",
    brochureUrl: "#brochure",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123800.74108871676!2d79.91929384750106!3d14.442598717838127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf2b9d901b0f7%3A0xc34125a2df6a012a!2sNellore%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Nellore%2C+Andhra+Pradesh",
    featured: true,
    isActive: true,
    priceGuide: "Price on Application",
    seoTitle: "AVARIA Signature Villa | Luxury 4BR Residence in Nellore",
    seoDescription:
      "Explore AVARIA by Pinaakini Infra. Ultra-luxury four-bedroom villa with private pool living, travertine finishes, and floor-to-ceiling glass in Nellore.",
  },

  // 2. ACTIVE PLOTTED TOWNSHIP
  {
    id: "emerald-bay",
    slug: "pinaakini-emerald-bay",
    name: "Pinaakini Emerald Bay",
    tagline: "DTCP Approved 28-Acre Plotted Community along Podalakur Road",
    category: "Layouts",
    status: "Now Selling",
    offer: ["Buy"],
    location: "Podalakur Main Road, Nellore, AP",
    extent: "28 Acres",
    units: "220 Approved Plots",
    featuredImage: "/world/paddy.webp",
    gallery: ["/img/facade.webp", "/img/entrance.webp", "/img/path.webp", "/img/garden.webp"],
    shortDescription:
      "A gated plotted layout featuring 40ft wide blacktop roads, underground storm drainage, central water reservoir, and 100% Vaastu-compliant plots with immediate spot registration.",
    description: [
      "Pinaakini Emerald Bay is an approved 28-acre master-planned residential layout positioned on the rapidly growing Podalakur Road corridor in Nellore.",
      "Engineered with subterranean utilities, landscaped central parks, children's play zones, and street lighting, the community provides a secure, ready-to-construct foundation for custom family villas.",
      "Clear legal titles, strict DTCP & NUDA sanction compliance, and immediate registration ensure complete peace of mind for prospective homeowners and investors.",
    ],
    keyHighlights: [
      {
        title: "40ft & 33ft BT Roads",
        description: "Heavy-duty blacktop avenue roads with curb stones and tree-lined pedestrian walkways.",
      },
      {
        title: "Underground Infrastructure",
        description: "Concealed storm water drains and underground electrical conduits for an unblemished skyline.",
      },
      {
        title: "Botanical Parks & Play Courts",
        description: "Dedicated civic amenity spaces, children's play area, and perimeter green buffers.",
      },
      {
        title: "Spot Registration",
        description: "Clear marketable title with bank-loan eligibility from major financial institutions.",
      },
    ],
    specifications: [
      { label: "Total Layout Extent", value: "28 Acres" },
      { label: "Plot Dimensions", value: "200 to 500 sq.yds" },
      { label: "Approvals", value: "DTCP & NUDA Approved" },
      { label: "Internal Roads", value: "40ft & 33ft Bituminous Roads" },
      { label: "Water Supply", value: "Overhead Reservoir & Pipeline Network" },
      { label: "Security", value: "Compound Wall & Grand Entrance Arch" },
    ],
    clearance: "DTCP & NUDA Sanctioned",
    brochureUrl: "#brochure",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123800.74108871676!2d79.91929384750106!3d14.442598717838127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf2b9d901b0f7%3A0xc34125a2df6a012a!2sPodalakur%20Road%2C%20Nellore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Podalakur+Road+Nellore",
    featured: true,
    isActive: true,
    priceGuide: "Starting from ₹18,000 / sq.yd",
    seoTitle: "Pinaakini Emerald Bay | DTCP Approved Layout in Podalakur Road Nellore",
    seoDescription:
      "28-acre master-planned residential layout with 40ft roads, underground drainage, and spot registration in Nellore by Pinaakini Infra.",
  },

  // 3. ACTIVE VILLA GATED COMMUNITY
  {
    id: "palm-meadows",
    slug: "pinaakini-palm-meadows",
    name: "Pinaakini Palm Meadows",
    tagline: "Gated Duplex & Triplex Villa Community with Private Clubhouse",
    category: "Villas",
    status: "Now Selling",
    offer: ["Buy"],
    location: "Venkatachalam Highway Corridor, Nellore, AP",
    extent: "16 Acres",
    units: "94 Signature Villas",
    featuredImage: "/img/evening.webp",
    gallery: ["/img/evening.webp", "/img/terrace.webp", "/img/dining.webp", "/img/kitchen.webp"],
    shortDescription:
      "Exclusive 3 & 4 BHK duplex and triplex villas with private landscaped lawns, residents' clubhouse, swimming pool, and direct access to the national highway.",
    description: [
      "Pinaakini Palm Meadows brings curated gated villa living to the high-connectivity Venkatachalam highway corridor in Nellore.",
      "Spread over 16 lush acres, every villa is planned with expansive private front and rear courtyards, covered car porches, and generous terrace pavilions.",
      "The private residents' club includes a leisure swimming pool, gymnasium, multi-purpose banquet hall, and landscaped jogging tracks.",
    ],
    keyHighlights: [
      {
        title: "Clubhouse & Leisure",
        description: "10,000 sq.ft private residents' clubhouse with gym, indoor games, and pool.",
      },
      {
        title: "Individual Landscaped Lawns",
        description: "Each villa enjoys private garden frontage and shaded terrace pergolas.",
      },
      {
        title: "24/7 Monitored Security",
        description: "Gated entrance with CCTV surveillance and RFID vehicular access control.",
      },
      {
        title: "100% Vaastu Compliance",
        description: "Meticulously designed floor layouts conforming to traditional East and North orientations.",
      },
    ],
    specifications: [
      { label: "Community Area", value: "16 Acres Gated Estate" },
      { label: "Configurations", value: "3 & 4 BHK Duplex / Triplex" },
      { label: "Villa Sizes", value: "2,400 to 4,200 sq.ft" },
      { label: "Power Backup", value: "24/7 Generator Backup for Common Areas" },
      { label: "Club Amenities", value: "Clubhouse, Pool, Gym & Party Hall" },
      { label: "Approval Status", value: "NUDA & RERA Compliant" },
    ],
    clearance: "NUDA & RERA Sanctioned",
    brochureUrl: "#brochure",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Venkatachalam+Nellore",
    featured: true,
    isActive: true,
    priceGuide: "Starting from ₹1.25 Cr",
    seoTitle: "Pinaakini Palm Meadows | Gated Villas in Venkatachalam Nellore",
    seoDescription:
      "Exclusive 3 & 4 BHK duplex and triplex gated villas with clubhouse and swimming pool on the highway corridor in Nellore.",
  },

  // 4. ACTIVE URBAN PLOTTED GATED LAYOUT
  {
    id: "royal-county",
    slug: "pinaakini-royal-county",
    name: "Pinaakini Royal County",
    tagline: "Prestigious Urban Gated Layout in Dhanalakshmi Puram",
    category: "Layouts",
    status: "Coming Soon",
    offer: ["Buy"],
    location: "Dhanalakshmi Puram, Nellore, AP",
    extent: "22 Acres",
    units: "175 Premium Plots",
    featuredImage: "/world/paddy-palms.webp",
    gallery: ["/img/entrance.webp", "/img/path.webp", "/img/facade.webp"],
    shortDescription:
      "Upcoming urban layout featuring 50ft spine roads, underground electrical cabling, theme parks, and premier educational institution proximity.",
    description: [
      "Located in the prime residential neighborhood of Dhanalakshmi Puram, Pinaakini Royal County is conceived as a boutique enclave for discerning homeowners.",
      "Offering wide boulevard avenues, underground cabling, and landscaped parks, it places residents minutes away from leading schools, hospitals, and commercial hubs.",
    ],
    keyHighlights: [
      {
        title: "Prime In-City Proximity",
        description: "Situated within minutes of Nellore town center and arterial road networks.",
      },
      {
        title: "50ft Main Entrance Spine",
        description: "Impressive entrance portal and wide avenues with central medians.",
      },
      {
        title: "Complete Underground Utilities",
        description: "Underground electrical cables, fiber-ready telecommunications, and drainage.",
      },
    ],
    specifications: [
      { label: "Extent", value: "22 Acres" },
      { label: "Plot Sizes", value: "180 to 450 sq.yds" },
      { label: "Approvals", value: "NUDA Final Stage Approval" },
      { label: "Road Widths", value: "50ft, 40ft & 33ft Roads" },
    ],
    clearance: "NUDA Final Sanction Stage",
    featured: false,
    isActive: true,
    priceGuide: "Pre-Launch Expressions of Interest Open",
    seoTitle: "Pinaakini Royal County | Gated Plotted Community in Dhanalakshmi Puram Nellore",
    seoDescription:
      "22-acre premium urban layout in Dhanalakshmi Puram, Nellore with underground cabling and 50ft spine roads.",
  },

  // 5. ACTIVE AGRO-FARMLANDS
  {
    id: "eco-farms",
    slug: "pinaakini-eco-farms",
    name: "Pinaakini Eco Farms",
    tagline: "Managed Agro-Farmlands & Weekend Orchard Estates",
    category: "Farmlands",
    status: "Now Selling",
    offer: ["Buy"],
    location: "Rapur Road Corridor, Nellore District, AP",
    extent: "45 Acres",
    units: "80 Farmland Estates",
    featuredImage: "/world/paddy.webp",
    gallery: ["/img/garden.webp", "/img/path.webp", "/img/living.webp"],
    shortDescription:
      "High-value timber plantation and organic fruit orchards with automated drip irrigation, round-the-clock estate maintenance, and weekend retreat cottages.",
    description: [
      "Pinaakini Eco Farms offers sustainable agricultural ownership with turnkey estate management.",
      "Each farmland unit is planted with high-yield horticultural species and valuable timber, irrigated via automated subterranean drip lines, and secured by perimeter barbed-wire fencing.",
      "Owners enjoy a peaceful countryside retreat while building a green asset for the next generation.",
    ],
    keyHighlights: [
      {
        title: "Automated Drip Irrigation",
        description: "Deep borewells and automated solar-supported drip network for consistent hydration.",
      },
      {
        title: "Turnkey Agro Management",
        description: "Professional agricultural caretakers oversee planting, weeding, and maintenance.",
      },
      {
        title: "Weekend Cottage Footprints",
        description: "Dedicated footprint for lightweight eco-cottages or farm gazebos.",
      },
    ],
    specifications: [
      { label: "Total Area", value: "45 Acres" },
      { label: "Unit Sizes", value: "Quarter Acre (1,210 sq.yds) & Half Acre Units" },
      { label: "Title Clearances", value: "Verified Agricultural Title with Passbooks" },
      { label: "Water Availability", value: "Abundant Groundwater with Multiple Borewells" },
    ],
    clearance: "Agricultural Clear Title with Passbooks",
    brochureUrl: "#brochure",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Rapur+Road+Nellore",
    featured: false,
    isActive: true,
    priceGuide: "Starting from ₹15 Lakhs / Quarter Acre",
    seoTitle: "Pinaakini Eco Farms | Managed Farmlands & Weekend Estates in Nellore",
    seoDescription:
      "45-acre managed agro-farmlands with organic fruit orchards, automated drip irrigation, and weekend retreat plots along Rapur Road.",
  },

  // 6. DELIVERED COMPLETED VENTURE
  {
    id: "green-city-phase-1",
    slug: "pinaakini-green-city-phase-1",
    name: "Pinaakini Green City (Phase I)",
    tagline: "Delivered Plotted Township with 100% Clear Titles",
    category: "Layouts",
    status: "Completed",
    offer: ["Buy"],
    location: "Podalakur Road, Nellore, AP",
    extent: "32 Acres",
    units: "280 Families Inhabited",
    featuredImage: "/world/paddy-palms.webp",
    gallery: ["/img/path.webp", "/img/facade.webp"],
    shortDescription:
      "A completed flagship residential layout now inhabited by thriving families. Features fully functioning avenue lighting, tar roads, and parks.",
    description: [
      "Delivered ahead of schedule, Pinaakini Green City Phase I established Pinaakini Infra's reputation for uncompromising delivery and clear legal governance.",
      "The layout stands as a model residential community along the Podalakur corridor with independent houses and green avenues.",
    ],
    keyHighlights: [
      { title: "Fully Inhabited", description: "Active resident community with municipal services." },
      { title: "Complete Infrastructure", description: "Bituminous roads and avenue trees in full maturity." },
    ],
    specifications: [
      { label: "Layout Extent", value: "32 Acres" },
      { label: "Sanction", value: "DTCP Approved" },
      { label: "Status", value: "100% Handed Over & Inhabited" },
    ],
    clearance: "Delivered & Inhabited",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Green City Phase I | Completed Plotted Township",
    seoDescription: "32-acre delivered residential township in Nellore by Pinaakini Infra.",
  },

  // 7. COMPLETED TOWNSHIP PHASE 2
  {
    id: "green-city-phase-2",
    slug: "pinaakini-green-city-phase-2",
    name: "Pinaakini Green City (Phase II)",
    tagline: "Extended Plotted Township with Modern Storm Drainage",
    category: "Layouts",
    status: "Sold Out",
    offer: ["Buy"],
    location: "Podalakur Road, Nellore, AP",
    extent: "24 Acres",
    units: "170 Plots",
    featuredImage: "/world/paddy.webp",
    gallery: ["/img/entrance.webp"],
    shortDescription:
      "Successful extension of Green City featuring wide 40ft layout avenues, children's park, and compound wall security.",
    description: ["Sold out within months of launch due to the success of Phase I and uncompromised title clarity."],
    keyHighlights: [{ title: "100% Sold Out", description: "All plots handed over with clear title deeds." }],
    specifications: [{ label: "Extent", value: "24 Acres" }],
    clearance: "DTCP Approved & Delivered",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Green City Phase II | Sold Out Township",
    seoDescription: "Sold out plotted development along Podalakur Road Nellore.",
  },

  // 8. COMPLETED TRIPLEX COMMUNITY
  {
    id: "symphony-triplex",
    slug: "pinaakini-symphony",
    name: "Pinaakini Symphony",
    tagline: "Contemporary Triplex Residences with Private Roof Terraces",
    category: "Triplex Houses",
    status: "Completed",
    offer: ["Buy", "Rent"],
    location: "Magunta Layout Ext., Nellore, AP",
    extent: "4 Acres",
    units: "28 Triplex Units",
    featuredImage: "/img/terrace.webp",
    gallery: ["/img/terrace.webp", "/img/dining.webp"],
    shortDescription:
      "Boutique enclave of triplex homes featuring vertical volume, Italian marble finishes, and private sky lounges.",
    description: [
      "Pinaakini Symphony redefined urban living in the Magunta Layout extension, combining multi-level living with refined privacy.",
    ],
    keyHighlights: [
      { title: "Multi-level Triplex", description: "Three floors of architectural space with private lift provisions." },
    ],
    specifications: [{ label: "Built-up", value: "3,800 sq.ft per unit" }],
    clearance: "NUDA Approved & Occupied",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Symphony | Completed Triplex Homes in Nellore",
    seoDescription: "Contemporary triplex houses delivered in Magunta Layout extension, Nellore.",
  },

  // 9. COMPLETED LUXURY RESIDENCES
  {
    id: "serene-enclave",
    slug: "pinaakini-serene-enclave",
    name: "Pinaakini Serene Enclave",
    tagline: "Private Gated Community of Custom Built Villas",
    category: "Villas",
    status: "Completed",
    offer: ["Buy", "Rent"],
    location: "Vedayapalem, Nellore, AP",
    extent: "6 Acres",
    units: "36 Villas",
    featuredImage: "/img/facade.webp",
    gallery: ["/img/facade.webp"],
    shortDescription: "Serene residential retreat featuring customized independent villa architecture and lush green surroundings.",
    description: ["Completed luxury villa community in Vedayapalem offering tranquil living close to city conveniences."],
    keyHighlights: [{ title: "Prime Vedayapalem", description: "Convenient access to schools and railway station." }],
    specifications: [{ label: "Status", value: "Delivered & Occupied" }],
    clearance: "NUDA Approved",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Serene Enclave | Completed Villas in Vedayapalem",
    seoDescription: "Completed private villa enclave in Vedayapalem Nellore by Pinaakini Infra.",
  },

  // 10. SOLD OUT HIGHWAY LAYOUT
  {
    id: "highway-heights",
    slug: "pinaakini-highway-heights",
    name: "Pinaakini Highway Heights",
    tagline: "Commercial & Residential Plotted Venture on NH-16 Corridor",
    category: "Layouts",
    status: "Sold Out",
    offer: ["Buy"],
    location: "NH-16 Bypass, Nellore, AP",
    extent: "18 Acres",
    units: "140 Plots",
    featuredImage: "/world/paddy-palms.webp",
    gallery: ["/img/evening.webp"],
    shortDescription: "High-visibility plotted layout on the Golden Quadrilateral corridor with direct access.",
    description: ["Strategic commercial-cum-residential plotted layout with rapid appreciation."],
    keyHighlights: [{ title: "Direct NH Access", description: "Frontage on the arterial national highway." }],
    specifications: [{ label: "Extent", value: "18 Acres" }],
    clearance: "DTCP Sanctioned",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Highway Heights | Sold Out Layout",
    seoDescription: "Sold out residential and commercial plots on NH-16 bypass in Nellore.",
  },

  // 11. DELIVERED FARMLAND VENTURE
  {
    id: "green-pastures",
    slug: "pinaakini-green-pastures",
    name: "Pinaakini Green Pastures",
    tagline: "Organic Teak & Fruit Tree Agro-Estate Venture",
    category: "Farmlands",
    status: "Completed",
    offer: ["Rent"],
    location: "Atmakur Highway, Nellore District, AP",
    extent: "35 Acres",
    units: "65 Estates",
    featuredImage: "/world/paddy.webp",
    gallery: ["/img/garden.webp"],
    shortDescription: "Eco-conscious agrarian project with plantation cover and all-weather boundary fencing.",
    description: ["Completed and maintained agro-plantation community for conscious land investors."],
    keyHighlights: [{ title: "Established Trees", description: "5+ year mature teak and fruit plantation." }],
    specifications: [{ label: "Extent", value: "35 Acres" }],
    clearance: "Clear Agricultural Patta",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Green Pastures | Delivered Farmland Estate",
    seoDescription: "Delivered agro-farmland project along Atmakur Highway by Pinaakini Infra.",
  },

  // 12. SOLD OUT SUBURBAN ENCLAVE
  {
    id: "silver-springs",
    slug: "pinaakini-silver-springs",
    name: "Pinaakini Silver Springs",
    tagline: "Boutique Residential Plotted Layout in Kallurpalli",
    category: "Layouts",
    status: "Sold Out",
    offer: ["Buy"],
    location: "Kallurpalli, Nellore, AP",
    extent: "12 Acres",
    units: "95 Plots",
    featuredImage: "/world/penna.webp",
    gallery: ["/img/path.webp"],
    shortDescription: "Serene residential layout close to IT and educational centers in Kallurpalli.",
    description: ["Sold out development celebrated for calm neighborhood surroundings and prompt title conveyance."],
    keyHighlights: [{ title: "Kallurpalli Location", description: "Close to premier universities and colleges." }],
    specifications: [{ label: "Extent", value: "12 Acres" }],
    clearance: "NUDA Approved",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Silver Springs | Sold Out Layout",
    seoDescription: "Sold out boutique residential layout in Kallurpalli Nellore.",
  },

  // 13. COMING SOON TRIPLEX GATED PROJECT
  {
    id: "grand-crest",
    slug: "pinaakini-grand-crest",
    name: "Pinaakini Grand Crest",
    tagline: "Upcoming Contemporary Triplex Villas with Smart Home Automation",
    category: "Triplex Houses",
    status: "Coming Soon",
    offer: ["Buy"],
    location: "Mini Bypass Road, Nellore, AP",
    extent: "8 Acres",
    units: "52 Triplex Homes",
    featuredImage: "/img/entrance.webp",
    gallery: ["/img/terrace.webp"],
    shortDescription:
      "Ultra-modern 4 BHK triplex villas featuring integrated home automation, private elevator shafts, and terrace infinity plunge pools.",
    description: [
      "Pinaakini Grand Crest will bring high-specification contemporary vertical living to the central Mini Bypass corridor.",
    ],
    keyHighlights: [{ title: "Smart Home Tech", description: "Automated climate, lighting, and access control." }],
    specifications: [{ label: "Extent", value: "8 Acres" }, { label: "Status", value: "Pre-Launch Approvals" }],
    clearance: "Approvals in Progress",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Grand Crest | Upcoming Triplex Villas in Nellore",
    seoDescription: "Upcoming modern triplex villas with smart automation on Mini Bypass Road, Nellore.",
  },

  // 14. COMPLETED COASTAL FARMLANDS
  {
    id: "coastal-greens",
    slug: "pinaakini-coastal-greens",
    name: "Pinaakini Coastal Greens",
    tagline: "Coconut & Palm Agro-Estates Near Coastal Belt",
    category: "Farmlands",
    status: "Completed",
    offer: ["Rent"],
    location: "Muthukur Road, Nellore District, AP",
    extent: "50 Acres",
    units: "90 Farm Units",
    featuredImage: "/world/mypadu.webp",
    gallery: ["/img/pool.webp"],
    shortDescription: "Established coastal agro-estate with coconut plantations, sweet water aquifers, and perimeter roads.",
    description: ["Delivered agricultural development with rich soil and abundant water resources."],
    keyHighlights: [{ title: "Coconut Plantation", description: "High yielding coconut grove with perimeter fencing." }],
    specifications: [{ label: "Extent", value: "50 Acres" }],
    clearance: "Agricultural Clear Title",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Coastal Greens | Completed Agro Farmlands",
    seoDescription: "Delivered coastal agro-farmlands along Muthukur Road Nellore by Pinaakini Infra.",
  },

  // 15. DELIVERED CENTRAL PLOTTED COMMUNITY
  {
    id: "heritage-county",
    slug: "pinaakini-heritage-county",
    name: "Pinaakini Heritage County",
    tagline: "Premium Residential Plotted Colony Near Dargamitta",
    category: "Layouts",
    status: "Completed",
    offer: ["Buy"],
    location: "Near Dargamitta, Nellore, AP",
    extent: "15 Acres",
    units: "110 Plots",
    featuredImage: "/world/paddy-palms.webp",
    gallery: ["/img/dining.webp"],
    shortDescription: "Central in-city plotted community known for its premium neighborhood and immediate proximity to RTC Complex.",
    description: ["Fully completed and occupied residential enclave developed with municipal water connection provisions."],
    keyHighlights: [{ title: "Heart of the City", description: "Walkable distance to town infrastructure." }],
    specifications: [{ label: "Extent", value: "15 Acres" }],
    clearance: "Municipal & NUDA Sanctioned",
    featured: false,
    isActive: false,
    seoTitle: "Pinaakini Heritage County | Completed Central Layout",
    seoDescription: "Completed prime residential plotted development near Dargamitta Nellore.",
  },
];

export function getActiveProjects(): Project[] {
  return PROJECTS.filter((p) => p.isActive);
}

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
