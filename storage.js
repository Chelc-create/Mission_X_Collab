
const REPORT_KEY = "fixit_report";

// Helper function that reads the report from the localStorage
function getReport() {
    // 'try' protects app from crashing if something goes wrong
    try {
        return JSON.parse(localStorage.getItem(REPORT_KEY)) || {};
        // If JSON.parse fails(bad data), execution jumps here.
    } catch{
        // if something went wrong, fail safely
        return{};
    }
}

// Function that updates report
//'patch' = only the fields you want to change (not the whole object)
function setReport(patch) {

    //Reads the current report from localStorage.
    //This ensures we don’t overwrite existing data from other pages.
    const current = getReport();

    //current = Copies everything already saved (location, photos, etc.)
    //patch = Overwrites or adds only the new values from this page
    // updatedAt: Date.now() = Adds a timestamp of the latest save
    const next = { ...current, ...patch, updatedAt: Date.now() };

    //converts the updated report object into a string and saves it back to localStorage
    localStorage.setItem(REPORT_KEY, JSON.stringify(next));

    //returns the updated report object
    return next;
}