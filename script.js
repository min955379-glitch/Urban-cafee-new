/**
 * Urban Cafe & Restaurant — Abbottabad
 * Main Application Script (script.js)
 * Built by BluePeakDesign — Vanilla JavaScript, Zero Frameworks, Zero Emojis
 */

/* ==========================================================================
   1. Top Configuration Block (Single Source of Truth)
   ========================================================================== */
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
  // TODO: Confirm live production domain URL for the printable QR table menu
  LIVE_SITE_URL: "https://urbancafeabbottabad.example.com/#menu",
  HOURS: {
    // TODO: Confirm daily and Friday opening hours with the owner
    summary: "Mon-Thu & Sat-Sun: 12:30 - 23:15 | Fri: 14:30 - 23:15",
    regular: "12:30 - 23:15",
    friday: "14:30 - 23:15"
  }
};

/* ==========================================================================
   2. Application State
   ========================================================================== */
const state = {
  categories: [],
  menuItems: [],
  activeCategory: "Popular",
  searchQuery: "",
  cart: [], // Array of { id, name, category, price, numericPrice, quantity }
  orderType: "Dine-in", // "Dine-in" | "Pickup" | "Delivery"
  customerName: "",
  customerPhone: "",
  deliveryAddress: "",
  orderNotes: "",
  lightboxIndex: 0,
  galleryItems: [
    {
      src: "/images/gallery-1.svg",
      title: "Family Dining Hall & Seating",
      subtitle: "Jadoon Plaza Phase 2, Mandian — Ambient Interior View (Placeholder)"
    },
    {
      src: "/images/gallery-2.svg",
      title: "Moroccan Steak & Sizzlers",
      subtitle: "Signature Char-Grilled Steaks & Chicken Specialities (Placeholder)"
    },
    {
      src: "/images/gallery-3.svg",
      title: "Creamy Alfredo & Mushroom Pasta",
      subtitle: "House Pasta Collection & Garlic Bread (Placeholder)"
    },
    {
      src: "/images/gallery-4.svg",
      title: "Urban Pizza & Jalapeno Burgers",
      subtitle: "Stone-Baked Pizzas, Loaded Fries & Gourmet Burgers (Placeholder)"
    },
    {
      src: "/images/gallery-5.svg",
      title: "Birthday & Family Celebrations",
      subtitle: "Private Table Arrangements & Group Gatherings (Placeholder)"
    },
    {
      src: "/images/gallery-6.svg",
      title: "Mint Margarita, Shakes & Coffee",
      subtitle: "Cold Beverages, Thick Shakes & Cafe Bar (Placeholder)"
    }
  ]
};

const CART_STORAGE_KEY = "urban_cafe_cart_v1";

/* ==========================================================================
   3. Inline SVG Icon Helpers (Consistent 24x24, stroke-width 1.85, Zero Emojis)
   ========================================================================== */
const ICONS = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>'
};

/* ==========================================================================
   4. Pure Helper Functions (Menu Filtering, Cart Summary, WhatsApp Message)
   ========================================================================== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFilteredMenuItems() {
  const query = state.searchQuery.trim().toLowerCase();
  if (query.length > 0) {
    return state.menuItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }
  if (state.activeCategory === "All") {
    return state.menuItems;
  }
  if (state.activeCategory === "Popular") {
    return state.menuItems.filter((item) => Boolean(item.popular));
  }
  return state.menuItems.filter((item) => item.category === state.activeCategory);
}

function getCartSummary() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasAllRealPrices =
    state.cart.length > 0 &&
    state.cart.every(
      (item) => typeof item.numericPrice === "number" && item.numericPrice > 0
    );
  const numericTotal = hasAllRealPrices
    ? state.cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0)
    : null;

  return { totalCount, hasAllRealPrices, numericTotal };
}

function buildWhatsAppOrderMessage() {
  const lines = [
    "Hello Urban Cafe & Restaurant,",
    "I would like to place an order from your website:",
    "",
    "ORDER ITEMS:"
  ];

  if (state.cart.length === 0) {
    lines.push("- (No items added yet)");
  } else {
    state.cart.forEach((item) => {
      lines.push(`- ${item.quantity}x ${item.name} (${item.price})`);
    });
  }

  const summary = getCartSummary();
  lines.push("");
  if (summary.hasAllRealPrices && summary.numericTotal !== null) {
    lines.push(`Estimated Total: Rs. ${summary.numericTotal.toLocaleString("en-PK")}`);
  } else {
    lines.push("Total: To be confirmed by restaurant (menu prices pending confirmation)");
  }

  lines.push("");
  lines.push("CUSTOMER DETAILS:");
  lines.push(`Name: ${state.customerName.trim() || "(Please enter your name)"}`);
  if (state.customerPhone.trim()) {
    lines.push(`Phone: ${state.customerPhone.trim()}`);
  }
  lines.push(`Order Type: ${state.orderType}`);
  if (state.orderType === "Delivery") {
    lines.push(`Delivery Address: ${state.deliveryAddress.trim() || "(Please enter delivery address)"}`);
  }
  if (state.orderNotes.trim()) {
    lines.push(`Notes: ${state.orderNotes.trim()}`);
  }
  lines.push("");
  lines.push("Please confirm availability and total bill. Thank you.");

  return lines.join("\n");
}

function buildWhatsAppUrl(message) {
  const cleanNumber = CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/* ==========================================================================
   5. Apply CONFIG Block to DOM
   ========================================================================== */
