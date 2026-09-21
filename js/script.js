document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.dataset.page === page) a.classList.add("active");
  });

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();


  // Homepage large image carousel: automatic fade, arrows and dots.
  const heroSlides = [...document.querySelectorAll(".hero-bg-slide")];
  const heroDots = [...document.querySelectorAll(".hero-large-controls .hero-slider-dots button")];
  let heroIndex = heroSlides.findIndex(el => el.classList.contains("active"));
  if (heroSlides.length) {
    if (heroIndex < 0) heroIndex = 0;
    const showHeroSlide = (index) => {
      heroIndex = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, i) => slide.classList.toggle("active", i === heroIndex));
      heroDots.forEach((dot, i) => dot.classList.toggle("active", i === heroIndex));
    };
    document.querySelector(".hero-slider-prev")?.addEventListener("click", () => showHeroSlide(heroIndex - 1));
    document.querySelector(".hero-slider-next")?.addEventListener("click", () => showHeroSlide(heroIndex + 1));
    heroDots.forEach((dot, i) => dot.addEventListener("click", () => showHeroSlide(i)));
    let heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), 4200);
    const hero = document.querySelector(".hero-large");
    hero?.addEventListener("mouseenter", () => clearInterval(heroTimer));
    hero?.addEventListener("mouseleave", () => { heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), 4200); });
    showHeroSlide(heroIndex);
  }


  const form = document.getElementById("enquiryForm");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Hello Modern Networks,%0A%0AName: ${encodeURIComponent(d.get("name"))}%0APhone: ${encodeURIComponent(d.get("phone"))}%0AService: ${encodeURIComponent(d.get("service"))}%0ARequirement: ${encodeURIComponent(d.get("message"))}`;
    window.open("https://wa.me/919346199444?text=" + msg, "_blank", "noopener");
    const s = document.getElementById("formStatus");
    if (s) s.textContent = "Your enquiry has been prepared for WhatsApp.";
    form.reset();
  });
});