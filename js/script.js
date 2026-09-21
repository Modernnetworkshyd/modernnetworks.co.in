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

/* MODERN NETWORKS V20 first-visit enquiry */
function initModernNetworksEnquiry(){
  if(sessionStorage.getItem("mnEnquiryShown")) return;
  const modal=document.createElement("div");
  modal.className="mn-enquiry-modal";
  modal.innerHTML=`<div class="mn-enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="mnEnquiryTitle"><button class="mn-enquiry-close" type="button" aria-label="Close enquiry form">×</button><div class="mn-enquiry-head"><img src="assets/modern-networks-logo.png" alt="Modern Networks logo"><div><b>QUICK ENQUIRY</b><small>Hyderabad • Telangana</small></div></div><div class="mn-enquiry-body"><h2 id="mnEnquiryTitle">How can we help?</h2><p>Share your requirement and we will prepare a WhatsApp enquiry for Modern Networks.</p><form class="mn-enquiry-form" id="mnWelcomeEnquiry"><label>Name<input name="name" autocomplete="name" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel" required></label><label>Service<select name="service" required><option value="">Select service</option><option>PBX / EPABX</option><option>Intercom</option><option>Networking / Wi-Fi</option><option>CCTV</option><option>Biometrics</option></select></label><label>Site Type<select name="site" required><option value="">Select site</option><option>Home</option><option>Office</option><option>Retail</option><option>Commercial</option><option>Institution</option></select></label><label class="full">Requirement<textarea name="message" placeholder="Briefly tell us what you need." required></textarea></label><button class="mn-enquiry-submit" type="submit">Continue to WhatsApp</button><small class="mn-enquiry-note">Your details are used to prepare the WhatsApp message you choose to send.</small></form></div></div>`;
  document.body.appendChild(modal);
  const close=()=>{modal.classList.remove("is-open");sessionStorage.setItem("mnEnquiryShown","1");};
  modal.querySelector(".mn-enquiry-close").addEventListener("click",close);
  modal.addEventListener("click",e=>{if(e.target===modal) close();});
  modal.querySelector("form").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget);const msg=[
    "Hello Modern Networks,","",
    "Name: "+d.get("name"),"Phone: "+d.get("phone"),"Service: "+d.get("service"),"Site Type: "+d.get("site"),"Requirement: "+d.get("message")
  ].join("\n");sessionStorage.setItem("mnEnquiryShown","1");window.open("https://wa.me/919346199444?text="+encodeURIComponent(msg),"_blank","noopener");modal.classList.remove("is-open");});
  setTimeout(()=>modal.classList.add("is-open"),900);
}

if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",initModernNetworksEnquiry);}else{initModernNetworksEnquiry();}