function applyConfigToDOM() {
  const defaultEnquiryUrl = buildWhatsAppUrl(
    "Hello Urban Cafe & Restaurant, I would like to view the menu and place an order."
  );

  document.querySelectorAll("[data-config-whatsapp]").forEach((el) => {
    el.setAttribute("href", defaultEnquiryUrl);
  });

  document.querySelectorAll("[data-config-phone1]").forEach((el) => {
    el.setAttribute("href", `tel:${CONFIG.PHONE_1_TEL}`);
  });
  document.querySelectorAll("[data-config-phone1-text]").forEach((el) => {
    el.textContent = CONFIG.PHONE_1;
  });

  document.querySelectorAll("[data-config-phone2]").forEach((el) => {
    el.setAttribute("href", `tel:${CONFIG.PHONE_2_TEL}`);
  });
  document.querySelectorAll("[data-config-phone2-text]").forEach((el) => {
    el.textContent = CONFIG.PHONE_2;
  });

  document.querySelectorAll("[data-config-email]").forEach((el) => {
    el.setAttribute("href", `mailto:${CONFIG.EMAIL}`);
  });
  document.querySelectorAll("[data-config-email-text]").forEach((el) => {
    el.textContent = CONFIG.EMAIL;
  });

  document.querySelectorAll("[data-config-facebook]").forEach((el) => {
    el.setAttribute("href", CONFIG.FACEBOOK_URL);
  });

  document.querySelectorAll("[data-config-tiktok]").forEach((el) => {
    el.setAttribute("href", CONFIG.TIKTOK_URL);
  });

  // Instagram link remains hidden unless an official handle is configured in CONFIG.INSTAGRAM_URL
  document.querySelectorAll("[data-config-instagram-item]").forEach((el) => {
    if (CONFIG.INSTAGRAM_URL && CONFIG.INSTAGRAM_URL.trim().length > 0) {
      el.removeAttribute("hidden");
      const anchor = el.querySelector("a") || el;
      if (anchor.tagName === "A") {
        anchor.setAttribute("href", CONFIG.INSTAGRAM_URL);
      }
    } else {
      el.setAttribute("hidden", "");
    }
  });

  document.querySelectorAll("[data-config-hours-summary]").forEach((el) => {
    el.textContent = CONFIG.HOURS.summary;
  });

  const qrUrlLabel = document.getElementById("qr-live-url-text");
  if (qrUrlLabel) {
    qrUrlLabel.textContent = CONFIG.LIVE_SITE_URL;
  }
}

/* ==========================================================================
   6. Load & Render Menu from menu.json
   ========================================================================== */
