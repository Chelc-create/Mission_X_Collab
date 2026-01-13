/* ================= NAV (Hamburger + overlay) ================= */
//UI
const menuButton = document.querySelector('.menu-hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const navOverlay = document.querySelector(`.nav-overlay`);
const mobileNavClose = document.querySelector('.mobile-nav-back');

// / Open/close menu (guarded so it won’t crash if an element is missing)
menuButton.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  navOverlay.classList.toggle('active');
})

// Click overlay to close menu
navOverlay.addEventListener('click', () =>{
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('active');
})

// Click button to close menu
mobileNavClose.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('active');
})


/* ================= PROGRESS BAR ================= */
//UI
const progressIndicator = document.querySelector('.progress-indicator');
const progressFill = document.querySelector('.progress-fill');
const progress = document.querySelector('.progress');

const currentStep = Number(progressIndicator.dataset.step);
console.log(currentStep);
const totalSteps = 5;
console.log(totalSteps)

const progressPercentage =
  // Gaps Moved      /   Total Gaps
  ((currentStep - 1) / (totalSteps - 1)) * 100;

console.log(progressPercentage)

// Visually fill the bar
progressFill.style.width = progressPercentage + '%';

// Accessibility: update aria-valuenow
progress.setAttribute('aria-valuenow', Math.round(progressPercentage));


/* ================= Exit Button ================= */
const exitButton = document.querySelector(".exit-cross");
const exitOverlay = document.querySelector(".exit-overlay");
const exitModal = document.querySelector(".exit-modal");
console.log(exitButton);
const keepEditingButton = document.querySelector(".exit-cancel");

if (exitButton) {exitButton.addEventListener("click", () => {
  console.log("exit clicked");
  exitOverlay.classList.add("active");
  exitModal.classList.add("active");
});

exitOverlay.addEventListener("click", () => {
  exitOverlay.classList.remove("active");
  exitModal.classList.remove("active");
});
}

if (keepEditingButton) {
  keepEditingButton.addEventListener("click", () => {
    exitOverlay.classList.remove("active");
    exitModal.classList.remove("active");
  });
}

/* ================= Exit to Home Button ================= */

const toHomeButton = document.querySelector(".exit-confirm");
if (toHomeButton) {
  toHomeButton.addEventListener("click", () => {
    exitOverlay.classList.remove("active");
    exitModal.classList.remove("active");
    saveDraft();
    window.location.href = "home.html";
  });
}
