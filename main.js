// Sidebar and overlay logic
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("mobile-menu-button");
const closeBtn = document.getElementById("close-sidebar");

openBtn.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// Hero carousel logic
const images = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1537202108838-e7072bad1927?auto=format&fit=crop&w=1080&q=80",
];

let currentIndex = 0;
const hero = document.getElementById("hero-carousel");
const progress1 = document.getElementById("progress1");
const progress2 = document.getElementById("progress2");

function fillBarsAndChangeImage() {
  // Reset bars
  progress1.classList.remove("w-full");
  progress2.classList.remove("w-full");
  progress1.classList.add("w-0");
  progress2.classList.add("w-0");

  // Fill first bar
  setTimeout(() => {
    progress1.classList.remove("w-0");
    progress1.classList.add("w-full");
  }, 100); // slight delay for animation

  // Fill second bar
  setTimeout(() => {
    progress2.classList.remove("w-0");
    progress2.classList.add("w-full");
  }, 3100); // wait for first bar (3s)

  // Change image after both are filled
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    hero.style.backgroundImage = `url('${images[currentIndex]}')`;
    fillBarsAndChangeImage(); // repeat
  }, 6200); // total 6.2s
}

fillBarsAndChangeImage(); // start carousel

// Enhance smooth scrolling for anchor links
if ("scrollBehavior" in document.documentElement.style) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Optimize page loading: Defer images offscreen (simple lazy loading)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
});

AOS.init({
  easing: "ease-in-out",
  duration: 1000,
  once: true,
});

// Back to Top Button functionality
window.onscroll = function () {
  let backToTopBtn = document.getElementById("back-to-top");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopBtn.style.opacity = 1;
  } else {
    backToTopBtn.style.opacity = 0;
  }
};

document.getElementById("back-to-top").onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Auto-update year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