async function loadMenu() {
  const gridEl = document.getElementById("menu-items-grid");
  const fallbackEl = document.getElementById("menu-error-fallback");
  const statusEl = document.getElementById("menu-status-count");

  try {
    const response = await fetch("./menu.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    state.categories = Array.isArray(data.categories) ? data.categories : [];
    state.menuItems = Array.isArray(data.items) ? data.items : [];

    if (fallbackEl) fallbackEl.setAttribute("hidden", "");
    renderCategoryTabs();
    renderMenuItems();
  } catch (err) {
    if (gridEl) gridEl.innerHTML = "";
    if (statusEl) statusEl.textContent = "Menu data temporarily unavailable";
    if (fallbackEl) {
      fallbackEl.removeAttribute("hidden");
    }
  }
}

function renderCategoryTabs() {
  const tabList = document.getElementById("menu-category-tabs");
  if (!tabList) return;

  const allTabs = [...state.categories, "All"];
  tabList.innerHTML = allTabs
    .map((cat) => {
      const isSelected = state.activeCategory === cat && state.searchQuery.trim() === "";
      const label = cat === "All" ? "All Categories" : cat;
      return `<button
        type="button"
        role="tab"
        class="category-tab"
        aria-selected="${isSelected ? "true" : "false"}"
        data-category="${escapeHtml(cat)}"
      >${escapeHtml(label)}</button>`;
    })
    .join("");
}

function renderMenuItems() {
  const gridEl = document.getElementById("menu-items-grid");
  const statusEl = document.getElementById("menu-status-count");
  if (!gridEl) return;

  const items = getFilteredMenuItems();

  if (statusEl) {
    if (state.searchQuery.trim().length > 0) {
      statusEl.textContent = `Showing ${items.length} matching dish${items.length === 1 ? "" : "es"} for "${state.searchQuery.trim()}"`;
    } else if (state.activeCategory === "Popular") {
      statusEl.textContent = `Showing ${items.length} customer-favorite dishes across categories`;
    } else if (state.activeCategory === "All") {
      statusEl.textContent = `Showing all ${items.length} sample menu dishes`;
    } else {
      statusEl.textContent = `Category: ${state.activeCategory} (${items.length} dish${items.length === 1 ? "" : "es"})`;
    }
  }

  if (items.length === 0) {
    gridEl.innerHTML = `
      <div class="menu-fallback-box" style="grid-column: 1 / -1;">
        <h3 class="menu-item-title">No matching dishes found</h3>
        <p class="menu-item-desc" style="margin-bottom: 1rem;">
          We could not find any menu items matching "${escapeHtml(state.searchQuery.trim())}". Try clearing your search or selecting another category tab.
        </p>
        <button type="button" class="btn btn-secondary" id="reset-menu-filter-btn">
          Show Popular Dishes
        </button>
      </div>
    `;
    const resetBtn = document.getElementById("reset-menu-filter-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.searchQuery = "";
        state.activeCategory = "Popular";
        const searchInput = document.getElementById("menu-search-input");
        const clearBtn = document.getElementById("menu-search-clear");
        if (searchInput) searchInput.value = "";
        if (clearBtn) clearBtn.setAttribute("hidden", "");
        renderCategoryTabs();
        renderMenuItems();
      });
    }
    return;
  }

  gridEl.innerHTML = items
    .map((item) => {
      const cartEntry = state.cart.find((c) => c.id === item.id);
      const quantityInCart = cartEntry ? cartEntry.quantity : 0;

      const metaLine = item.popular
        ? `<div class="menu-card-meta">
             <span>${escapeHtml(item.category)}</span>
             <span aria-hidden="true">&middot;</span>
             <span class="menu-popular-label">Popular</span>
           </div>`
        : `<div class="menu-card-meta">
             <span>${escapeHtml(item.category)}</span>
           </div>`;

      const actionControl =
        quantityInCart > 0
          ? `<div class="card-qty-stepper" role="group" aria-label="Quantity for ${escapeHtml(item.name)}">
               <button type="button" class="stepper-btn" data-action="decrement" data-item-id="${escapeHtml(item.id)}" aria-label="Decrease quantity of ${escapeHtml(item.name)}">
                 ${ICONS.minus}
               </button>
               <span class="stepper-value" aria-live="polite">${quantityInCart}</span>
               <button type="button" class="stepper-btn" data-action="increment" data-item-id="${escapeHtml(item.id)}" aria-label="Increase quantity of ${escapeHtml(item.name)}">
                 ${ICONS.plus}
               </button>
             </div>`
          : `<button type="button" class="btn-add-item" data-action="add" data-item-id="${escapeHtml(item.id)}" aria-label="Add ${escapeHtml(item.name)} to order">
               ${ICONS.plus}
               <span>Add</span>
             </button>`;

      return `
        <article class="menu-card" data-item-card="${escapeHtml(item.id)}">
          <div class="menu-card-top">
            ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" class="menu-item-img" loading="lazy" width="400" height="300" />` : ""}
            ${metaLine}
            <h3 class="menu-item-title">${escapeHtml(item.name)}</h3>
            <p class="menu-item-desc">${escapeHtml(item.description || "")}</p>
          </div>
          <div class="menu-card-footer">
            <div>
              <!-- TODO: Replace Rs. --- placeholder in menu.json once owner confirms menu prices -->
              <span class="menu-item-price">${escapeHtml(item.price)}</span>
              <span class="menu-price-sub">Price on confirmation</span>
            </div>
            ${actionControl}
          </div>
        </article>
      `;
    })
    .join("");
}

/* ==========================================================================
   7. Cart Operations & Slide-Over Drawer
   ========================================================================== */
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.cart = parsed.filter((i) => i && i.id && i.quantity > 0);
      }
    }
  } catch (_e) {
    state.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  } catch (_e) {
    // Ignore storage quota errors in restricted environments
  }
}

function updateItemQuantity(itemId, delta) {
  const menuItem = state.menuItems.find((m) => m.id === itemId);
  const existingIndex = state.cart.findIndex((c) => c.id === itemId);

  if (existingIndex > -1) {
    const newQty = state.cart[existingIndex].quantity + delta;
    if (newQty <= 0) {
      state.cart.splice(existingIndex, 1);
    } else {
      state.cart[existingIndex].quantity = newQty;
    }
  } else if (delta > 0 && menuItem) {
    state.cart.push({
      id: menuItem.id,
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.price,
      numericPrice: menuItem.numericPrice,
      quantity: delta
    });
  }

  saveCartToStorage();
  renderMenuItems();
  renderCartDrawer();
}

function renderCartDrawer() {
  const summary = getCartSummary();

  // Update header & mobile badges
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(summary.totalCount);
  });

  const emptyEl = document.getElementById("cart-empty-state");
  const contentEl = document.getElementById("cart-populated-content");
  const listEl = document.getElementById("cart-items-list");
  const totalNoteEl = document.getElementById("cart-total-summary");
  const previewPreEl = document.getElementById("whatsapp-preview-text");
  const addressGroupEl = document.getElementById("cart-address-group");
  const directWhatsappLink = document.getElementById("cart-direct-whatsapp-link");

  if (addressGroupEl) {
    if (state.orderType === "Delivery") {
      addressGroupEl.removeAttribute("hidden");
    } else {
      addressGroupEl.setAttribute("hidden", "");
    }
  }

  if (state.cart.length === 0) {
    if (emptyEl) emptyEl.removeAttribute("hidden");
    if (contentEl) contentEl.setAttribute("hidden", "");
  } else {
    if (emptyEl) emptyEl.setAttribute("hidden", "");
    if (contentEl) contentEl.removeAttribute("hidden");

    if (listEl) {
      listEl.innerHTML = state.cart
        .map(
          (item) => `
          <li class="cart-line-item">
            <div class="cart-line-info">
              <div class="cart-line-name">${escapeHtml(item.name)}</div>
              <div class="cart-line-meta">${escapeHtml(item.price)} each &middot; ${escapeHtml(item.category)}</div>
            </div>
            <div class="card-qty-stepper" role="group" aria-label="Adjust quantity for ${escapeHtml(item.name)}">
              <button type="button" class="stepper-btn" data-cart-action="decrement" data-item-id="${escapeHtml(item.id)}" aria-label="Decrease ${escapeHtml(item.name)}">
                ${ICONS.minus}
              </button>
              <span class="stepper-value">${item.quantity}</span>
              <button type="button" class="stepper-btn" data-cart-action="increment" data-item-id="${escapeHtml(item.id)}" aria-label="Increase ${escapeHtml(item.name)}">
                ${ICONS.plus}
              </button>
            </div>
          </li>
        `
        )
        .join("");
    }

    if (totalNoteEl) {
      if (summary.hasAllRealPrices && summary.numericTotal !== null) {
        totalNoteEl.textContent = `Estimated Total: Rs. ${summary.numericTotal.toLocaleString("en-PK")}`;
      } else {
        totalNoteEl.textContent = "Total Bill: Confirmed by restaurant on WhatsApp (sample prices marked Rs. ---)";
      }
    }
  }

  const message = buildWhatsAppOrderMessage();
  if (previewPreEl) {
    previewPreEl.textContent = message;
  }
  if (directWhatsappLink) {
    directWhatsappLink.setAttribute("href", buildWhatsAppUrl(message));
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.classList.add("is-open");
  renderCartDrawer();
  const closeBtn = document.getElementById("cart-drawer-close");
  if (closeBtn) closeBtn.focus();
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.classList.remove("is-open");
}

/* ==========================================================================
   8. Mobile Navigation Drawer
   ========================================================================== */
function openMobileNav() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  if (!drawer || !backdrop) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.classList.add("is-open");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
  const closeBtn = document.getElementById("mobile-menu-close");
  if (closeBtn) closeBtn.focus();
}

function closeMobileNav() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  if (!drawer || !backdrop) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.classList.remove("is-open");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
}

/* ==========================================================================
   9. Gallery Lightbox Modal
   ========================================================================== */
function openLightbox(index) {
  state.lightboxIndex = (index + state.galleryItems.length) % state.galleryItems.length;
  const modal = document.getElementById("gallery-lightbox");
  if (!modal) return;
  updateLightboxView();
  modal.removeAttribute("hidden");
  const closeBtn = document.getElementById("lightbox-close-btn");
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const modal = document.getElementById("gallery-lightbox");
  if (!modal) return;
  modal.setAttribute("hidden", "");
}

function updateLightboxView() {
  const item = state.galleryItems[state.lightboxIndex];
  if (!item) return;
  const imgEl = document.getElementById("lightbox-image");
  const titleEl = document.getElementById("lightbox-title");
  const subEl = document.getElementById("lightbox-subtitle");
  const counterEl = document.getElementById("lightbox-counter");

  if (imgEl) {
    imgEl.setAttribute("src", item.src);
    imgEl.setAttribute("alt", item.title);
  }
  if (titleEl) titleEl.textContent = item.title;
  if (subEl) subEl.textContent = item.subtitle;
  if (counterEl) {
    counterEl.textContent = `Placeholder ${state.lightboxIndex + 1} of ${state.galleryItems.length}`;
  }
}

/* ==========================================================================
   10. Event Listeners & Initialization
   ========================================================================== */
function initEventListeners() {
  // Mobile menu drawer events
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileClose = document.getElementById("mobile-menu-close");
  const mobileBackdrop = document.getElementById("mobile-nav-backdrop");
  if (mobileToggle) mobileToggle.addEventListener("click", openMobileNav);
  if (mobileClose) mobileClose.addEventListener("click", closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMobileNav);

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Cart drawer open/close events
  document.querySelectorAll("[data-open-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeMobileNav();
      openCartDrawer();
    });
  });

  const cartClose = document.getElementById("cart-drawer-close");
  const cartBackdrop = document.getElementById("cart-backdrop");
  if (cartClose) cartClose.addEventListener("click", closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartDrawer);

  // Category tab selection
  const tabContainer = document.getElementById("menu-category-tabs");
  if (tabContainer) {
    tabContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-category]");
      if (!btn) return;
      state.activeCategory = btn.getAttribute("data-category") || "Popular";
      // Clear active search query when switching category tabs so user sees that category immediately
      state.searchQuery = "";
      const searchInput = document.getElementById("menu-search-input");
      const clearBtn = document.getElementById("menu-search-clear");
      if (searchInput) searchInput.value = "";
      if (clearBtn) clearBtn.setAttribute("hidden", "");
      renderCategoryTabs();
      renderMenuItems();
    });
  }

  // Menu search input
  const searchInput = document.getElementById("menu-search-input");
  const clearBtn = document.getElementById("menu-search-clear");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value || "";
      if (clearBtn) {
        if (state.searchQuery.trim().length > 0) {
          clearBtn.removeAttribute("hidden");
        } else {
          clearBtn.setAttribute("hidden", "");
        }
      }
      renderCategoryTabs();
      renderMenuItems();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      clearBtn.setAttribute("hidden", "");
      renderCategoryTabs();
      renderMenuItems();
    });
  }

  // Menu item Add / Stepper clicks
  const menuGrid = document.getElementById("menu-items-grid");
  if (menuGrid) {
    menuGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const itemId = btn.getAttribute("data-item-id");
      const action = btn.getAttribute("data-action");
      if (!itemId) return;

      if (action === "add" || action === "increment") {
        updateItemQuantity(itemId, 1);
      } else if (action === "decrement") {
        updateItemQuantity(itemId, -1);
      }
    });
  }

  // Cart drawer item quantity clicks
  const cartList = document.getElementById("cart-items-list");
  if (cartList) {
    cartList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cart-action]");
      if (!btn) return;
      const itemId = btn.getAttribute("data-item-id");
      const action = btn.getAttribute("data-cart-action");
      if (!itemId) return;
      if (action === "increment") {
        updateItemQuantity(itemId, 1);
      } else if (action === "decrement") {
        updateItemQuantity(itemId, -1);
      }
    });
  }

  // Order type buttons inside Cart Drawer
  document.querySelectorAll("[data-order-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedType = btn.getAttribute("data-order-type");
      if (!selectedType) return;
      state.orderType = selectedType;
      document.querySelectorAll("[data-order-type]").forEach((b) => {
        b.setAttribute(
          "aria-pressed",
          b.getAttribute("data-order-type") === selectedType ? "true" : "false"
        );
      });
      renderCartDrawer();
    });
  });

  // Cart customer input sync
  const nameInput = document.getElementById("cart-customer-name");
  const phoneInput = document.getElementById("cart-customer-phone");
  const addressInput = document.getElementById("cart-delivery-address");
  const notesInput = document.getElementById("cart-order-notes");

  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      state.customerName = e.target.value;
      nameInput.removeAttribute("aria-invalid");
      renderCartDrawer();
    });
  }
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      state.customerPhone = e.target.value;
      renderCartDrawer();
    });
  }
  if (addressInput) {
    addressInput.addEventListener("input", (e) => {
      state.deliveryAddress = e.target.value;
      addressInput.removeAttribute("aria-invalid");
      renderCartDrawer();
    });
  }
  if (notesInput) {
    notesInput.addEventListener("input", (e) => {
      state.orderNotes = e.target.value;
      renderCartDrawer();
    });
  }

  // Send order on WhatsApp button
  const sendWhatsappBtn = document.getElementById("send-whatsapp-order-btn");
  const cartFeedback = document.getElementById("cart-form-feedback");
  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => {
      if (state.cart.length === 0) {
        if (cartFeedback) {
          cartFeedback.className = "form-feedback is-error";
          cartFeedback.textContent = "Please add at least one dish from the menu first.";
          cartFeedback.removeAttribute("hidden");
        }
        return;
      }

      if (!state.customerName.trim()) {
        if (nameInput) {
          nameInput.setAttribute("aria-invalid", "true");
          nameInput.focus();
        }
        if (cartFeedback) {
          cartFeedback.className = "form-feedback is-error";
          cartFeedback.textContent = "Please enter your name so the restaurant can identify your order.";
          cartFeedback.removeAttribute("hidden");
        }
        return;
      }

      if (state.orderType === "Delivery" && !state.deliveryAddress.trim()) {
        if (addressInput) {
          addressInput.setAttribute("aria-invalid", "true");
          addressInput.focus();
        }
        if (cartFeedback) {
          cartFeedback.className = "form-feedback is-error";
          cartFeedback.textContent = "Please provide a delivery address in Abbottabad for Delivery orders.";
          cartFeedback.removeAttribute("hidden");
        }
        return;
      }

      const message = buildWhatsAppOrderMessage();
      const waUrl = buildWhatsAppUrl(message);

      if (cartFeedback) {
        cartFeedback.className = "form-feedback is-success";
        cartFeedback.innerHTML = `Order message ready for WhatsApp. <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; margin-left: 4px;">Open WhatsApp Chat</a>`;
        cartFeedback.removeAttribute("hidden");
      }

      const directLink = document.getElementById("cart-direct-whatsapp-link");
      if (directLink) {
        directLink.setAttribute("href", waUrl);
      }
    });
  }

  // Gallery Lightbox events
  document.querySelectorAll("[data-gallery-index]").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = Number(card.getAttribute("data-gallery-index") || 0);
      openLightbox(idx);
    });
  });

  const lbClose = document.getElementById("lightbox-close-btn");
  const lbPrev = document.getElementById("lightbox-prev-btn");
  const lbNext = document.getElementById("lightbox-next-btn");
  const lbModal = document.getElementById("gallery-lightbox");

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) {
    lbPrev.addEventListener("click", () => {
      state.lightboxIndex =
        (state.lightboxIndex - 1 + state.galleryItems.length) %
        state.galleryItems.length;
      updateLightboxView();
    });
  }
  if (lbNext) {
    lbNext.addEventListener("click", () => {
      state.lightboxIndex =
        (state.lightboxIndex + 1) % state.galleryItems.length;
      updateLightboxView();
    });
  }
  if (lbModal) {
    lbModal.addEventListener("click", (e) => {
      if (e.target === lbModal) closeLightbox();
    });
  }

  // Birthday & Event Booking Form
  const birthdayForm = document.getElementById("birthday-booking-form");
  const birthdayFeedback = document.getElementById("birthday-form-feedback");
  const birthdayPreviewBox = document.getElementById("birthday-whatsapp-preview");
  const birthdayPreviewText = document.getElementById("birthday-preview-text");
  const birthdayDirectLink = document.getElementById("birthday-direct-wa-link");

  if (birthdayForm) {
    birthdayForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const bName = document.getElementById("bday-name");
      const bPhone = document.getElementById("bday-phone");
      const bDate = document.getElementById("bday-date");
      const bTime = document.getElementById("bday-time");
      const bGuests = document.getElementById("bday-guests");
      const bNotes = document.getElementById("bday-notes");

      const requiredFields = [bName, bPhone, bDate, bTime, bGuests];
      let firstInvalid = null;

      requiredFields.forEach((field) => {
        if (!field) return;
        if (!field.value.trim()) {
          field.setAttribute("aria-invalid", "true");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        if (birthdayFeedback) {
          birthdayFeedback.className = "form-feedback is-error";
          birthdayFeedback.textContent = "Please fill in your name, phone number, preferred date, time, and number of guests.";
          birthdayFeedback.removeAttribute("hidden");
        }
        return;
      }

      const lines = [
        "Hello Urban Cafe & Restaurant,",
        "I would like to inquire about a Birthday / Event Booking:",
        "",
        "BOOKING DETAILS:",
        `Name: ${bName.value.trim()}`,
        `Phone: ${bPhone.value.trim()}`,
        `Preferred Date: ${bDate.value.trim()}`,
        `Preferred Time: ${bTime.value.trim()}`,
        `Number of Guests: ${bGuests.value.trim()}`
      ];

      if (bNotes && bNotes.value.trim()) {
        lines.push(`Event Notes: ${bNotes.value.trim()}`);
      }
      lines.push("");
      lines.push("Please share available packages and pricing. Thank you.");

      const message = lines.join("\n");
      const waUrl = buildWhatsAppUrl(message);

      if (birthdayPreviewText) birthdayPreviewText.textContent = message;
      if (birthdayDirectLink) birthdayDirectLink.setAttribute("href", waUrl);
      if (birthdayPreviewBox) birthdayPreviewBox.removeAttribute("hidden");

      if (birthdayFeedback) {
        birthdayFeedback.className = "form-feedback is-success";
        birthdayFeedback.innerHTML = `Booking inquiry prepared. Click "Open Booking in WhatsApp" below to send directly to Urban Cafe & Restaurant.`;
        birthdayFeedback.removeAttribute("hidden");
      }
    });
  }

  // Printable Table QR Card button
  const printQrBtn = document.getElementById("print-qr-btn");
  if (printQrBtn) {
    printQrBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Global Escape & Arrow key handlers for modals
  document.addEventListener("keydown", (e) => {
    const lbModalEl = document.getElementById("gallery-lightbox");
    const isLightboxOpen = lbModalEl && !lbModalEl.hasAttribute("hidden");

    if (e.key === "Escape") {
      if (isLightboxOpen) {
        closeLightbox();
      } else {
        closeCartDrawer();
        closeMobileNav();
      }
    } else if (isLightboxOpen && e.key === "ArrowLeft") {
      state.lightboxIndex =
        (state.lightboxIndex - 1 + state.galleryItems.length) %
        state.galleryItems.length;
      updateLightboxView();
    } else if (isLightboxOpen && e.key === "ArrowRight") {
      state.lightboxIndex =
        (state.lightboxIndex + 1) % state.galleryItems.length;
      updateLightboxView();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfigToDOM();
  loadCartFromStorage();
  initEventListeners();
  renderCartDrawer();
  loadMenu();
});
