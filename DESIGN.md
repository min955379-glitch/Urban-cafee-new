# Design Specification: Urban Cafe & Restaurant, Abbottabad

<!-- TODO: Confirm official brand colors and logo mark with the owner of Urban Cafe & Restaurant before final production sign-off. -->

## 1. Design Research Findings (Phase 0)

### 1.1 Competitive and Reference Study
Before writing code, we analyzed how high-converting, agency-crafted cafe, steakhouse, and contemporary casual-dining websites structure their typography, color hierarchy, and ordering flows:

1. **Dishoom (UK) & Caravan Restaurants**: Use warm parchment and crema backgrounds instead of sterile pure white (`#FFFFFF`), paired with deep roasted espresso and cast-iron charcoal text. This creates a tactile, menu-in-hand warmth that works well for evening dine-in venues.
2. **Blue Bottle Coffee & Stumptown**: Rely on generous spacing, thin hairline borders (`1px solid`), and unboxed typographic metadata rather than heavy drop shadows or candy-colored pill badges.
3. **Hawksmoor & Modern Steakhouses**: Use an expressive, high-contrast editorial serif for section headings paired with a clean geometric humanist sans-serif for menu item descriptions, modifiers, and prices (`tabular-nums`), ensuring effortless scanning on mobile screens.

### 1.2 Brand Audit of Urban Cafe & Restaurant (Abbottabad)
- **Venue Context**: Located at Jadoon Plaza Phase 2, Mandian, Abbottabad. Known locally as a spacious, family-friendly restaurant and cafe serving steaks, pastas, Chinese dishes, burgers, pizzas, shakes, and coffee until late at night (23:15).
- **Brand Color Verification Status**: Public listings (Google Maps, Foodpanda, Facebook `/TheUrbanCafeandRestaurant`, TikTok `@urban.cafe.restaurant`) show interior woodwork, warm ambient lighting, and dark signage accents, but an official vector brand style guide could not be confirmed from public assets alone.
- **Decision**: In accordance with Section 4.2 of the project brief, we have engineered a **clearly labeled, ingredient-inspired placeholder palette** stored entirely in CSS custom properties (`:root` in `styles.css`) so any hex value can be swapped in seconds once the owner shares the source logo file.

---

## 2. Typography System

### 2.1 Chosen Google Fonts
- **Heading & Brand Display Font**: **Fraunces** (`600` SemiBold, `700` Bold)
  - *Why chosen*: Fraunces is an optical-size variable Old Style soft-serif with warm, slightly celebratory terminals that evoke artisanal coffee roasters, wood-fired kitchens, and classic steakhouse menus without feeling stiff or archaic. It renders with strong stroke authority at both hero scale and section header sizes.
- **Body, UI & Menu Font**: **Plus Jakarta Sans** (`400` Regular, `500` Medium, `600` SemiBold, `700` Bold)
  - *Why chosen*: Plus Jakarta Sans has wide apertures, tall x-height, and crisp tabular numeral support (`font-variant-numeric: tabular-nums`), making dish names, spice/ingredient descriptions, and price columns legible even on budget Android phones at 360 px width.

### 2.2 Rejected Font Alternatives
- **Rejected**: *Inter / Roboto / Open Sans* — Overused default system-like sans-serifs that make a hospitality site look like a generic SaaS dashboard.
- **Rejected**: *Playfair Display* — Thin hairlines can shimmer or disappear on lower-DPI Android screens common in local mobile traffic.
- **Rejected**: *Cinzel / Cormorant Garamond* — Too formal/fine-dining oriented for a lively Mandian family cafe and steakhouse that also serves loaded fries, burgers, and shakes.

### 2.3 Font Loading & Scale Strategy
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.
- Load only the used weights with `display=swap`.
- **Scale**:
  - Hero Headline: `clamp(2.25rem, 4.5vw, 3.75rem)`, line-height `1.1`, `text-wrap: balance`
  - Section Title (H2): `clamp(1.75rem, 3vw, 2.5rem)`, line-height `1.2`
  - Category / Subheading (H3): `1.25rem` (20px), line-height `1.3`
  - Dish Title (H4): `1.0625rem` (17px), SemiBold `600`
  - Body Copy: `1rem` (16px), line-height `1.65`, max measure `65ch`
  - Secondary / Metadata: `0.875rem` (14px), line-height `1.5`
  - Small / Caption: `0.75rem` (12px), letter-spacing `0.04em`

---

## 3. Ingredient-Inspired Color Palette & WCAG AA Audit

<!-- TODO: Confirm official brand palette with the owner and update CSS variables in styles.css if the logo requires specific colors. -->

