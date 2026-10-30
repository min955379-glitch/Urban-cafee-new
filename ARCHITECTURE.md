# System Architecture (`ARCHITECTURE.md`)

This document describes the file structure, data flow, WhatsApp message construction, and hosting setup for the **Urban Cafe & Restaurant** website.

---

## 1. File Structure

```text
/
|-- index.html                 # Semantic HTML5 entry point, JSON-LD schema, all 10 sections
|-- styles.css                 # Mobile-first CSS, ingredient palette variables, responsive layout
|-- script.js                  # Top CONFIG block, menu loader, search/tabs, cart drawer, lightbox, forms
|-- menu.json                  # Complete 17-category menu dataset with seeded dishes & Rs. --- placeholders
|-- sitemap.xml                # Search engine sitemap with TODO for production domain
|-- robots.txt                 # Search engine crawler instructions
|-- images/                    # Neutral labeled SVG placeholder tiles (Hero, Gallery, OG preview)
|   |-- hero-placeholder.svg
|   |-- gallery-1.svg
|   |-- gallery-2.svg
|   |-- gallery-3.svg
|   |-- gallery-4.svg
|   |-- gallery-5.svg
|   |-- gallery-6.svg
|-- public/                    # Static mirror of menu.json, sitemap.xml, robots.txt, images/ for Vite serving
|-- src/
|   |-- utils/
|       |-- orderLogic.ts      # Pure functions for cart totals, filtering, and WhatsApp URL formatting
|       |-- orderLogic.test.ts # Automated unit tests (node:test) verifying cart & WhatsApp formatting
|-- README.md
|-- ROADMAP.md
|-- RULES.md
|-- PRD.md
|-- ARCHITECTURE.md
|-- DESIGN.md
|-- PHASES.md
|-- IMPLEMENTATION.md
|-- DEPLOYMENT.md
|-- MEMORY.md
```

---

## 2. Configuration Block (`script.js`)

At the top of `script.js`, a single `CONFIG` constant stores all contact and operational parameters:
- `WHATSAPP_NUMBER`: `"923139755550"` (marked with a `TODO` to confirm with the owner).
- `PHONE_1` / `PHONE_2`: `"+92 313 9755550"` and `"+92 310 1444111"`.
- `EMAIL`: `"urbancafe555@gmail.com"`.
- `FACEBOOK_URL`: `"https://www.facebook.com/TheUrbanCafeandRestaurant"`.
- `TIKTOK_URL`: `"https://www.tiktok.com/@urban.cafe.restaurant"`.
- `INSTAGRAM_URL`: `""` (empty string hides the Instagram link automatically until the owner confirms a handle).
- `HOURS`: Structured schedule for Monday-Thursday, Friday, and Saturday-Sunday.

On `DOMContentLoaded`, `applyConfigToDOM()` binds these values to every phone link, WhatsApp button, email link, social link, and hours label so changing `CONFIG` updates the entire website automatically.

---

## 3. How `menu.json` Feeds the Menu UI

1. **Fetch & Parse**: `loadMenu()` requests `./menu.json`.
2. **State Management**:
   - `state.menuData`: Full array of categories and items.
   - `state.activeCategory`: Currently selected tab (`"Popular"` by default, or `"All"`, or any of the 17 categories).
   - `state.searchQuery`: Trimmed lowercase string from `#menu-search-input`.
3. **Filtering Rules**:
   - When `activeCategory === "Popular"`, items with `"popular": true` across all categories are shown.
   - When a specific category is selected (e.g., `"Steaks"`), items matching that exact category are shown.
   - When `searchQuery` is non-empty, items are filtered across **all categories** by matching `name`, `description`, or `category` so users can find any dish immediately regardless of which tab was previously active.
4. **Graceful Error Fallback**:
   - If `fetch('./menu.json')` fails (network error or malformed JSON), the menu container displays a clear, styled fallback message with direct buttons to call `+92 313 9755550` or request the menu on WhatsApp.

---

## 4. Cart State & WhatsApp Order Message Builder

1. **Cart Storage**:
   - Stored in `state.cart` (keyed by item `id` with `{ id, name, category, price, numericPrice, quantity }`) and persisted to `localStorage` under `urban_cafe_cart_v1` so accidental page refreshes do not lose items.
2. **Price Calculation**:
   - Checks whether every item in the cart has a positive number in `numericPrice`.
   - While items use `"Rs. ---"` (`numericPrice: null`), the cart omits a numeric total and includes the note: `"Total: To be confirmed by restaurant (sample menu prices pending)"`.
   - Once real prices are entered in `menu.json`, the cart automatically calculates and appends `"Estimated Total: Rs. X,XXX"`.
3. **WhatsApp URL Construction**:
   - Validates that the cart has at least one item, Customer Name is provided, Order Type (`Dine-in`, `Pickup`, or `Delivery`) is selected, and Delivery Address is filled if `Delivery` is chosen.
   - Builds a clean plain-text message (zero emojis) and encodes it with `encodeURIComponent()` into:
     `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`

---

## 5. Birthday & Event Booking Flow

1. Collects `name`, `phone`, `date`, `time`, `guests`, and `notes`.
2. Validates required fields with accessible inline error messages (`aria-invalid="true"`).
3. Constructs a structured WhatsApp inquiry addressed to `CONFIG.WHATSAPP_NUMBER`, displays an on-page booking preview with a direct WhatsApp launch link, and opens the pre-filled WhatsApp chat.

---

## 6. Hosting & Deployment Compatibility

- **Zero-Framework Static Output**: Works directly on Netlify or Vercel by dragging and dropping the project folder or connecting the Git repository.
- **Dev & Build Pipeline**: Compatible with Vite (`npm run dev` on port 3000 and `npm run build`).
