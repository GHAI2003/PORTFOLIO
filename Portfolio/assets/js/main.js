
// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
  cursor2.style.top = e.clientY + "px";
  cursor2.style.left = e.clientX + "px";
});

// Typing Animation
const roles = [
  "Cloud Practitioner",
  "AWS Certified",
  "IT Enthusiast",
  "Networking Enthusiast",
  "Tech Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
const typedText = document.querySelector(".typed-text");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typedText.textContent += roles[roleIndex][charIndex++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1200);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = roles[roleIndex].substring(0, --charIndex);
    setTimeout(erase, 40);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}

if (typedText) type();

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

// Petals from left edge (DOM-based, light mode only)
function createPetal() {
  if (!document.body.classList.contains("light-mode")) return;

  const petal = document.createElement("div");
  petal.classList.add("falling-petal");

  const size = 30 + Math.random() * 20;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;

  const startY = Math.random() * window.innerHeight;
  petal.style.top = `${startY}px`;
  petal.style.left = `-40px`;

  petal.style.backgroundImage = "url('https://djjjk9bjm164h.cloudfront.net/petal.png')";
  petal.style.backgroundSize = "contain";
  petal.style.backgroundRepeat = "no-repeat";
  petal.style.backgroundPosition = "center";
  petal.style.position = "absolute";
  petal.style.opacity = "0.9";
  petal.style.pointerEvents = "none";
  petal.style.animation = "flyPetal 3s linear forwards";

  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 3000);
}

// Shooting Stars (Dark Mode Only)
function createShootingStar() {
  if (document.body.classList.contains("light-mode")) return;

  const star = document.createElement("div");
  star.classList.add("shooting-star");

  const width = Math.random() * 2 + 2;
  const height = width * 30;
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.width = `${width}px`;
  star.style.height = `${height}px`;
  star.style.background = "linear-gradient(white, rgba(255,255,255,0))";
  star.style.opacity = "1";

  document.getElementById("shooting-stars").appendChild(star);
  setTimeout(() => star.remove(), 3000);
}

// Animation Loops
let petalInterval = setInterval(createPetal, 300);
let starInterval = setInterval(createShootingStar, 700);

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  clearInterval(petalInterval);
  clearInterval(starInterval);

  if (document.body.classList.contains("light-mode")) {
    petalInterval = setInterval(createPetal, 300);
  } else {
    starInterval = setInterval(createShootingStar, 700);
  }
});

const carouselIndices = {};

function moveCarousel(direction, id) {
  const track = document.getElementById(id);
  const totalSlides = track.children.length;

  if (!carouselIndices[id]) carouselIndices[id] = 0;

  carouselIndices[id] += direction;
  if (carouselIndices[id] < 0) carouselIndices[id] = totalSlides - 1;
  if (carouselIndices[id] >= totalSlides) carouselIndices[id] = 0;

  const offset = carouselIndices[id] * track.clientWidth;
  track.style.transform = `translateX(-${offset}px)`;
}
