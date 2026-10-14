# MASTER FRONTEND DEVELOPMENT PROMPT — PINAAKINI INFRA

Act as a Senior Frontend Engineer, Creative Developer, and Award-Winning UI/UX Designer specializing in premium real estate websites, interactive 3D experiences, and high-performance Next.js applications.

Build a complete, production-quality frontend for **Pinaakini Infra Private Limited**, a real estate development company operating around Nellore, Andhra Pradesh, India.

The website must combine a sophisticated luxury real estate aesthetic with selective 3D visuals, fluid animations, immersive photography, and a conversion-focused user experience.

Do not build a generic real estate template. Create a distinctive visual identity with a polished, editorial feel.

## 1. TECH STACK

Use:
- Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- React Three Fiber and Three.js for selected 3D elements
- Lucide React for icons
- Next.js Image component for image optimisation
- Reusable, component-driven architecture

Use the package manager and project structure already present in the repository. Inspect the existing project before making changes. Do not replace working configuration unnecessarily.

Build the frontend independently of the final backend. Use realistic, centralised mock project data so a CMS or API can be integrated later.

## 2. VISUAL DIRECTION

Create a premium, contemporary real estate brand identity.

### Colour palette
- Deep forest green: #102B24
- Rich charcoal: #171B19
- Warm ivory: #F7F5EF
- Muted champagne: #C6AE82
- Soft sage: #A7B6A4
- White: #FFFFFF

Use these colours as initial design tokens; keep them easy to change.

### Typography
- Elegant editorial serif font for large headlines.
- Clean sans-serif font for body text and navigation.
- Large, confident headlines with generous whitespace.
- Refined labels, understated dividers, and carefully controlled letter spacing.

### Design principles
- Premium, architectural, and photography-led.
- Large imagery with sophisticated cropping.
- Asymmetrical layouts where appropriate.
- Subtle transitions instead of excessive animation.
- Clean mobile navigation.
- Strong contrast and accessible text sizes.
- Consistent spacing and reusable design tokens.

Avoid excessive gradients, generic glassmorphism, random floating shapes, neon colours, overused card grids, and unnecessary UI decoration.

## 3. GLOBAL WEBSITE COMPONENTS

Implement these reusable components:

1. Announcement strip, if useful.
2. Responsive navigation header.
3. Pinaakini logo placeholder using typography until official brand assets are supplied.
4. Desktop navigation with active states.
5. Mobile navigation drawer.
6. Primary and secondary CTA buttons.
7. WhatsApp floating action button.
8. Reusable project card.
9. Project status badge.
10. Image gallery component.
11. Enquiry form.
12. Request a Site Visit form.
13. Reusable project hero.
14. Breadcrumb navigation.
15. Testimonial component, only if real approved testimonials are supplied.
16. Newsletter component only if a genuine requirement is confirmed; otherwise omit.
17. Footer with company details, navigation, contact links, and social links when provided.
18. Loading, empty, error, and form-success states.

Do not fabricate company claims, testimonials, awards, project statistics, or contact details. Keep unknown business data in a clearly editable configuration file.

## 4. HOME PAGE — `/`

Build a visually impressive homepage with the following sections.

### Section A: Hero

Create a cinematic full-width hero with:
- High-quality architectural or plotted-development photography.
- Large editorial headline: “Building Spaces. Creating Futures.”
- Short supporting copy introducing Pinaakini Infra.
- Primary CTA: “Explore Our Projects”
- Secondary CTA: “Schedule a Site Visit”
- A subtle scroll indicator.
- A refined entrance animation.

Include one optional lightweight 3D visual experience using React Three Fiber.

The 3D experience should be restrained and relevant to real estate, such as an architectural form, abstract topographic terrain, or layered landscape. It must not look like a random technology demo.

Requirements:
- Lazy-load the 3D component.
- Show a static image fallback on mobile or unsupported devices.
- Respect reduced-motion preferences.
- Prevent the 3D canvas from blocking page interaction.
- Avoid heavy assets and excessive GPU usage.
- Ensure the hero remains visually complete if WebGL fails.

Do not invent an actual 3D property model if none has been supplied.

### Section B: Company Introduction

Create an elegant split-layout section with a large photograph and concise copy.

Explain that Pinaakini develops residential layouts, plotted developments, villas, triplex houses, and farmland.

