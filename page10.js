console.log("Hello World");
console.log(
  "page10 lastSubmittedReport:",
  localStorage.getItem("fixit:lastSubmittedReport")
);

/* ================= My Reports: Active / Resolved tabs ================= */
const tabContainer = document.querySelector(".active-resolved-tab");
const cards = document.querySelectorAll(".report-card[data-status]");

// Find both tab buttons inside the tab container
const tabs = tabContainer.querySelectorAll("button[data-filter]");
console.log("tabs found:", tabs);

// Print each button's data-filter value
tabs.forEach((tab) => {
  console.log("tab filter value:", tab.dataset.filter);

//Click tab
  tab.addEventListener("click", () => {
    console.log('clicked tab', tab.dataset.filter )

    //remove "is-active" from both buttons at the start
    tabs.forEach((btn) => btn.classList.remove("is-active"));
    //add "is-active" on the tab that is clicked
    tab.classList.add("is-active");

    //Cards
    const filter = tab.dataset.filter;
    console.log(filter);
    

    cards.forEach((card) => {
      //            what this card is       what the user wants to see
      card.hidden = card.dataset.status !== filter;
    })

  })
});

/* ================= Default view on page load ================= */

// Set default filter to "active"
const defaultFilter = "active";

// Hide/show cards based on default filter
cards.forEach((card) => {
  card.hidden = card.dataset.status !== defaultFilter;
});


/* ================= Active Report Card Content ================= */

//1. Grab the raw string from localStorage using the exact key you used when saving
const raw = localStorage.getItem("fixit:lastSubmittedReport");

//2. Turn the string into an object (or null if nothing is saved)
const lastReport = raw ? JSON.parse(raw) : null;

console.log("RAW lastSubmittedReport:", raw);
console.log("PARSED lastReport:", lastReport);

const idEl = document.querySelector("#active-report-id");
const categoryEl = document.querySelector("#active-report-category");
const locationEl = document.querySelector("#active-report-location");
const dateEl = document.querySelector("#active-report-date");
const statusEl = document.querySelector("#active-report-status");

// 4) Only update the card if we actually found the elements
if (idEl && categoryEl && locationEl && dateEl && statusEl) {
  if (lastReport) {
    idEl.textContent = lastReport.reportId || "Report Id: -";
    categoryEl.textContent = lastReport.category || "Category: -";
    locationEl.textContent = lastReport.location || "Location: -";
    statusEl.textContent = lastReport.status || "Pending";

    // Convert submittedAt into a readable date if it exists
    if (lastReport.submittedAt) {
      // Turn the stored timestap back into a usable date object eg 011226
      const d = new Date(lastReport.submittedAt);
      // show a understandable and readable format of the date eg. 01/12/26
      dateEl.textContent = d.toLocaleDateString();
    } else {
      dateEl.textContent = "—";
    }
  }
}