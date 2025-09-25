// Update clock every second
function updateTime() {
  const now = new Date();
  document.getElementById("currentTime").textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("infoNama").textContent = document.getElementById("nama").value;
  document.getElementById("infoTanggal").textContent = document.getElementById("tanggal").value;
  document.getElementById("infoGender").textContent = document.getElementById("gender").value;
  document.getElementById("infoPesan").textContent = document.getElementById("pesan").value;
});

// For the cards logic functions
const data = [
  { title: "About", desc: "This is the about description." },
  { title: "Mission", desc: "Our mission is to create amazing designs." },
  { title: "Vision", desc: "We envision a better future with design." }
];


// To Declare variables
let currentIndex = 0;
const titleEl = document.getElementById("card-title");
const descEl = document.getElementById("card-desc");
const dots = document.querySelectorAll(".dot");
const rightCard = document.querySelector(".right-card");

function updateCard(index) {
  titleEl.textContent = data[index].title;
  descEl.textContent = data[index].desc;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

// Make dots clickable
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    updateCard(currentIndex);
  });
});

// Swipe detection for touch
let startX = 0;

rightCard.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

rightCard.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
});

// Swipe detection for mouse (desktop drag)
let isDown = false;

rightCard.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.clientX;
});

rightCard.addEventListener("mouseup", (e) => {
  if (!isDown) return;
  isDown = false;
  let endX = e.clientX;
  handleSwipe(endX - startX);
});

// Shared swipe handler
function handleSwipe(deltaX) {
  if (deltaX < -50) {
    // swipe left
    currentIndex = (currentIndex + 1) % data.length;
    updateCard(currentIndex);
  } else if (deltaX > 50) {
    // swipe right
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    updateCard(currentIndex);
  }
}

// Initialize
updateCard(currentIndex);