Include a CTA to learn about the company.

Do not invent years of experience or numerical achievements.

### Section C: Featured Properties

Show currently marketed projects first.

Each project card must support:
- Project photograph
- Project name
- Location
- Category
- Availability status
- Short description
- “Explore Project” CTA

Use a distinctive editorial grid rather than identical cards everywhere.

Support these statuses:
- Now Selling
- Coming Soon
- Sold Out

Sold-out projects should remain visible in the portfolio but must not show misleading active-sales CTAs.

### Section D: Signature Visual Section

Create a visually rich, asymmetrical image composition highlighting the company's approach to development.

Use subtle scroll-triggered motion, image reveals, and layered text.

Do not make every element parallax. Prioritise smooth scrolling and readability.

### Section E: Portfolio Preview

Show a curated selection of completed and ongoing developments.

Include a CTA to view the full portfolio.

### Section F: Why Pinaakini

Create an elegant company-value section using only defensible messaging, such as:
- Diverse real estate developments
- Location-focused projects
- A curated development portfolio
- Personalised site-visit enquiries

Avoid unsupported claims about legal approvals, returns, quality certifications, or delivery records.

### Section G: Site Visit CTA

Create a strong, contrasting CTA section:
“Find the Right Space for Your Future.”

Buttons:
- Request a Site Visit
- Chat on WhatsApp

### Section H: Footer

Include:
- Company name
- Navigation
- Available project links
- Contact placeholders
- WhatsApp link placeholder
- Copyright
- Privacy policy link placeholder

## 5. AVAILABLE PROPERTIES — `/properties`

Build a dedicated page showing active and upcoming developments.

Include:
- Editorial page header
- Short introduction
- Active project grid
- Optional category/status filters only if useful
- Prominent enquiry CTA
- Empty state when no projects match a filter

Project cards must link to their corresponding detail pages.

Do not build a complicated property-search engine, map search, plot availability selector, or booking system.

## 6. PROJECT DETAIL PAGE — `/properties/[slug]`

Build a reusable dynamic project detail template driven by typed project data.

Each page must support:

1. Project hero image.
2. Project name, location, category, and status.
3. Overview and key highlights.
4. Project image gallery.
5. Location section with Google Maps link or embed when coordinates/address are supplied.
6. Layout plan or brochure download.
7. Selected project video.
8. Project-specific enquiry form.
9. WhatsApp enquiry with the project name prefilled.
10. Click-to-call CTA.
11. Request a Site Visit form.
12. Related projects.
13. SEO title, description, and social sharing metadata.

All project content must come from a single typed data source or future CMS integration. Never hardcode a separate page for each project.

If a brochure or video is unavailable, hide that section gracefully.

If a project is sold out, display its status clearly and replace active-sales language with an appropriate general enquiry CTA.

## 7. PORTFOLIO — `/portfolio`

Create one beautifully curated portfolio page for approximately 15 developments.

Support:
- Project image
- Project name
- Location
- Project category
- Project status

Use an attractive masonry-inspired or editorial grid with responsive behaviour.

Allow optional filtering by project category or status if it can be implemented simply.

Portfolio entries should link to individual detail pages only when an appropriate active project page exists. Other projects can remain portfolio-only entries.

Do not create 15 separate detail pages.

## 8. ABOUT US — `/about`

Sections:
- Company introduction
- Development philosophy
- Types of projects developed
- Selected portfolio imagery
- Contact CTA

Use editorial typography, subtle motion, and real photography where available.

Do not invent the founder's biography, company history, awards, mission claims, or years of operation.

## 9. CONTACT — `/contact`

Build a premium, conversion-focused contact page.

Include:
- Contact information from a centralised configuration file.
- Enquiry form.
- Request a Site Visit form.
- Phone CTA.
- WhatsApp CTA.
- Google Maps section, if location information is available.

Suggested enquiry fields:
- Name
- Phone number
- Email, optional
- Project of interest
- Enquiry type
- Preferred site-visit date, optional
- Message, optional
- Consent checkbox where appropriate

Implement client-side validation and accessible error messages.

For the frontend prototype, create a service abstraction for form submissions. Do not falsely display “sent successfully” when no real backend endpoint exists. Use an explicit demo state until a working endpoint is configured.

## 10. PROJECT DATA ARCHITECTURE

