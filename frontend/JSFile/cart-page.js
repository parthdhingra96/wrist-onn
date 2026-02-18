// cart-page.js (type="module")
// Flipkart-style cart page rendering + checkout flow

const STORAGE_KEY = "wristOnnCart";

const DELIVERY_CHARGE = 40; // ₹40 fixed
const HANDLING_FEE = 20; // ₹20 fixed
const GST_RATE = 0.05; // 5%

const els = {
  itemsList: document.getElementById("cart-items-list"),
  emptyState: document.getElementById("cart-empty"),
  cartCount: document.getElementById("cart-count"),
  itemTotal: document.getElementById("summary-item-total"),
  delivery: document.getElementById("summary-delivery"),
  gst: document.getElementById("summary-gst"),
  handling: document.getElementById("summary-handling"),
  grandTotal: document.getElementById("summary-grand-total"),
  placeOrderBtn: document.getElementById("place-order-btn"),
  paymentSection: document.getElementById("payment-section"),
  confirmOrderBtn: document.getElementById("confirm-order-btn"),
  successMsg: document.getElementById("order-success")
};

function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((x) => x && typeof x === "object")
      .map((item) => ({
        id: String(item.id ?? item.name ?? ""),
        image: String(item.image ?? ""),
        name: String(item.name ?? ""),
        description: String(item.description ?? item.name ?? ""),
        price: Number(item.price) || 0,
        quantity: Number(item.quantity ?? item.qty ?? 1) || 1
      }))
      .filter((item) => item.id && item.name);
  } catch {
    return [];
  }
}

function setCart(cartItems) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // ignore
  }
}

function clearCart() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function formatINR(amount) {
  const safe = Number(amount) || 0;
  return `₹${safe.toLocaleString("en-IN")}`;
}

function getTotalQuantity(cartItems) {
  return cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}

function computeItemTotal(cartItems) {
  return cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
}

function render() {
  const cart = getCart();

  // Count (badge)
  if (els.cartCount) {
    els.cartCount.textContent = String(getTotalQuantity(cart));
  }

  // Empty state
  const isEmpty = cart.length === 0;
  if (els.emptyState) els.emptyState.hidden = !isEmpty;
  if (els.itemsList) els.itemsList.innerHTML = "";

  if (!isEmpty && els.itemsList) {
    els.itemsList.innerHTML = cart
      .map((item) => {
        const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
        return `
          <article class="cart-item-row" data-id="${escapeHtml(item.id)}">
            <div class="cart-item-img">
              ${
                item.image
                  ? `<img src="${escapeAttr(item.image)}" alt="${escapeAttr(
                      item.name
                    )}" />`
                  : `<div class="cart-item-img-ph"></div>`
              }
            </div>

            <div class="cart-item-info">
              <h3 class="cart-item-name">${escapeHtml(item.name)}</h3>
              <p class="cart-item-desc">${escapeHtml(item.description)}</p>

              <div class="cart-item-meta">
                <div class="cart-item-price">
                  <span class="cart-item-price-main">${formatINR(item.price)}</span>
                  <span class="cart-item-line-total">${formatINR(lineTotal)}</span>
                </div>

                <div class="qty-controls" aria-label="Quantity controls">
                  <button class="qty-btn" type="button" data-action="dec" aria-label="Decrease quantity">−</button>
                  <span class="qty-value" aria-live="polite">${Number(item.quantity) || 1}</span>
                  <button class="qty-btn" type="button" data-action="inc" aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>

            <div class="cart-item-actions">
              <button class="remove-btn" type="button" data-action="remove">
                Remove
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // Summary
  const itemTotal = computeItemTotal(cart);
  const delivery = cart.length ? DELIVERY_CHARGE : 0;
  const handling = cart.length ? HANDLING_FEE : 0;
  const gst = cart.length ? Math.round(itemTotal * GST_RATE) : 0;
  const grand = itemTotal + delivery + handling + gst;

  if (els.itemTotal) els.itemTotal.textContent = formatINR(itemTotal);
  if (els.delivery) els.delivery.textContent = formatINR(delivery);
  if (els.handling) els.handling.textContent = formatINR(handling);
  if (els.gst) els.gst.textContent = formatINR(gst);
  if (els.grandTotal) els.grandTotal.textContent = formatINR(grand);

  // Checkout button states
  if (els.placeOrderBtn) {
    els.placeOrderBtn.disabled = isEmpty;
    els.placeOrderBtn.classList.toggle("is-disabled", isEmpty);
  }

  if (isEmpty && els.paymentSection) {
    els.paymentSection.hidden = true;
  }
}

function updateQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  const next = (Number(item.quantity) || 1) + delta;
  item.quantity = Math.max(1, next);
  setCart(cart);
  render();
}

function removeItem(id) {
  const cart = getCart().filter((x) => x.id !== id);
  setCart(cart);
  render();
}

function bindEvents() {
  if (els.itemsList) {
    els.itemsList.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-action]");
      if (!actionBtn) return;

      const row = actionBtn.closest("[data-id]");
      const id = row?.getAttribute("data-id");
      if (!id) return;

      const action = actionBtn.getAttribute("data-action");
      if (action === "inc") updateQuantity(id, 1);
      if (action === "dec") updateQuantity(id, -1);
      if (action === "remove") removeItem(id);
    });
  }

  if (els.placeOrderBtn && els.paymentSection) {
    els.placeOrderBtn.addEventListener("click", () => {
      els.paymentSection.hidden = false;
      els.paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Enable Confirm only after selecting a payment option
  document.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (e.target.name !== "payment") return;
    if (els.confirmOrderBtn) els.confirmOrderBtn.disabled = false;
  });

  if (els.confirmOrderBtn && els.successMsg) {
    els.confirmOrderBtn.addEventListener("click", () => {
      // must have selection
      const selected = document.querySelector('input[name="payment"]:checked');
      if (!selected) return;

      els.successMsg.hidden = false;
      els.confirmOrderBtn.disabled = true;

      // Clear cart
      clearCart();
      render();

      // Optional redirect to index after 2 seconds
      window.setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  }
}

// Basic escaping helpers (avoid breaking HTML when rendering names)
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(str) {
  // same as escapeHtml; kept separate for clarity
  return escapeHtml(str);
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  render();
});