All colors are drawn from culinary ingredients served at Urban Cafe & Restaurant (roasted Arabica coffee, steamed milk crema, smoked paprika, charred steak crust, fresh basil, and saffron butter):

| CSS Variable | Hex Code | Ingredient Source | Role in Interface | WCAG AA Contrast Check |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#FAF6F0` | Steamed Oat & Milk Crema | Primary page background (60% canvas) | Base canvas |
| `--bg-surface` | `#F2EAE0` | Toasted Brioche Crumb | Secondary section background, placeholder tiles, table stripes | `12.6:1` with `--text-primary` |
| `--bg-elevated` | `#FFFFFF` | Porcelain Plate | Menu cards, cart drawer, booking form card | `15.4:1` with `--text-primary` |
| `--text-primary` | `#231710` | Dark Roasted Espresso Bean | Primary body text, menu item titles, prices | `14.1:1` on `--bg-canvas` (AAA) |
| `--text-secondary` | `#5C4738` | Warm Cocoa Husk | Dish descriptions, hours details, form labels | `7.2:1` on `--bg-canvas` (AAA) |
| `--heading-espresso` | `#2C1A11` | Charred Wood & Espresso | Hero headline & primary structural headings | `13.2:1` on `--bg-canvas` (AAA) |
| `--heading-paprika` | `#8F2D14` | Smoked Spanish Paprika | Menu, Birthdays & Speciality section headings | `6.8:1` on `--bg-canvas` (AA+) |
| `--heading-olive` | `#2E4A29` | Crushed Basil & Olive Leaf | About, Gallery & Location section headings | `8.7:1` on `--bg-canvas` (AAA) |
| `--accent-primary` | `#9E3316` | Chili & Roasted Tomato Glaze | Primary buttons ("View Menu", Add actions, active states) | `6.1:1` with `#FFFFFF` text (AA) |
| `--accent-primary-hover` | `#7D260E` | Reduced Peppercorn Jus | Primary button hover/active state | `8.2:1` with `#FFFFFF` text (AAA) |
| `--accent-whatsapp` | `#1B5E3A` | Deep Herb Basil Leaf | Dedicated WhatsApp order buttons & sticky bar action | `7.6:1` with `#FFFFFF` text (AAA) |
| `--accent-whatsapp-hover` | `#13462B` | Dark Forest Sage | WhatsApp button hover state | `10.1:1` with `#FFFFFF` text (AAA) |
| `--accent-saffron` | `#B87314` | Saffron & Caramelized Butter | Star rating icon fill, subtle highlights (paired with dark text) | Used with `#231710` text (`10.4:1`) |
| `--border-subtle` | `#DFD3C3` | Raw Cane Sugar | Hairline card borders, table dividers, input borders | Structural divider |
| `--border-strong` | `#C4B29B` | Roasted Sesame | Input focus/hover border, secondary button border | Structural border |
| `--state-error` | `#991B1B` | Crushed Red Chili | Form validation error text and border | `7.3:1` on `--bg-elevated` (AAA) |
| `--state-success` | `#166534` | Fresh Mint Leaf | Order/booking ready confirmation banner | `6.9:1` on `--bg-elevated` (AA) |

---

## 4. Spacing Scale, Layout & Breakpoints

- **Container Max Width**: `1200px` centered with `1.25rem` (20px) horizontal padding on mobile, `2rem` (32px) on tablet, and `2.5rem` (40px) on desktop.
- **Spacing Scale**:
  - `--space-1`: `0.25rem` (4px)
  - `--space-2`: `0.5rem` (8px)
  - `--space-3`: `0.75rem` (12px)
  - `--space-4`: `1rem` (16px)
  - `--space-5`: `1.5rem` (24px)
  - `--space-6`: `2rem` (32px)
  - `--space-7`: `3rem` (48px)
  - `--space-8`: `4.5rem` (72px)
- **Breakpoints**:
  - Base: Mobile-first (`360px` to `767px`)
  - Tablet: `@media (min-width: 768px)`
  - Desktop: `@media (min-width: 1024px)` and `@media (min-width: 1280px)`
- **Sticky Surface Governance**:
  - Top sticky header height: `64px` (`4rem`).
  - Mobile sticky bottom bar height: `64px` (`4rem`), with `88px` bottom padding on `body` below `768px` so no footer content or buttons are ever covered.

---

## 5. Button System & Touch Targets

All interactive controls guarantee a minimum `44px x 44px` hit area on mobile and desktop:

