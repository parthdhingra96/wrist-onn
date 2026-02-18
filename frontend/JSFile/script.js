// =========================
// Utility: Smooth scroll
// =========================

/**
 * Smoothly scrolls to a target element.
 * @param {string} selector CSS selector for the target element.
 */
function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// =========================
// Navbar scroll effect
// =========================

const navbar = document.getElementById("navbar");

function handleNavbarScroll() {
  const offset = window.scrollY || window.pageYOffset;
  // Add subtle elevation effect after scrolling
  if (offset > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// =========================
// Cart (localStorage) + Toast
// =========================

const STORAGE_KEY = "wristOnnCart";
const cartCountEl = document.getElementById("cart-count");

/**
 * Reads cart from localStorage (safe).
 * Cart shape (stored):
 * [{ id, image, name, description, price:number, quantity:number }]
 */
function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Normalize older/alternate shapes (if any)
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
    // ignore storage failures (private mode / quota)
  }
}

function getCartTotalQuantity(cartItems) {
  return cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}

function syncCartCount() {
  if (!cartCountEl) return;
  const cart = getCart();
  cartCountEl.textContent = String(getCartTotalQuantity(cart));
}

function parsePriceToNumber(priceText) {
  // Examples in your HTML: "Rs 2999", "RS 999", "Rs 15000"
  if (!priceText) return 0;
  const digits = String(priceText).replace(/[^\d.]/g, "");
  const value = Number(digits);
  return Number.isFinite(value) ? value : 0;
}

function getProductFromAddButton(buttonEl) {
  const card = buttonEl.closest(".watch-card, .arrival-card, .trending-card");
  if (!card) return null;

  const imgEl = card.querySelector(".watch-image img");
  const nameEl = card.querySelector(".watch-name");
  const priceEl = card.querySelector(".watch-price");

  const name = (nameEl?.textContent || "").trim();
  const image = imgEl?.getAttribute("src") || imgEl?.src || "";
  const price = parsePriceToNumber((priceEl?.textContent || "").trim());

  if (!name) return null;

  return {
    id: name, // required: use product name as unique id
    image,
    name,
    description: name, // fallback if description not present
    price,
    quantity: 1
  };
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity = (Number(existing.quantity) || 0) + 1;
  } else {
    cart.push(product);
  }

  setCart(cart);
  syncCartCount();
}

let toastTimer = null;
function showToast(message) {
  // one toast at a time (simple + clean)
  const existing = document.querySelector(".wo-toast");
  if (existing) existing.remove();
  if (toastTimer) window.clearTimeout(toastTimer);

  const toast = document.createElement("div");
  toast.className = "wo-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // trigger animation
  requestAnimationFrame(() => toast.classList.add("wo-toast--show"));

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("wo-toast--show");
    window.setTimeout(() => toast.remove(), 250);
  }, 2000);
}

// =========================
// Scroll reveal animations
// =========================

const revealElements = document.querySelectorAll(".reveal");

function setupScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    // Fallback: show everything
    revealElements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// =========================
// Mobile nav toggle
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setupMobileMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu after clicking a link
  navLinks.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-link")) {
      navLinks.classList.remove("open");
    }
  });
}

// =========================
// Nav link active state
// =========================

const navLinkEls = document.querySelectorAll(".nav-link");

function setActiveNavOnScroll() {
  const sections = ["home", "shop", "featured", "new-arrivals", "trending", "about"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let currentId = "home";

  const offset = window.scrollY || window.pageYOffset;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + offset - 120; // slight offset for navbar
    if (offset >= top) {
      currentId = section.id;
    }
  });

  navLinkEls.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

// =========================
// CTA & nav smooth scrolling
// =========================

function setupSmoothScrolling() {
  // Navbar links
  navLinkEls.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("href");
      if (!target) return;
      smoothScrollTo(target);
    });
  });

  // Hero buttons
  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll-target");
      if (!target) return;
      smoothScrollTo(target);
    });
  });
}

// =========================
// Add-to-cart buttons
// =========================

function setupAddToCartButtons() {
  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = getProductFromAddButton(button);
      if (product) {
        addToCart(product);
        showToast("Product added to cart");
      }

      // Simple ripple / feedback effect using CSS class
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, 250);
    });
  });
}

// =========================
// Cart button navigation
// =========================

function setupCartNavigation() {
  const cartBtn = document.querySelector(".cart-btn");
  if (!cartBtn) return;
  cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

// =========================
// Footer year
// =========================

function setCurrentYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

// =========================
/* Init */
// =========================

document.addEventListener("DOMContentLoaded", () => {
  // Initial navbar state
  handleNavbarScroll();
  setActiveNavOnScroll();

  // Setup features
  syncCartCount();
  setupScrollReveal();
  setupMobileMenu();
  setupSmoothScrolling();
  setupAddToCartButtons();
  setupCartNavigation();
  setCurrentYear();

  // Scroll listeners
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    setActiveNavOnScroll();
  });
});