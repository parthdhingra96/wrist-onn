/**
 * Login Modal – Wrist Onn
 * Luxury login modal with blur, focus trap, validation
 */
(function () {
  "use strict";

  const body = document.body;
  const overlay = document.getElementById("login-modal-overlay");
  const modal = overlay?.querySelector(".login-modal");
  const loginBtn = document.querySelector(".btn-login");
  const closeBtn = document.querySelector(".login-modal-close");
  const loginForm = document.getElementById("login-form");
  const passwordWrap = document.querySelector(".password-wrap");
  const passwordInput = document.getElementById("login-password");
  const passwordToggle = document.querySelector(".password-toggle");

  const FOCUSABLE =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  if (!overlay || !modal || !loginBtn) return;

  // =================
  // Open modal
  // =================
  function openModal() {
    body.classList.add("modal-active");
    overlay.classList.add("modal-visible");
    overlay.setAttribute("aria-hidden", "false");

    // Focus first focusable element
    const firstFocusable = modal.querySelector(FOCUSABLE);
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    document.addEventListener("keydown", handleEscape);
    overlay.addEventListener("click", handleOverlayClick);
    setupFocusTrap();
  }

  // =================
  // Close modal
  // =================
  function closeModal() {
    body.classList.remove("modal-active");
    overlay.classList.remove("modal-visible");
    overlay.setAttribute("aria-hidden", "true");

    document.removeEventListener("keydown", handleEscape);
    overlay.removeEventListener("click", handleOverlayClick);
    removeFocusTrap();

    // Return focus to login button
    loginBtn?.focus();
  }

  function handleEscape(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === overlay) {
      closeModal();
    }
  }

  // =================
  // Focus trap
  // =================
  function setupFocusTrap() {
    document.addEventListener("keydown", handleFocusTrap);
  }

  function removeFocusTrap() {
    document.removeEventListener("keydown", handleFocusTrap);
  }

  function handleFocusTrap(e) {
    if (e.key !== "Tab") return;
    if (!overlay.classList.contains("modal-visible")) return;

    const focusables = Array.from(modal.querySelectorAll(FOCUSABLE)).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
    );

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // =================
  // Show / Hide password
  // =================
  if (passwordToggle && passwordInput && passwordWrap) {
    passwordToggle.addEventListener("click", () => {
      const isVisible = passwordInput.type === "text";
      passwordInput.type = isVisible ? "password" : "text";
      passwordWrap.classList.toggle("password-visible", !isVisible);
      passwordToggle.setAttribute(
        "aria-label",
        isVisible ? "Hide password" : "Show password"
      );
      passwordToggle.setAttribute("title", isVisible ? "Hide password" : "Show password");
    });
  }

  // =================
  // Validation
  // =================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail(email) {
    return emailRegex.test(email.trim());
  }

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input && errorEl) {
      input.classList.add("input-error");
      errorEl.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll(".form-group input").forEach((input) => {
      input.classList.remove("input-error");
    });
    document.querySelectorAll(".form-error").forEach((el) => {
      el.textContent = "";
    });
  }

  function validateForm() {
    clearErrors();

    const fullname = document.getElementById("login-fullname")?.value?.trim();
    const email = document.getElementById("login-email")?.value?.trim();
    const password = document.getElementById("login-password")?.value;

    let valid = true;

    if (!fullname) {
      showError("login-fullname", "error-fullname", "Please enter your full name");
      valid = false;
    }

    if (!email) {
      showError("login-email", "error-email", "Please enter your email");
      valid = false;
    } else if (!validateEmail(email)) {
      showError("login-email", "error-email", "Please enter a valid email address");
      valid = false;
    }

    if (!password) {
      showError("login-password", "error-password", "Please enter your password");
      valid = false;
    } else if (password.length < 6) {
      showError("login-password", "error-password", "Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  }

  // =================
  // Form submit
  // =================
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      // Simulate successful login (replace with real API call)
      console.log("Login submitted successfully");
      closeModal();
    });
  }

  // =================
  // Event bindings
  // =================
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener("click", closeModal);

  // Prevent forgot/signup links from navigating (placeholder)
  overlay.querySelector(".forgot-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    // Placeholder – could open forgot password modal
  });

  overlay.querySelector(".signup-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    // Placeholder – could open signup modal
  });
})();
