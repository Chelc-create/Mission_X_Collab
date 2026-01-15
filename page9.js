
/* ================= Active Report Card Content ================= */

const raw = localStorage.getItem("fixit:lastSubmittedReport");

const lastReport = raw ? JSON.parse(raw) : null;

console.log("RAW lastSubmittedReport:", raw);
console.log("PARSED lastReport", lastReport);

const idEl = document.querySelector("#active-report-id");
const categoryEl = document.querySelector("#active-report-category");
const locationEl = document.querySelector("#active-report-location");
const descriptionEl = document.querySelector("#active-report-description");
const dateEl = document.querySelector("#active-report-date");
const statusEl = document.querySelector("#active-report-status");

if ( idEl && categoryEl && locationEl && dateEl && statusEl){
    if (lastReport) {
        idEl.textContent = lastReport.reportId || "-";
        categoryEl.textContent = lastReport.category || "-";
        locationEl.textContent = lastReport.location || "-";
        statusEl.textContent = lastReport.statusId || "Pending";
        descriptionEl.innerHTML = lastReport.description || "-";
    }

    if (lastReport.submittedAt) {
      // Turn the stored timestap back into a usable date object eg 011226
      const d = new Date(lastReport.submittedAt);
      // show a understandable and readable format of the date eg. 01/12/26
      dateEl.textContent = d.toLocaleDateString();
    } else {
      dateEl.textContent = "—";
    }
}