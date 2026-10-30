# Project Memory Log (`MEMORY.md`)

Running log of architectural decisions, completed phases, and open `TODO` items so any developer or AI assistant can inspect or continue the work seamlessly.

---

## Current Status
- **Current Phase**: Phase 9 (Layout QA, Testing, and Final Verification)
- **Completed Phases**:
  - Phase 1: Research and design decisions (`DESIGN.md` and all 10 documentation files created)
  - Phase 2: Skeleton and config (`index.html`, `styles.css`, `script.js` top `CONFIG` block)
  - Phase 3: Header and hero (Sticky header, mobile menu drawer, editorial split hero)
  - Phase 4: Menu and search (`menu.json` with 17 categories, sticky tabs, instant search, fallback state)
  - Phase 5: Cart and WhatsApp order (Slide-over cart drawer, quantity controls, order types, `wa.me` link builder, unit tests)
  - Phase 6: Gallery, birthday form, reviews (6 SVG placeholder tiles, lightbox modal, birthday WhatsApp booking form, sourced aggregate ratings)
  - Phase 7: Location, contact, footer (Google Maps embed for Jadoon Plaza Phase 2 Mandian, hours table, click-to-call phones, social links, BluePeakDesign credit, mobile sticky bar)
  - Phase 8: SEO, performance, accessibility (`Restaurant` JSON-LD schema, Open Graph meta tags, `sitemap.xml`, `robots.txt`, WCAG AA contrast)

---

## Key Decisions Log

1. **Typography Pairing (`DESIGN.md`)**:
   - Chosen **Fraunces** (600, 700) for headings and brand wordmark + **Plus Jakarta Sans** (400, 500, 600, 700) for body, UI controls, and tabular price columns.
   - Loaded via Google Fonts with `preconnect` and `display=swap`.
2. **Ingredient-Inspired Color Palette (`DESIGN.md`)**:
   - Built around culinary tones: Steamed Crema (`#FAF6F0`), Toasted Brioche (`#F2EAE0`), Roasted Espresso (`#231710`), Smoked Paprika (`#8F2D14`), Crushed Basil & Olive (`#2E4A29`), Chili Tomato Glaze (`#9E3316`), and Deep Herb Basil (`#1B5E3A`) for WhatsApp actions.
   - All text/background and button combinations verified against WCAG AA (`>= 4.5:1`).
   - Clearly marked with `TODO` comments in `styles.css` and `DESIGN.md` so colors can be swapped if the owner provides an official brand style guide.
3. **Zero-Emoji & Inline SVG Discipline (`RULES.md`)**:
   - Zero emojis used anywhere in HTML, CSS, JS, JSON, or documentation.
   - Custom inline SVG icon set with consistent `24x24` viewBox and `1.85` stroke width.
4. **Static + Vite Dual Compatibility (`ARCHITECTURE.md`)**:
   - Built using plain `index.html`, `styles.css`, `script.js`, and `menu.json` at the workspace root (with static assets mirrored in `public/` so Vite dev server on port 3000 and `vite build` work out of the box alongside zero-build Netlify/Vercel static hosting).
   - Pure cart/search/WhatsApp logic also extracted into `src/utils/orderLogic.ts` with automated `node:test` unit tests in `src/utils/orderLogic.test.ts`.

---

## Open TODOs & Unconfirmed Items (Requires Owner Input)

1. **Menu Prices (`menu.json`)**: Every item currently displays `"Rs. ---"` (`numericPrice: null`). Need official PKR prices from the owner.
2. **Official Logo & Brand Colors (`index.html`, `styles.css`, `DESIGN.md`)**: Header currently uses the bold small-caps text wordmark `"URBAN Cafe & Restaurant"` and the ingredient-inspired palette. Confirm official logo file and brand hex codes with the owner.
3. **Owner's Venue & Dish Photography (`/images/`, `index.html`)**: Hero and 6 Gallery slots currently use neutral labeled SVG placeholder tiles. Replace with licensed photos from the owner once permission is granted.
4. **WhatsApp Number Confirmation (`script.js`)**: `WHATSAPP_NUMBER` defaults to `"923139755550"` (`+92 313 9755550`). Confirm with the owner that this number receives customer WhatsApp orders and birthday inquiries.
5. **Opening Hours Confirmation (`script.js`, `index.html`)**: Hours table shows `Mon-Thu & Sat-Sun: 12:30 - 23:15` and `Fri: 14:30 - 23:15`. Confirm exact kitchen closing and Friday break hours with the owner.
6. **Parking Details (`index.html`)**: Location section includes a labeled placeholder note for Jadoon Plaza Phase 2 parking availability. Confirm exact parking guidance with the owner.
7. **Instagram Handle (`script.js`, `index.html`)**: `INSTAGRAM_URL` is currently empty (`""`) and hidden in the UI. Enable once the owner confirms an official Instagram handle.
8. **Live Production URL & Table QR Code (`script.js`, `index.html`, `sitemap.xml`, `robots.txt`)**: Replace `https://urbancafeabbottabad.example.com` and regenerate the printable QR matrix once the custom domain is live.
