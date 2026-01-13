console.log("hello world")

// NavBar
// Menu Hamburger:
const menuButton = document.querySelector('.menu-hamburger');
// Mobile Nav:
const mobileNav = document.querySelector('.mobile-nav');
//Overlay:
const navOverlay = document.querySelector(`.nav-overlay`);
// Close Menu:
const mobileNavClose = document.querySelector('.mobile-nav-back');


menuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    navOverlay.classList.toggle('active');
})

navOverlay.addEventListener('click', () =>{
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('active');
})

mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('active');
})


/* ================= Progress Bar ================= */
const progressIndicator = document.querySelector('.progress-indicator');
const progressFill = document.querySelector('.progress-fill');
const progress = document.querySelector('.progress');

const currentStep = Number(progressIndicator.dataset.step);
console.log(currentStep);
const totalSteps = 5;
console.log(totalSteps)

const progressPercentage =
((currentStep - 1) / (totalSteps - 1)) * 100;
console.log(progressPercentage)

progressFill.style.width = progressPercentage + '%';
progress.setAttribute('aria-valuenow', Math.round(progressPercentage));

/* ================= Exit Button ================= */
const exitButton = document.querySelector('.exit-cross');
const exitOverlay = document.querySelector('.exit-overlay')
const exitModal = document.querySelector('.exit-modal')
console.log(exitButton)
const keepEditingButton = document.querySelector('.exit-cancel')

exitButton.addEventListener('click', () => {
    console.log('exit clicked')
    exitOverlay.classList.add('active');
    exitModal.classList.add('active');
})

exitOverlay.addEventListener('click', () => {
    exitOverlay.classList.remove('active');
    exitModal.classList.remove('active');
})

if (keepEditingButton) {
  keepEditingButton.addEventListener('click', () => {
    exitOverlay.classList.remove('active');
    exitModal.classList.remove('active');
  });
}

/* ================= Exit to Home Button ================= */

const toHomeButton = document.querySelector('.exit-confirm');
if (toHomeButton) {
  toHomeButton.addEventListener('click', () => {
    exitOverlay.classList.remove('active');
    exitModal.classList.remove('active');
    saveDraft();
    window.location.href = 'home.html';
  });
}


/* ================= Summary Pieces ================= */
const locationE1 = document.querySelector("#summary-location");
const categoryE1 = document.querySelector("#summary-category");
const descriptionE1 = document.querySelector("#summary-description");

console.log(locationE1, categoryE1, descriptionE1);

//Reading saved draft
const report = getReport();
console.log(report);
console.log("report from storage", report)

locationE1.textContent = report.location || "Not provided";
categoryE1.textContent = report.category || "Not provided";
descriptionE1.textContent = report.description || "Not provided";




/* ================= Generating Report ID ================= */

// This function creates and returns a unique report ID
function generateReportId() {
//Create a Date object representing the current date and time
  const date = new Date();
//Get the full year from the date
  const year = date.getFullYear();    //2026
  // Get the month (0–11), add 1 to make it human-readable (1–12),
  // convert it to a string, and ensure it is always two digits
  const month = String(date.getMonth() + 1).padStart(2,"0");
  // Get the day of the month (1–31),
  // convert it to a string, and ensure it is always two digits
 const day = String(date.getDate()).padStart(2,"0");

   // Generate a random number between 0 and 1,
  // convert it to a base-36 string (letters + numbers)
 const randomPart = Math.random()
 .toString(36) // Convert number to alphanumeric string (0-9)and (a-z) =36
 .slice(2,7)    
 .toUpperCase();

//e.g
//Math.random()       0.8392012
//.toString(36)       0.q9k3p2x (makes it numbers and letters)
//.slice(2, 7)        q9k3p (start at index 2 and stop at index 7)
//.toUpperCase()      Q9K3P
 

  // Combine all parts into a single report ID string and return it
  //       FIX-YYYYMMDD-ABCDE
  return `FIX-${year}${month}${day}-${randomPart}`;

}




/* ================= Submit Report ================= */
const submitBtn = document.querySelector("#submit-report");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    console.log("✅ submit clicked on page7");

    // Get the saved draft report
    const draftReport = getReport();

    // Create a final submitted report
    const submittedReport = {
      ...draftReport,
      reportId: generateReportId(),
      submittedAt: new Date().toISOString(),
      status: "Received"
    };

    console.log("✅ submittedReport object:", submittedReport);

    // SAVE to localStorage
    localStorage.setItem(
      "fixit:lastSubmittedReport",
      JSON.stringify(submittedReport)
    );

    // 🔴 ADD THE LOG *RIGHT HERE*
    console.log(
      "✅ saved lastSubmittedReport:",
      localStorage.getItem("fixit:lastSubmittedReport")
    );

    // Navigate away AFTER saving + logging
    window.location.href = "page8.html";

  })
}