document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("navLinks");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---- Theme toggle ----
  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    var root = document.documentElement;
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    var isDark = function () {
      var attr = root.getAttribute("data-theme");
      if (attr) return attr === "dark";
      return !!(mq && mq.matches);
    };
    var sync = function () { themeBtn.setAttribute("aria-pressed", isDark() ? "true" : "false"); };
    sync();
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    if (mq && mq.addEventListener) {
      mq.addEventListener("change", function () { if (!root.getAttribute("data-theme")) sync(); });
    }
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
  if (revealEls.length && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
});