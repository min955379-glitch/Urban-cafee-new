# Build Phases (`PHASES.md`)

Track progress across all 9 build phases. Update checkboxes as each phase is completed and verified.

---

- [x] **Phase 1: Research and design decisions**
  - Research cafe/steakhouse typography and ingredient-inspired color palettes.
  - Audit Urban Cafe & Restaurant brand details and document findings in `DESIGN.md`.
  - Create all 10 required project documentation files (`README.md`, `ROADMAP.md`, `RULES.md`, `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `PHASES.md`, `IMPLEMENTATION.md`, `DEPLOYMENT.md`, `MEMORY.md`).

- [x] **Phase 2: Skeleton and config**
  - Set up semantic HTML5 document structure in `index.html` with Google Fonts (`Fraunces` and `Plus Jakarta Sans`).
  - Define CSS custom properties (`:root` ingredient palette, spacing scale, typography tokens, button classes) in `styles.css`.
  - Create the top `CONFIG` block in `script.js` (`WHATSAPP_NUMBER`, `PHONE_1`, `PHONE_2`, `EMAIL`, `FACEBOOK_URL`, `TIKTOK_URL`, `INSTAGRAM_URL`, `HOURS`).

- [x] **Phase 3: Header and hero**
  - Build the sticky header with small-caps `"URBAN Cafe & Restaurant"` wordmark, section anchor links (`Menu`, `Gallery`, `Birthdays`, `Reviews`, `Location`, `Contact`), cart trigger, and `"Order on WhatsApp"` button.
  - Build the responsive mobile navigation drawer with accessible open/close buttons and keyboard `Escape` support.
  - Build the Hero section with ingredient-colored headline, tagline `"A place to enjoy food."`, hours line, `"View Menu"` and `"Order on WhatsApp"` buttons, feature badges with inline SVG icons (`Family-friendly`, `Dine-in`, `Open late`), and labeled hero placeholder visual.

- [x] **Phase 4: Menu and search**
  - Create `menu.json` with all 17 required categories and seeded dishes from public review mentions (`Jalapeno Burger`, `Buffalo Wings`, `Chicken Mushroom Pasta`, `Creamy Alfredo Pasta`, `Parmesan Pasta`, `Moroccan Steak`, `Monterrey Chicken`, `Wild Mushroom Chicken`, `Chicken Cashew`, `Beef Chilli Dry`, `Chicken Chowmein`, `Egg Fried Rice`, `Pepperoni Pizza`, `Urban Pizza`, `Loaded Fries`, `Zinger Burger`, `Mint Margarita`, shakes, and category companions), all priced at `"Rs. ---"`.
  - Build sticky category tabs and instant search box in `index.html` and `script.js`.
  - Implement graceful fallback UI if `menu.json` fails to load.

- [x] **Phase 5: Cart and WhatsApp order**
  - Build the slide-over Cart Drawer with item list, `+`/`-` quantity steppers, item removal, and empty-cart state.
  - Add Customer Name, Order Type (`Dine-in`, `Pickup`, `Delivery`), and conditional Delivery Address inputs with validation.
  - Build the WhatsApp message formatter and live message preview, plus automated unit tests in `src/utils/orderLogic.test.ts`.

- [x] **Phase 6: Gallery, birthday form, reviews**
  - Create neutral labeled SVG placeholder images in `/images/` and build the responsive 6-tile Gallery grid with an interactive Lightbox modal.
  - Build the Factual About section and Printable Table QR Code section.
  - Build the Birthday & Event Booking form (`name`, `phone`, `date`, `time`, `guests`, `notes`) with validation and pre-filled WhatsApp booking launch.
  - Build the Aggregate Reviews section with verified figures for Google (`4.1`, `500+ reviews`), Foodpanda (`4.8`, `500+ reviews`), and Facebook (`94% recommend`, `550 reviews`), external links, and `"Read more reviews"` button.

- [x] **Phase 7: Location, contact, footer**
  - Build the Location & Hours section with Google Maps embed for Jadoon Plaza Phase 2, Mandian, Abbottabad, `"Get Directions"` button, weekly hours table (`Mon-Thu & Sat-Sun 12:30-23:15`, `Fri 14:30-23:15` with `TODO`), and parking note placeholder.
  - Build the Contact & Footer section with click-to-call phones (`+92 313 9755550`, `+92 310 1444111`), email (`urbancafe555@gmail.com`), Facebook and TikTok links, hidden Instagram slot (`TODO`), and `"Website by BluePeakDesign"` credit.
  - Build the mobile-only sticky bottom bar (`Call` + `WhatsApp`) with proper page bottom padding.

- [x] **Phase 8: SEO, performance, accessibility**
  - Add SEO title, meta description targeting `"Urban Cafe Abbottabad menu"`, `"cafe Mandian"`, and `"steak Abbottabad"`, and Open Graph tags.
  - Add `Restaurant` JSON-LD structured data in `index.html`.
  - Create `sitemap.xml` and `robots.txt`.
  - Audit keyboard navigation, focus states, ARIA attributes, and WCAG AA contrast ratios.

- [x] **Phase 9: Layout QA, testing, deployment**
  - Run unit tests (`npx --yes tsx --test src/utils/orderLogic.test.ts`) and build check (`compile_applet`).
  - Inspect rendered site in headless Chromium across `360px`, `768px`, and `1280px` viewports using `playwright-cli`.
  - Test Cart-to-WhatsApp flow, Birthday form, Lightbox, and Category/Search filters.
  - Complete all Section 11 quality checks and document remaining owner TODOs.