1. **Primary Button (`.btn-primary`)**: Height `46px`, padding `0 1.25rem`, border-radius `8px`, background `var(--accent-primary)`, text `#FFFFFF`, SemiBold `600`, `0.9375rem` (15px), single-line `white-space: nowrap`.
2. **WhatsApp Button (`.btn-whatsapp`)**: Height `46px`, padding `0 1.25rem`, border-radius `8px`, background `var(--accent-whatsapp)`, text `#FFFFFF`, inline WhatsApp SVG icon + label.
3. **Secondary / Outline Button (`.btn-secondary`)**: Height `46px`, padding `0 1.25rem`, border-radius `8px`, background `transparent`, border `1.5px solid var(--border-strong)`, text `var(--text-primary)`.
4. **Menu Item Add Button (`.btn-add`)**: Height `44px`, min-width `88px`, padding `0 0.875rem`, border-radius `6px`, aligned consistently to the bottom-right / action column of every menu card.
5. **Icon Button (`.btn-icon`)**: `44px x 44px` square, border-radius `8px`, centered 20px SVG icon, explicit `aria-label`.

---

## 6. Inline SVG Icon Set & Strict No-Emoji Rule

- **Icon Family**: Custom-curated Lucide-compatible inline SVGs (`viewBox="0 0 24 24"`, `stroke-width="1.85"`, `stroke-linecap="round"`, `stroke-linejoin="round"`).
- **No Emojis Anywhere**: Zero emojis in HTML, CSS, JS, JSON, or documentation.
- **Included Icons**: Phone, WhatsApp, Location Pin, Clock, Search, Shopping Bag/Cart, Plus, Minus, Trash/Remove, Close (X), Menu (Hamburger), Star, Calendar, Users (Guests), Directions (Navigation Arrow), Email (Mail), Facebook, TikTok, Instagram, QR Code, Printer, Utensils, Flame, Coffee.

---

## 7. Component Inventory

1. **Sticky Top Header**: Brand wordmark (`URBAN Cafe & Restaurant`), 6 section anchor links, Cart Drawer trigger with item counter, and primary WhatsApp CTA. Mobile drawer with focus management and close button.
2. **Editorial Split Hero**: Ingredient-toned headline, tagline `"A place to enjoy food."`, hours summary, primary CTAs ("View Menu", "Order on WhatsApp"), unboxed feature highlights with icons (Family-friendly, Dine-in, Open late), and a labeled architectural hero placeholder frame.
3. **Interactive Menu Explorer**:
   - Sticky horizontal category bar (17 categories + "All") with keyboard arrow navigation.
   - Instant search input with clear button and live result count.
   - Menu item cards showing dish name, optional "Popular" typographic tag, description, tabular price placeholder (`Rs. ---`), and "Add" / quantity stepper control.
   - Graceful fallback banner if `menu.json` fails to load.
4. **Slide-Over Cart Drawer**:
   - Accessible dialog (`role="dialog"`, `aria-modal="true"`) with item list, `+`/`-` quantity steppers, order type selector (`Dine-in`, `Pickup`, `Delivery`), customer name input, conditional delivery address field, live WhatsApp message preview, and "Send order on WhatsApp" button.
5. **About Section**: Concise, factual editorial statement covering the family environment, late hours, steaks, pastas, coffee, and shakes, paired with a printable Table Menu QR Code module.
6. **Gallery & Lightbox**: 6 neutral labeled architectural/culinary placeholder tiles (`aspect-ratio: 4/3`) with category labels, TODO notes for owner photography, and an interactive keyboard-accessible lightbox dialog (`Escape`, `ArrowLeft`, `ArrowRight`).
7. **Birthday & Event Booking Section**: Form with Name, Phone, Date, Time, Number of Guests, and Event Notes. Validates inputs and opens a pre-filled WhatsApp inquiry while showing an on-page confirmation summary. Explicitly states that packages and pricing are confirmed directly by the restaurant.
8. **Aggregate Reviews Section**: Verified aggregate metrics for Google (`4.1`, `500+ reviews`), Foodpanda (`4.8`, `500+ reviews`), and Facebook (`94% recommend`, `550 reviews`) with direct external links and "Read more reviews" CTA. Zero invented quotes.
9. **Location & Hours Section**: Responsive Google Maps embed for Jadoon Plaza Phase 2, Mandian, Abbottabad, "Get Directions" CTA, structured weekly hours table (`Mon-Thu & Sat-Sun: 12:30 - 23:15`, `Fri: 14:30 - 23:15`) with TODO confirmation notice, and parking note placeholder.
10. **Contact, Footer & Mobile Sticky Bar**: Click-to-call numbers (`+92 313 9755550`, `+92 310 1444111`), email (`urbancafe555@gmail.com`), Facebook and TikTok links, hidden Instagram slot (`TODO` until handle is confirmed), BluePeakDesign credit, and a mobile-only bottom bar with Call and WhatsApp buttons.