Create TypeScript interfaces for project data.

Each project should support:
- `id`
- `slug`
- `name`
- `location`
- `category`
- `status`
- `shortDescription`
- `description`
- `featuredImage`
- `gallery`
- `videoUrl`
- `brochureUrl`
- `mapUrl`
- `featured`
- `seoTitle`
- `seoDescription`

Use centralised sample data for development.

Clearly mark sample data and use replaceable placeholder assets. Do not present invented sample projects as verified Pinaakini properties.

Create separate collections for:
- Active project landing pages
- Portfolio-only projects

The architecture must allow future CMS integration without rewriting the UI.

## 11. ANIMATIONS AND INTERACTIONS

Use Framer Motion for:
- Page entrance transitions
- Staggered hero content
- Scroll-triggered section reveals
- Image reveals
- Subtle project card hover effects
- Navigation transitions
- Mobile menu animation
- CTA micro-interactions

Use Three.js only for the selected 3D hero experience.

Rules:
- No unnecessary cursor-following effects.
- No continuous heavy animations.
- No scroll hijacking.
- No excessive parallax.
- Respect `prefers-reduced-motion`.
- Keep animations smooth on mid-range mobile devices.
- Provide functional fallbacks for 3D effects.

Every visible button and navigation item must perform a meaningful action.

## 12. RESPONSIVE DESIGN

Implement and test:
- Small mobile screens
- Standard mobile screens
- Tablets
- Laptops
- Large desktop screens

Requirements:
- No horizontal overflow.
- Readable headings at every breakpoint.
- Appropriate mobile image crops.
- Touch-friendly buttons.
- Responsive project grids.
- Mobile-optimised navigation.
- Accessible form inputs.
- No reliance on hover interactions on touch devices.

## 13. PERFORMANCE AND SEO

Implement:
- Next.js metadata API.
- Unique metadata for every route and project.
- Semantic HTML.
- Correct heading hierarchy.
- Descriptive image alt text.
- Optimised image sizes.
- Lazy loading below the fold.
- Sitemap and robots.txt.
- Canonical URL configuration.
- Open Graph metadata.
- Structured data where appropriate.
- Proper 404 page.
- Internal links between related projects.

Avoid rendering the 3D canvas before necessary. Use a static fallback and defer expensive components.

Target good Core Web Vitals and a strong Lighthouse performance score, but measure the result instead of claiming guaranteed scores.

## 14. COMPONENT AND FILE STRUCTURE

Use a clean structure similar to:

- `app/page.tsx`
- `app/about/page.tsx`
- `app/properties/page.tsx`
- `app/properties/[slug]/page.tsx`
- `app/portfolio/page.tsx`
- `app/contact/page.tsx`
- `components/layout/`
- `components/home/`
- `components/projects/`
- `components/forms/`
- `components/3d/`
- `components/ui/`
- `lib/projects.ts`
- `lib/site-config.ts`
- `lib/forms.ts`
- `types/project.ts`
- `public/images/`

Adapt this structure to the existing repository when appropriate.

## 15. WHAT NOT TO BUILD

Do not implement:
- Custom authentication
- Customer accounts
- Payment gateways
- Online property booking
- Advanced property search
- CRM dashboards
- A custom database without justification
- Full interactive 3D property walkthroughs
- Custom 3D modelling without supplied assets and an approved budget
- Fake enquiry integrations
- Unverified company claims
- Unnecessary packages or complex abstractions

The CMS and backend can be implemented separately. Keep the frontend architecture ready for integration.

## 16. FINAL DELIVERY REQUIREMENTS

Deliver a working frontend, not merely a design description or code snippets.

Before completion:
1. Inspect the existing repository.
2. Implement all agreed routes and reusable components.
3. Ensure navigation and buttons work.
4. Test project detail routes using sample data.
5. Test mobile responsiveness.
6. Test missing image and missing brochure states.
7. Test form validation and demo submission states.
8. Check accessibility basics.
9. Run TypeScript checks and linting where configured.
10. Fix build errors.
11. Document required environment variables and setup steps.
12. Provide a summary of completed pages and remaining backend/CMS integration tasks.

Prioritise exceptional visual quality, distinctive art direction, clean code, real functionality, maintainability, and mobile performance.

The result should feel like a premium real estate brand with a memorable 3D visual signature—not a generic property listing website.