# Urban Cafe & Restaurant — Abbottabad (Sample Website)

A fast, mobile-first, accessible one-page website and WhatsApp ordering experience built by **BluePeakDesign** as a pitch sample for **Urban Cafe & Restaurant**, located at Jadoon Plaza Phase 2, Mandian, Abbottabad, Pakistan.

---

## 1. Project Overview

This repository contains a complete static website built with semantic HTML5 (`index.html`), custom CSS (`styles.css`), vanilla JavaScript (`script.js`), and a structured menu data file (`menu.json`). It requires no frontend framework to deploy to Netlify, Vercel, or any static host, while also supporting local development and automated verification in this environment.

### Key Capabilities
- **Searchable, Categorized Menu**: Dynamically loads all 17 categories from `menu.json` with sticky category navigation and instant search filtering.
- **Direct WhatsApp Ordering Cart**: Customers can add dishes, adjust quantities, choose Dine-in, Pickup, or Delivery, and send a formatted order directly to the restaurant's WhatsApp number.
- **Birthday & Event Booking Form**: Collects guest count, preferred date/time, and notes, and formats a structured WhatsApp booking inquiry.
- **Gallery with Accessible Lightbox**: Uses clean, neutral labeled placeholder tiles ready to swap with the owner's real food and interior photography.
- **Verified Aggregate Reviews**: Displays sourced rating aggregates from Google, Foodpanda, and Facebook without invented quotes.
- **Printable Table QR Menu Card**: Includes a print-ready QR code card for restaurant tables.
- **Local SEO & Structured Data**: Includes `Restaurant` JSON-LD schema, Open Graph metadata, `sitemap.xml`, and `robots.txt`.

---

## 2. How to Run Locally

### Option A: Using the Built-in Dev Server (Port 3000)
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Option B: Using Any Static File Server (Zero Dependencies)
Because `menu.json` is loaded via `fetch('./menu.json')`, serve the root folder over HTTP rather than opening `file://` directly:
```bash
npx serve .
# or
python3 -m http.server 8080
```

### Running Unit Tests
Core cart, menu filtering, and WhatsApp message formatting helpers are also tested via Node's built-in test runner:
```bash
npx --yes tsx --test src/utils/orderLogic.test.ts
```

---

## 3. How to Edit the Config Block (`script.js`)

Open `script.js` and edit the `CONFIG` object at the very top of the file. Updating values here automatically updates the contact links, WhatsApp destination number, hours display, and social links across the page:

```javascript
const CONFIG = {
  // TODO: Confirm with the owner that 923139755550 is the active WhatsApp ordering number
  WHATSAPP_NUMBER: "923139755550",
  PHONE_1: "+92 313 9755550",
  PHONE_1_TEL: "+923139755550",
  PHONE_2: "+92 310 1444111",
  PHONE_2_TEL: "+923101444111",
  EMAIL: "urbancafe555@gmail.com",
  FACEBOOK_URL: "https://www.facebook.com/TheUrbanCafeandRestaurant",
  TIKTOK_URL: "https://www.tiktok.com/@urban.cafe.restaurant",
  // TODO: Add official Instagram URL once handle is confirmed by the owner (leave empty "" to hide)
  INSTAGRAM_URL: "",
  // TODO: Confirm live domain URL for the printable QR table menu
  LIVE_SITE_URL: "https://urbancafeabbottabad.example.com",
  HOURS: {
    summary: "Mon-Thu & Sat-Sun: 12:30 - 23:15 | Fri: 14:30 - 23:15",
    regular: "12:30 - 23:15",
    friday: "14:30 - 23:15"
  }
};
```

---

## 4. How to Edit `menu.json`

All menu categories and items live in `/menu.json` (mirrored in `/public/menu.json` for Vite build output).

Each item follows this schema:
```json
{
  "id": "moroccan-steak",
  "name": "Moroccan Steak",
  "category": "Steaks",
  "description": "Char-grilled steak served with spiced Moroccan herb sauce, sauteed vegetables, and mashed potatoes or fries.",
  "price": "Rs. ---",
  "numericPrice": null,
  "popular": true
}
```
- While prices are unconfirmed, keep `"price": "Rs. ---"` and `"numericPrice": null`.
- Once the owner provides confirmed prices, set `"price": "Rs. 1,850"` and `"numericPrice": 1850`. When all items in the cart have valid numeric prices, the cart drawer and WhatsApp message automatically include the calculated order total.

---

## 5. How to Replace Placeholder Images

All placeholder SVG tiles live in `/images/` (and `/public/images/`) and are referenced in `index.html`. Once the owner provides official food and venue photos:
1. Compress the images as `.webp` or `.jpg` (`1200x900` for gallery, `1600x1000` for hero).
2. Place them in `/images/` and `/public/images/`.
3. Update the `src` and `alt` attributes in the Hero and Gallery sections of `index.html`.

---

## 6. Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions to deploy to Netlify or Vercel and connect a custom domain.
