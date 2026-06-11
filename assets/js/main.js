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

  /* ---------- Scrollable photo gallery ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var track = gallery.querySelector(".gallery__track");
    var prev = gallery.querySelector("[data-gallery-prev]");
    var next = gallery.querySelector("[data-gallery-next]");
    if (!track) return;
    function step() {
      var card = track.querySelector(".placeholder");
      return card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  });

  /* ---------- Photo sliders (sliding photos) ----------
     A [data-slider] shows one labeled placeholder at a time and slides
     between them. Works with any number of slides. Controls: prev/next
     arrows, clickable dots, touch swipe, and gentle autoplay that pauses on
     hover/focus, when off-screen, and when the user prefers reduced motion. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-slider]").forEach(function (slider, sIndex) {
    var track = slider.querySelector(".slider__track");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.querySelectorAll(".placeholder"));
    if (slides.length < 2) return; // a single photo has nothing to slide

    var prevBtn = slider.querySelector("[data-slider-prev]");
    var nextBtn = slider.querySelector("[data-slider-next]");
    var dotsWrap = slider.querySelector("[data-slider-dots]");
    var index = 0;
    var dots = [];
    var timer = null;
    var onScreen = false;

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + slides.length);
        dot.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function go(i) {
      index = (i % slides.length + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, di) { d.setAttribute("aria-current", String(di === index)); });
    }

    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    function play() {
      if (reduceMotion || timer || !onScreen) return;
      // Stagger each slider slightly so the cards do not all flip in unison.
      timer = setTimeout(function step() {
        go(index + 1);
        timer = setTimeout(step, 5000);
      }, 5000 + sIndex * 400);
    }
    function restart() { stop(); play(); }

    if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); restart(); });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", play);

    // Touch swipe
    var startX = null;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); }
      startX = null;
      play();
    }, { passive: true });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          onScreen = e.isIntersecting;
          if (onScreen) play(); else stop();
        });
      }, { threshold: 0.25 }).observe(slider);
    } else {
      onScreen = true; play();
    }

    go(0);
  });

  /* ---------- Impact numbers count up ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function fmt(n) { return Math.round(n).toLocaleString("en-US"); }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countIO.observe(el); });
  }
  /* If JS/observer unavailable, the final figures are already in the HTML. */

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
