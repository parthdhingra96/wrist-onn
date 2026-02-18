// cart.js
// Global cart management, side drawer, and localStorage syncing

const STORAGE_KEY = "wristOnnCart";

let cartItems = [];
let initialized = false;

export function initCart() {
  if (initialized) return;
  initialized = true;

  hydrateCartFromStorage();
  syncCartCount();
  bindCartDrawerEvents();
  bindAddToCartEvents();
  renderCartDrawer();
}

// Public API used by shop.js
export function addToCart(product) {
  const exists = cartItems.find((item) => item.id === product.id);
  if (!exists) {
    cartItems.push({ ...product, qty: 1 });
    persistCart();
    syncCartCount();
    renderCartDrawer();
    openCart();
  } else {
    openCart();
  }
}

function removeFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  persistCart();
  syncCartCount();
  renderCartDrawer();
}

function hydrateCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cartItems = parsed;
    }
  } catch (err) {
    console.warn("Unable to read cart from storage", err);
  }
}

function persistCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch (err) {
    console.warn("Unable to persist cart", err);
  }
}

function syncCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  countEl.textContent = String(cartItems.length);
}

function bindCartDrawerEvents() {
  document.body.addEventListener("click", (e) => {
    const openBtn = e.target.closest("#cart-open-btn");
    if (openBtn) {
      e.preventDefault();
      openCart();
      return;
    }

    const closeTrigger = e.target.closest("[data-cart-close]");
    if (closeTrigger) {
      e.preventDefault();
      closeCart();
      return;
    }

    const removeBtn = e.target.closest("[data-remove-id]");
    if (removeBtn) {
      const id = removeBtn.getAttribute("data-remove-id");
      removeFromCart(id);
    }
  });
}

function bindAddToCartEvents() {
  // event delegation for any button with data-product
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-product-id]");
    if (!btn) return;

    const id = btn.getAttribute("data-product-id");
    const name = btn.getAttribute("data-product-name");
    const price = Number(btn.getAttribute("data-product-price")) || 0;
    const image = btn.getAttribute("data-product-image") || "";

    addToCart({ id, name, price, image });
  });
}

function renderCartDrawer() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total-amount");
  if (!container || !totalEl) return;

  if (!cartItems.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is quietly waiting.</p>
        <p class="muted">Begin with a single, perfect timepiece.</p>
      </div>
    `;
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;
  const html = cartItems
    .map((item) => {
      total += item.price * (item.qty || 1);
      const formattedPrice = `$${item.price.toLocaleString()}`;
      return `
        <article class="cart-item">
          <div class="cart-item-media">
            ${
              item.image
                ? `<img src="${item.image}" alt="${item.name}" />`
                : `<div class="cart-item-placeholder"></div>`
            }
          </div>
          <div class="cart-item-main">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">${formattedPrice}</p>
          </div>
          <button
            class="icon-btn icon-btn-small"
            type="button"
            aria-label="Remove from cart"
            data-remove-id="${item.id}"
          >
            ×
          </button>
        </article>
      `;
    })
    .join("");

  container.innerHTML = html;
  totalEl.textContent = `$${total.toLocaleString()}`;
}

function openCart() {
  document.documentElement.classList.add("cart-open");
}

function closeCart() {
  document.documentElement.classList.remove("cart-open");
}

