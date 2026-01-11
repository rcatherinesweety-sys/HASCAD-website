// ================= NAVBAR SCROLL SHADOW =================
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ================= HAMBURGER TOGGLE =================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");

  // Animate hamburger lines
  hamburger.querySelectorAll("span").forEach((line, index) => {
    if (hamburger.classList.contains("open")) {
      if (index === 0) line.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (index === 1) line.style.opacity = "0";
      if (index === 2) line.style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      line.style.transform = "rotate(0) translate(0,0)";
      line.style.opacity = "1";
    }
  });
});

// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((reveal) => observer.observe(reveal));

// ================= HERO PARALLAX =================
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  hero.style.backgroundPositionY = `${scroll * 0.3}px`;
});

// ================= MULTI-STEP FORM =================
const steps = document.querySelectorAll(".step");
const dots = document.querySelectorAll(".dot");
const stepText = document.querySelector(".step-text");
const summary = document.querySelector(".selection-summary");

let currentStep = 0;
let selectedService = "";

// Step buttons
document.querySelectorAll(".option").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep === 0) selectedService = button.textContent;

    if (currentStep < steps.length - 1) {
      steps[currentStep].classList.remove("active");
      dots[currentStep].classList.remove("active");

      currentStep++;

      steps[currentStep].classList.add("active");
      dots[currentStep].classList.add("active");
      stepText.textContent = `Step ${currentStep + 1} of ${steps.length}`;

      if (currentStep === steps.length - 1) {
        summary.innerHTML = `You’re enquiring about: <strong>${selectedService}</strong>`;
      }
    }
  });
});

// Prevent empty form submission
document.querySelector(".submit").addEventListener("click", (e) => {
  const inputs = steps[steps.length - 1].querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) valid = false;
  });

  if (!valid) {
    e.preventDefault();
    alert("Please fill in all fields before submitting!");
  } else {
    alert("Thank you! Your request has been sent.");
  }
});

// ================= SMOOTH SCROLL FOR CTA BUTTONS =================
document.querySelectorAll(".hero-btn, .cta.primary").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70, // adjust for navbar height
        behavior: "smooth",
      });
    }
  });
});
