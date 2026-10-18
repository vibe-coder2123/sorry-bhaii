const envelopeButton = document.getElementById("openEnvelope");
const openLetterText = document.getElementById("openLetterText");
const letterSection = document.getElementById("letter");
const floatingHearts = document.getElementById("floatingHearts");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightboxButton = document.getElementById("closeLightbox");
const sendLoveButton = document.getElementById("sendLove");
const hugMessage = document.getElementById("hugMessage");

let letterOpened = false;

function openLetter() {
  envelopeButton.classList.add("is-open");

  if (!letterOpened) {
    letterOpened = true;
    openLetterText.innerHTML = "a letter, just for you ♡ <span>↓</span>";
    makeHearts(12);
    window.setTimeout(() => {
      letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
  } else {
    letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

envelopeButton.addEventListener("click", openLetter);
openLetterText.addEventListener("click", openLetter);

// Reveal sections gently as they enter the screen.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Small floating hearts — no external libraries needed.
function makeHearts(amount) {
  for (let i = 0; i < amount; i++) {
    window.setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "float-heart";
      heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${13 + Math.random() * 18}px`;
      heart.style.animationDuration = `${4 + Math.random() * 3}s`;
      floatingHearts.appendChild(heart);
      window.setTimeout(() => heart.remove(), 7500);
    }, i * 140);
  }
}

// Tap any scrapbook photo to open it larger.
document.querySelectorAll(".photo-button").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeLightboxButton.focus();
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

closeLightboxButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

// The ending button offers a small, playful hug — not a forced reply.
sendLoveButton.addEventListener("click", () => {
  hugMessage.classList.add("show");
  makeHearts(18);
  sendLoveButton.innerHTML = "hug delivered ♡ <span>✓</span>";
});
