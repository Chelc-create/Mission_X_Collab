
/* ================= Report Number + Copy Feedback  ================= */
const reportIdEl = document.querySelector("#report-id");
const copyBtn = document.querySelector("#copy-report-id");
const copyFeedback = document.querySelector("copy-feedback");

// ---------- 1) Display the report ID ----------

if (reportIdEl) { 
  // Read the submitted report from localStorage
  const raw = localStorage.getItem("fixit:lastSubmittedReport");

  // Convert string back into object (if it exists)   ? =if/else
  //If raw exists, use JSON.parse(raw), otherwise use null.
  //                condition ?   valueIfTrue   : valueIfFalse
  const submittedReport = raw ? JSON.parse(raw) : null;

  // Display report ID or fallback message
  if (!submittedReport || !submittedReport.reportId) {
    reportIdEl.textContent = "(not found)";
  } else {
    reportIdEl.textContent = submittedReport.reportId;
  }
}

// ---------- CLIPBOARD API ----------

if (reportIdEl && copyBtn) { // only run if both the ID and button exist

  //aysnc = allows the function to pause
  copyBtn.addEventListener("click", async() => {

    //Get the ID text currently displayed on the page
    const idToCopy = reportIdEl.textContent.trim();

  
    if ( !idToCopy || idToCopy === "—" || idToCopy === "(not found)" ) {
      if (copyFeedback) copyFeedback.textContent = "No report ID to copy.";
      return; 
    }

    try {
     
      await navigator.clipboard.writeText(idToCopy);

      copyBtn.textContent = "Copied!"
      if (copyFeedback) copyFeedback.textContent = "Copied to Clipboard";

     
      setTimeout(()=> {
        copyBtn.textContent = "Copy report ID";
      }, 1200);
    } catch (err) {

      if (copyFeedback) copyFeedback.textContent = "Copy failed. Copy manually."
    }
  });
}








