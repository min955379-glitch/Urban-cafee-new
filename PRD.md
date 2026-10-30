# Product Requirements Document (PRD): Urban Cafe & Restaurant

**Project**: Official Sample Website & WhatsApp Ordering Platform  
**Client**: Urban Cafe & Restaurant (Jadoon Plaza Phase 2, Mandian, Abbottabad)  
**Agency**: BluePeakDesign  

---

## 1. Business Goals

1. **Drive Direct WhatsApp Orders (Commission-Free)**: Enable customers in Mandian and across Abbottabad to browse the menu and send structured Dine-in, Pickup, or Delivery orders directly to the restaurant on WhatsApp, reducing reliance on third-party commission platforms.
2. **Make the Full Menu Searchable on Google**: Capture high-intent local search traffic (`"Urban Cafe Abbottabad menu"`, `"cafe Mandian"`, `"steak Abbottabad"`) with semantic HTML, fast page load, and `Restaurant` JSON-LD schema.
3. **Streamline Birthday & Family Event Inquiries**: Capture structured event booking details (date, time, guest count, special notes) in a single WhatsApp message so staff can respond with packages and pricing immediately.
4. **Win the Client Pitch**: Present the owner with an agency-grade, honest, zero-fluff sample website where every unconfirmed item is transparently marked as a placeholder ready for their official input.

---

## 2. Target Users

1. **Families in Abbottabad**: Looking for a comfortable, family-friendly dine-in atmosphere in Mandian with diverse menu options (Chinese, platters, steaks, pizzas, soups) and clear location/parking details.
2. **University Students & Young Diners**: Medical and university students along the Mandian corridor searching on mobile phones for burger/pizza deals, pasta, loaded fries, shakes, and late-night hours (open until 23:15).
3. **Tourists & Travelers**: Visitors passing through Abbottabad toward Nathiagali, Kaghan, or Karakoram Highway searching Google Maps for a reliable restaurant with verified ratings and quick directions.

---

## 3. Core Features List

| Feature ID | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **F-01** | Sticky Header & Mobile Nav | Brand wordmark, section links, cart counter trigger, WhatsApp CTA, and accessible mobile menu drawer. | P0 |
| **F-02** | Editorial Hero Section | Headline, tagline `"A place to enjoy food."`, hours line, primary CTAs, and feature badges (Family-friendly, Dine-in, Open late). | P0 |
| **F-03** | Dynamic 17-Category Menu | Loaded asynchronously from `menu.json` with sticky category tabs, instant search input, Popular tags, `"Rs. ---"` price placeholders, and graceful error fallback. | P0 |
| **F-04** | Cart Drawer & WhatsApp Order Builder | Slide-over cart with `+`/`-` quantity controls, customer name, order type (`Dine-in`, `Pickup`, `Delivery`), conditional address field, and `wa.me` deep link. | P0 |
| **F-05** | Factual About & Table QR Card | Short factual summary of the restaurant plus a printable QR code card for dine-in table menus. | P0 |
| **F-06** | Placeholder Gallery & Lightbox | Responsive photo grid with neutral labeled placeholder tiles and keyboard-accessible lightbox viewer. | P0 |
| **F-07** | Birthday & Event Booking Form | Validated form (Name, Phone, Date, Time, Guests, Notes) that opens WhatsApp with pre-filled booking details. | P0 |
| **F-08** | Sourced Aggregate Reviews | Displays verified rating aggregates for Google (4.1 / 500+), Foodpanda (4.8 / 500+), and Facebook (94% / 550) with external links. | P0 |
| **F-09** | Location, Map & Hours Table | Google Maps embed for Jadoon Plaza Phase 2, Mandian, "Get Directions" CTA, weekly hours table, and parking note placeholder. | P0 |
| **F-10** | Contact, Footer & Sticky Mobile Bar | Click-to-call numbers, email, social links, BluePeakDesign credit, and mobile-only bottom Call/WhatsApp bar. | P0 |

---

## 4. Success Metrics

- **Lighthouse Targets**: `90+` across Performance, Accessibility, Best Practices, and SEO.
- **Order Completion Friction**: A mobile user can select 3 dishes, choose an order type, and open a formatted WhatsApp message in under 45 seconds.
- **Layout Integrity**: Zero horizontal overflow, zero overlapping buttons, and `>= 44px` touch targets across `360px`, `768px`, and `1280px` viewports.

---

## 5. Out of Scope (for Sample Phase)

- Online credit/debit card payment gateway integration.
- Real-time delivery rider GPS tracking.
- Customer account login or backend database storage.
- Unconfirmed prices, scraped food photos, or fabricated customer quotes.
