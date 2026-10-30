# Repository Rules & Standards (`RULES.md`)

Every developer or AI assistant working on the **Urban Cafe & Restaurant** repository must follow these rules strictly without exception.

---

## 1. Content & Integrity Rules (Zero Hallucinations)

1. **No Invented Facts**: Never invent menu items, restaurant history, chef bios, awards, delivery fees, or seating capacities that are not confirmed in the project brief.
2. **No Invented Prices**: Every menu item price in `menu.json` and the UI must use the exact placeholder `"Rs. ---"` (`numericPrice: null`) until the owner provides official pricing.
3. **No Invented Customer Reviews or Quotes**: Never write fictional customer testimonials or names. Show only the confirmed aggregate numbers:
   - Google: `4.1` (`500+ reviews`)
   - Foodpanda: `4.8` (`500+ reviews`)
   - Facebook: `94% recommend` (`550 reviews`)
4. **No Scraped or Unlicensed Photos**: Do not copy images from Foodpanda, Facebook, TikTok, or external stock URLs. Use clean, neutral labeled placeholder tiles with explicit `TODO` comments until the owner grants permission to use official photography.
5. **Mandatory TODO Comments**: Every unconfirmed piece of data (brand colors, logo, prices, photos, WhatsApp number confirmation, opening hours confirmation, parking note, Instagram handle, live QR URL) must have a visible placeholder in the UI where appropriate and a clear `TODO:` comment in the source code.

---

## 2. Visual, Icon & Typography Rules

1. **Strict No-Emoji Policy**: Do not use emojis anywhere in this project—not in HTML, CSS, JavaScript, JSON, markdown documentation, code comments, commit messages, or placeholder graphics.
2. **Consistent Inline SVG Icons Only**: Use only the unified inline SVG icon set (24x24 viewBox, `1.85` stroke width, round caps/joins).
   - Decorative icons must include `aria-hidden="true"` and `focusable="false"`.
   - Interactive icon-only buttons must have an explicit, descriptive `aria-label`.
3. **Protected Brand Palette & Fonts**: Do not replace the researched Google Fonts (`Fraunces` + `Plus Jakarta Sans`) or the ingredient-inspired CSS custom property palette in `styles.css` without explicit permission from the lead designer (BluePeakDesign).
4. **WCAG AA Contrast Compliance**: Every text and button color combination must maintain a minimum `4.5:1` contrast ratio for normal text and `3:1` for large text and interactive boundaries.

---

## 3. Technical & Layout Architecture Rules

1. **Plain Web Standards**: Keep the site self-contained in `index.html`, `styles.css`, `script.js`, and `menu.json` so it can deploy to any free static host without framework lock-in.
2. **Single Source of Truth Config**: All phone numbers, WhatsApp number, email, social URLs, and opening hours must be configured in the `CONFIG` block at the top of `script.js`.
3. **Mobile-First & Zero Overflow**:
   - Design from `360px` upward (`360px`, `768px`, `1280px`).
   - Never allow horizontal scrolling (`overflow-x`) at any viewport width.
   - All interactive controls (buttons, tabs, steppers, links, inputs) must have a minimum touch target of `44px x 44px` on mobile.
   - Ensure the sticky header and sticky mobile bottom bar never obscure page content, form buttons, or footer links.
4. **Spelling & Grammar**: Verify spelling across all visible text and documentation. Use exact category names required by the brief (`Popular`, `Soups`, `Urban Special Burger & Pizza Deals`, `Chinese`, `Appetizers`, `Chopsuey & Noodles`, `Platters`, `Salads`, `Pizza`, `Burgers`, `Sandwiches`, `Rice Corner`, `Chicken Speciality`, `Sea Foods`, `Pasta`, `Steaks`, `Cold Beverages`).
