# Product Roadmap: Urban Cafe & Restaurant Website

This document tracks what ships in the current sample release for the owner pitch, what comes immediately after client approval, and future growth features.

---

## Stage 1: Sample Pitch Site (Ships Now)

- [x] Research-backed ingredient color palette and Fraunces + Plus Jakarta Sans typography system (`DESIGN.md`).
- [x] Mobile-first one-page layout with sticky header, desktop navigation, and mobile drawer menu.
- [x] Editorial hero section with confirmed tagline (`"A place to enjoy food."`), hours summary, and quick-action buttons.
- [x] Full 17-category dynamic menu loaded from `menu.json` with sticky category tabs and instant search box.
- [x] Seeded sample dishes drawn strictly from public customer mentions (Jalapeno Burger, Moroccan Steak, Creamy Alfredo Pasta, Buffalo Wings, Urban Pizza, Mint Margarita, and more) with `"Rs. ---"` price placeholders.
- [x] Interactive Cart Drawer with quantity steppers, order type selection (Dine-in, Pickup, Delivery), conditional address field, and formatted WhatsApp message generator.
- [x] Gallery grid with neutral labeled placeholder tiles and accessible keyboard-navigable lightbox modal.
- [x] Birthday and event inquiry form that pre-fills a structured WhatsApp booking message.
- [x] Aggregate review cards with real sourced numbers from Google (4.1, 500+ reviews), Foodpanda (4.8, 500+ reviews), and Facebook (94% recommend, 550 reviews).
- [x] Location section with Google Maps embed for Jadoon Plaza Phase 2, Mandian, Abbottabad, directions button, and opening hours table.
- [x] Printable table QR code section for dine-in guests.
- [x] Sticky mobile bottom action bar (`Call` + `WhatsApp`) with safe page bottom padding.
- [x] Local SEO setup (`Restaurant` JSON-LD schema, Open Graph meta tags, `sitemap.xml`, `robots.txt`).

---

## Stage 2: Client Onboarding & Production Launch (Next Step After Approval)

- [ ] **Complete Menu & Confirmed Prices**: Replace `"Rs. ---"` placeholders in `menu.json` with the restaurant's complete printed menu and current PKR prices.
- [ ] **Official Brand Assets**: Add the owner's high-resolution vector/PNG logo in the header and swap CSS color variables in `styles.css` if exact logo colors differ.
- [ ] **Real Venue & Food Photography**: Replace the neutral placeholder tiles in the Hero and Gallery sections with licensed photos of the Mandian dining hall, birthday decor setups, steaks, and pastas.
- [ ] **Confirm Operational Details**:
  - Confirm `923139755550` is the dedicated WhatsApp ordering number.
  - Confirm daily and Friday prayer break hours (`12:30 - 23:15` and `14:30 - 23:15`).
  - Confirm Jadoon Plaza Phase 2 parking instructions for families and tour groups.
  - Confirm whether an official Instagram account exists and enable `INSTAGRAM_URL` in `script.js`.
- [ ] **Custom Domain & Google Business Profile**: Connect custom domain (e.g., `urbancafeabbottabad.com` or `.pk`), update the printable QR code to point to the live domain, and add the website link to the Google Business Profile and Facebook page.
- [ ] **Privacy-Friendly Analytics**: Add lightweight event tracking for WhatsApp order clicks, phone call clicks, and direction requests.

---

## Stage 3: Later Enhancements (Post-Launch Ideas)

- [ ] **Ramadan, Eid & Student Deal Banners**: Seasonal toggleable section in `menu.json` for Iftar platters, family platters, and university student deals in Mandian.
- [ ] **Table Reservation Time-Slot Picker**: Pre-configured time slots with automatic peak-hour notices on Friday and Saturday evenings.
- [ ] **Printable PDF Menu Generator**: Auto-generate a downloadable PDF menu directly from `menu.json` so staff only maintain prices in one place.
- [ ] **Loyalty & Repeat Order History**: Save recent orders in `localStorage` so regular customers in Abbottabad can reorder their favorite dishes in two taps.
