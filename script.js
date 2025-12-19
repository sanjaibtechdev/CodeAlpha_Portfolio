const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#primary-navigation");
const header = document.querySelector(".site-header");

if (navToggle && navLinks) {
  navLinks.dataset.open = "false";
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.dataset.open = expanded ? "false" : "true";
    header.classList.toggle("nav-open", !expanded);
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.dataset.open = "false";
      header.classList.remove("nav-open");
    });
  });
}

const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
  });

  revealTargets.forEach(target => observer.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add("is-visible"));
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
