# Implementation Notes (`IMPLEMENTATION.md`)

Step-by-step technical documentation of how each feature in the **Urban Cafe & Restaurant** website was built.

---

## 1. `menu.json` Schema and Category Structure

`menu.json` contains a top-level `categories` array (in the exact order specified by the brief) and an `items` array:

```json
{
  "lastUpdated": "2026-10-30",
  "currency": "PKR",
  "priceNote": "TODO: Replace Rs. --- placeholders with confirmed menu prices from the owner.",
  "categories": [
    "Popular",
    "Soups",
    "Urban Special Burger & Pizza Deals",
    "Chinese",
    "Appetizers",
    "Chopsuey & Noodles",
    "Platters",
    "Salads",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "Rice Corner",
    "Chicken Speciality",
    "Sea Foods",
    "Pasta",
    "Steaks",
    "Cold Beverages"
  ],
  "items": [
    {
      "id": "jalapeno-burger",
      "name": "Jalapeno Burger",
      "category": "Burgers",
      "description": "Crispy or grilled fillet topped with sliced jalapenos, cheddar cheese, iceberg lettuce, and signature spicy house sauce in a toasted bun.",
      "price": "Rs. ---",
      "numericPrice": null,
      "popular": true
    }
  ]
}
```

### How `"Popular"` Works
- `"Popular"` is the default active tab on initial load so visitors immediately see the restaurant's best-known dishes (`Jalapeno Burger`, `Buffalo Wings`, `Chicken Mushroom Pasta`, `Creamy Alfredo Pasta`, `Moroccan Steak`, `Urban Pizza`, `Mint Margarita`, etc.).
- Clicking `"All Categories"` displays all seeded items grouped cleanly, while clicking any specific category filters directly to that category.
- Typing in `#menu-search-input` searches across all items regardless of the selected category tab and highlights the number of matching dishes.

---

## 2. WhatsApp Order Message Template

When a customer clicks **Send order on WhatsApp** in the cart drawer, `buildWhatsAppOrderMessage()` generates the following plain-text message (zero emojis):

```text
Hello Urban Cafe & Restaurant,
I would like to place an order from your website:

ORDER ITEMS:
- 2x Moroccan Steak (Rs. ---)
- 1x Creamy Alfredo Pasta (Rs. ---)
- 2x Mint Margarita (Rs. ---)

Total: To be confirmed by restaurant (menu prices pending confirmation)

CUSTOMER DETAILS:
Name: Ahmed Khan
Phone: 0313-0000000
Order Type: Delivery
Delivery Address: House 14, Street 3, Near Ayub Medical Complex, Mandian, Abbottabad
Notes: Less spicy on the pasta please.

Please confirm availability and total bill. Thank you.
```

### Automatic Total Calculation When Real Prices Exist
If every item in the cart has a valid numeric value in `numericPrice` (e.g. `1850`), the line automatically switches to:
```text
Estimated Total: Rs. 5,450
```

---

## 3. Birthday & Event Booking WhatsApp Template

When a customer submits `#birthday-booking-form`, `buildBirthdayWhatsAppMessage()` formats:

```text
Hello Urban Cafe & Restaurant,
I would like to inquire about a Birthday / Event Booking:

BOOKING DETAILS:
Name: Sara Malik
Phone: +92 300 1234567
Preferred Date: 2026-11-15
Preferred Time: 19:30
Number of Guests: 18
Event Notes: Family birthday dinner, interested in table decor and platter package options.

Please share available packages and pricing. Thank you.
```

---

## 4. Accessible Modals & Navigation

1. **Mobile Navigation Drawer (`#mobile-nav-drawer`)**:
   - Controlled via `#mobile-menu-toggle` (`aria-expanded`, `aria-controls="mobile-nav-drawer"`) and `#mobile-menu-close`.
   - Closes automatically when any section link is clicked, when the backdrop is clicked, or when `Escape` is pressed.
2. **Cart Drawer (`#cart-drawer`)**:
   - Uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="cart-drawer-title"`.
   - Displays a floating/header Cart trigger with live item badge count (`#header-cart-count` and `#floating-cart-btn`).
   - Dynamically toggles the `#cart-address-group` field when `orderType === "Delivery"`.
3. **Gallery Lightbox (`#gallery-lightbox`)**:
   - Opens when any `.gallery-card` button is activated.
   - Supports `Previous` / `Next` buttons, keyboard `ArrowLeft` / `ArrowRight` navigation, and `Escape` to close.

---

## 5. Printable Table QR Code Section

- Renders a deterministic, high-contrast inline SVG QR matrix in `#table-qr-card` accompanied by the restaurant title, step-by-step table instructions, and a `"Print Table QR Card"` button (`window.print()`).
- Includes `@media print` rules in `styles.css` so printing the page outputs a clean table tent card.
- Marked with a `TODO` comment in `index.html` and `script.js` to encode the final production domain once deployed.
