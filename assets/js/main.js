/* =========================================================================
   Language Service Organization - site behavior
   1. Mobile nav (hamburger)
   2. Scroll-reveal motion
   3. i18n scaffold (English only today; structured for es/zh later)
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- 1. Mobile navigation ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  var backdrop = document.querySelector(".nav-backdrop");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("data-open", String(open));
    if (backdrop) backdrop.setAttribute("data-open", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    // Reset when resizing back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- 2. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 3. i18n scaffold ----------
     All translatable copy lives in elements tagged with data-i18n="key".
     Today only the `en` dictionary is filled, so the site renders from the
     HTML as written. To add Spanish or Chinese later, fill in the `es` and
     `zh` objects below (and translate the partner/people copy), then the
     language switcher in the header activates automatically. No markup
     rewrite required: the switcher reads available languages from here.     */
  var I18N = {
    en: { label: "English", htmlLang: "en" }
    // es: { label: "Español", htmlLang: "es", "nav.home": "Inicio", ... },
    // zh: { label: "中文", htmlLang: "zh", "nav.home": "首页", ... }
  };

  function applyLanguage(lang) {
    var dict = I18N[lang];
    if (!dict) return;
    document.documentElement.lang = dict.htmlLang || lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    try { localStorage.setItem("lso-lang", lang); } catch (e) {}
  }

  var switcher = document.querySelector(".lang-switch");
  if (switcher) {
    var available = Object.keys(I18N);
    switcher.querySelectorAll("button").forEach(function (b) {
      // Enable a language button only once its dictionary exists.
      if (available.indexOf(b.dataset.lang) === -1) {
        b.disabled = true;
        b.title = "Coming soon";
      } else {
        b.addEventListener("click", function () { applyLanguage(b.dataset.lang); });
      }
    });
    var saved;
    try { saved = localStorage.getItem("lso-lang"); } catch (e) {}
    applyLanguage(saved && I18N[saved] ? saved : "en");
  }

  /* ---------- Photo slots ----------
     Each photo slot contains a labeled placeholder plus a real <img> that
     points at a file in assets/img/. If that file has not been added yet,
     the image fails to load and we hide it so the labeled placeholder (with
     the exact file name to upload) shows instead. Add the file with the name
     shown on the slot and the photo appears automatically. */
  function hidePhoto(img) { img.style.display = "none"; }
  document.querySelectorAll(".placeholder__img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) hidePhoto(img);
    img.addEventListener("error", function () { hidePhoto(img); });
    img.addEventListener("load", function () { if (img.naturalWidth === 0) hidePhoto(img); });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
