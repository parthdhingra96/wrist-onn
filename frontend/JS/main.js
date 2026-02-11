// main.js
// Shared UI behaviors for Wrist Onn homepage

import { initCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  await injectNavbar();
  await injectCartDrawer();

  initCart();
  bindScrollButtons();
  bindShopNow();
});

async function injectNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  try {
    const res = await fetch("components/navbar.html");
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error("Failed to load navbar:", err);
  }
}

async function injectCartDrawer() {
  const root = document.getElementById("cart-drawer-root");
  if (!root) return;

  try {
    const res = await fetch("components/cart-drawer.html");
    const html = await res.text();
    root.innerHTML = html;
  } catch (err) {
    console.error("Failed to load cart drawer:", err);
  }
}

function bindScrollButtons() {
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("[data-scroll]");
    if (!target) return;
    const selector = target.getAttribute("data-scroll");
    const el = document.querySelector(selector);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function bindShopNow() {
  const btn = document.getElementById("shop-now-btn");
  const section = document.getElementById("shop-section");
  if (!btn || !section) return;

  btn.addEventListener("click", () => {
    // Lightweight activation animation for the inline shop section
    section.classList.remove("shop-section-animated");
    // Force reflow so repeated clicks retrigger the animation
    // eslint-disable-next-line no-unused-expressions
    section.offsetWidth;
    section.classList.add("shop-section-animated");
  });
}

