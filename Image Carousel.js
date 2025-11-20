const slidesContainer = document.getElementById("slides");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let images = [];
let index = 0;

// 1. Fetch images from Unsplash API
async function loadImages() {
  const res = await fetch(`https://api.unsplash.com/photos/random?count=5&query=nature&client_id=YOUR_UNSPLASH_API_KEY`);
  const data = await res.json();

  images = data.map(img => img.urls.regular);

  renderImages();
  startAutoSlide();
}

// 2. Render images into the slides container
function renderImages() {
  slidesContainer.innerHTML = images
    .map(url => `<img src="${url}" />`)
    .join("");
}

// 3. Slide functionality
function showSlide(i) {
  index = (i + images.length) % images.length;
  slidesContainer.style.transform = `translateX(${-index * 600}px)`;
}

nextBtn.addEventListener("click", () => showSlide(index + 1));
prevBtn.addEventListener("click", () => showSlide(index - 1));

// 4. Auto-slide
function startAutoSlide() {
  setInterval(() => {
    showSlide(index + 1);
  }, 3000);
}

// Load everything
loadImages();