// --- THREE JS STARS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const count = 3000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 1000;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ size: 1, color: 0xffffff });
const stars = new THREE.Points(geometry, material);
scene.add(stars);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// --- CURSOR ---
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// --- SELECT MENU ELEMENTS ---
const menu = document.querySelector(".menu");
const menuIcon = document.querySelector(".menu-icon");
const closeBtn = document.querySelector(".close-btn");

// Open Menu
menuIcon.onclick = () => {
  menu.classList.add("active");
};

// Close Menu
closeBtn.onclick = () => {
  menu.classList.remove("active");
};

// --- SMOOTH SCROLL & AUTO-CLOSE MENU ---
document.querySelectorAll(".menu a").forEach(link => {
  link.onclick = e => {
    const href = link.getAttribute("href");

    // Only prevent default if it's an internal section link (starts with #)
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Always close the menu after a click (even for the Resume link)
    menu.classList.remove("active");
  };
});

// --- SKILLS ANIMATION ---
window.addEventListener("scroll", () => {
  document.querySelectorAll(".progress").forEach(p => {
    let pos = p.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      p.style.width = p.getAttribute("data");
    }
  });
});

// --- CLICK ZOOM EFFECT ---
document.querySelectorAll(".click-card").forEach(card => {
  card.addEventListener("click", () => {
    card.style.transform = "scale(0.85)";
    card.style.boxShadow = "0 0 50px cyan";

    setTimeout(() => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 0 0px transparent";
    }, 1000);
  });
});

// --- PROFILE IMAGE FADE IN ---
window.addEventListener("load", () => {
  const img = document.querySelector(".profile-img");
  if (img) {
    img.style.transition = "all 0.5s ease-in-out";
    img.style.opacity = "1";
  }
});

// --- TYPED JS ---
var typed = new Typed("#typing", {
  strings: ["Frontend Developer", "Python Developer", "Freelancer"],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1000,
  loop: true
});