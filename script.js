
  const countdownDate = new Date("2026-11-15T19:30:00+07:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const gap = countdownDate - now;

    if (gap <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(gap / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const faqButtons = document.querySelectorAll(".faq__item");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector(".faq__icon");

      const isOpen = button.getAttribute("aria-expanded") === "true";

      
      faqButtons.forEach((otherButton) => {
        const otherAnswer = otherButton.nextElementSibling;
        const otherIcon = otherButton.querySelector(".faq__icon");

        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
          otherAnswer.classList.remove("is-open");
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      
      if (isOpen) {
        button.setAttribute("aria-expanded", "false");
        answer.classList.remove("is-open");
        if (icon) icon.textContent = "+";
      } else {
        button.setAttribute("aria-expanded", "true");
        answer.classList.add("is-open");
        if (icon) icon.textContent = "−";
      }
    });
  });

  const registerForm = document.getElementById("registerForm");

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.right = "20px";
    toast.style.bottom = "20px";
    toast.style.zIndex = "9999";
    toast.style.padding = "14px 18px";
    toast.style.borderRadius = "14px";
    toast.style.background = "linear-gradient(90deg, #D431A1, #E9F95B)";
    toast.style.color = "#0a0a0f";
    toast.style.fontWeight = "700";
    toast.style.boxShadow = "0 12px 30px rgba(0,0,0,0.35)";
    toast.style.transform = "translateY(20px)";
    toast.style.opacity = "0";
    toast.style.transition = "all 0.3s ease";
    toast.style.maxWidth = "90vw";

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    });

    setTimeout(() => {
      toast.style.transform = "translateY(20px)";
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2600);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const ticketType = document.getElementById("ticketType").value;

      if (!fullName || !email || !phone || !ticketType) {
        showToast("Lengkapi semua form terlebih dahulu.");
        return;
      }

      showToast(`Registrasi berhasil, ${fullName}! Data kamu sudah tersimpan.`);
      registerForm.reset();
    });
  }

  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      e.preventDefault();

      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
    } else {
      navbar.style.boxShadow = "none";
    }

  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");
  const prevLightboxBtn = document.getElementById("prevLightboxBtn");
  const nextLightboxBtn = document.getElementById("nextLightboxBtn");

  let currentLightboxIndex = 0;


  function getGalleryItems() {
    return Array.from(document.querySelectorAll(".gallery__item")).filter((item) => {
      const img = item.querySelector(".gallery__img");
      return img && img.src && img.getAttribute("src") !== "";
    });
  }


  function initGalleryClicks() {
    const allItems = document.querySelectorAll(".gallery__item");
    allItems.forEach((item) => {
      const img = item.querySelector(".gallery__img");
      // Hanya aktifkan klik jika foto sudah ada
      if (img && img.getAttribute("src") !== "") {
        item.addEventListener("click", () => {
          const filledItems = getGalleryItems();
          const idx = filledItems.indexOf(item);
          if (idx !== -1) openLightbox(idx);
        });
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const filledItems = getGalleryItems();
            const idx = filledItems.indexOf(item);
            if (idx !== -1) openLightbox(idx);
          }
        });
      }
    });
  }


  function openLightbox(index) {
    if (!lightboxModal) return;
    const filledItems = getGalleryItems();
    if (filledItems.length === 0) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const filledItems = getGalleryItems();
    const currentItem = filledItems[currentLightboxIndex];
    if (!currentItem) return;
    const img = currentItem.querySelector(".gallery__img");
    const caption = currentItem.querySelector(".gallery__caption");
    if (lightboxImg && img)          lightboxImg.src = img.src;
    if (lightboxCaption && caption)  lightboxCaption.textContent = caption.textContent;
  }

  function nextLightbox() {
    const total = getGalleryItems().length;
    currentLightboxIndex = (currentLightboxIndex + 1) % total;
    updateLightboxContent();
  }

  function prevLightbox() {
    const total = getGalleryItems().length;
    currentLightboxIndex = (currentLightboxIndex - 1 + total) % total;
    updateLightboxContent();
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
  if (nextLightboxBtn)  nextLightboxBtn.addEventListener("click", nextLightbox);
  if (prevLightboxBtn)  prevLightboxBtn.addEventListener("click", prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (!lightboxModal || lightboxModal.getAttribute("aria-hidden") === "true") return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowRight") nextLightbox();
    if (e.key === "ArrowLeft")  prevLightbox();
  });

  initGalleryClicks();

});


const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav a");

if (hamburgerBtn && navMenu) {

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("is-active");
      navMenu.classList.remove("is-active");
    });
  });
}
