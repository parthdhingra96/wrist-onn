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
// Cart dummy logic
// =========================

const cartCountEl = document.getElementById("cart-count");
let cartCount = 0;

/**
 * Increments cart count and updates UI.
 * This is dummy logic – replace with real cart later.
 */
function incrementCart() {
  cartCount += 1;
  cartCountEl.textContent = cartCount;
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
      // Increment dummy cart
      incrementCart();

      // Simple ripple / feedback effect using CSS class
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, 250);
    });
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
  setupScrollReveal();
  setupMobileMenu();
  setupSmoothScrolling();
  setupAddToCartButtons();
  setCurrentYear();

  // Scroll listeners
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    setActiveNavOnScroll();
  });
});