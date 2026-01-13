console.log("hello world");
/* ================= Search Input ================= */

const dropdown = document.querySelector('.category-dropdown');
const issueInput = document.querySelector('#issue');
const issueArrow = document.querySelector('.combo-arrow');
const issueMenu = document.querySelector('.combo-menu');

if (dropdown && issueInput && issueArrow && issueMenu) {
  const issueOptions = issueMenu.querySelectorAll('li');

  function openMenu() {
    issueMenu.hidden = false;
    issueInput.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    issueMenu.hidden = true;
    issueInput.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (issueMenu.hidden) openMenu();
    else closeMenu();
  }

  issueInput.addEventListener('click', (e) => {
    e.stopPropagation(); 
    openMenu();
  });

  issueArrow.addEventListener('click', (e) => {
    e.stopPropagation(); 
    toggleMenu();
  });


  issueOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation(); // prevents "outside click" logic interfering

      issueInput.value = option.dataset.value || option.textContent.trim();

      closeMenu();
      issueInput.focus();
    });
  });

  document.addEventListener('click', (e) => {
    const clickedInside = e.target.closest('.category-dropdown');
    if (!clickedInside) closeMenu();
  });

  issueInput.addEventListener('input', () => {
    openMenu(); // keep menu visible while typing

    //toLowerCase(); => what the user typed, cleaned up + lowercase so matching is easier
    const query = issueInput.value.trim().toLowerCase(); 

    issueOptions.forEach((option) => {
      const label = (option.dataset.value || option.textContent).trim().toLowerCase(); // the option text, lowercase

      // Hide option ONLY if it does NOT match the typed text
      option.hidden= query.length > 0 && !label.includes(query);
    });
  });

  // Start closed
  closeMenu();
}


/* ================= Save Draft (shared report) ================= */

const issueSelect = document.querySelector('#issue');
const descriptionInput = document.querySelector('#description');
const saveDraftButton = document.querySelector('.save-draft-btn');
const savedFeedback = document.querySelector('.saved-feedback');


function showDraftSaved() {
  if (!savedFeedback) return;

  savedFeedback.classList.add('show');
  setTimeout(() => {
    savedFeedback.classList.remove('show');
  }, 2000);
}

function saveDraft() {
  if (!issueSelect || !descriptionInput) return;

  setReport({
    category: issueSelect.value,
    description: descriptionInput.value,
  });

  showDraftSaved();
}


/* ================= Autosave ================= */

// Small helper: run a function after the user stops typing for X ms
function debounce(fn, delay= 400) {
  //fn = the function we want to delay (e.g. saveDraft
  //delay = how long to wait after the user stops typing

  let t; // t stores the timer id ... returned by setTimeout
  return (...args) => {
    //(...args) => Accept any number of arguments (changes?) and forward them
    clearTimeout(t);
    //clearTimeout(t)If a timeout was previously scheduled, cancel it
    t = setTimeout(() => fn(...args), delay);
  };
}

const autoSaveDraft = debounce(() => {
  if (!issueSelect || !descriptionInput) return;

  setReport({
    category: issueSelect.value,
    description: descriptionInput.value,
  });
}, 400);

if (issueSelect) {
  issueSelect.addEventListener("input", autoSaveDraft);
  issueSelect.addEventListener("change", autoSaveDraft);
}

// Safety net =>just in case user exits out of the tab immediately before autosave is carried out
window.addEventListener("beforeunload", () => {
  if (!issueSelect || !descriptionInput) return;

  setReport({
    category: issueSelect.value,
    description: descriptionInput.value,
  });
});


/* ================= Character Count ================= */
const charCountText = document.querySelector('.char-count');
console.log(charCountText)

const MAX_CHARS = 250;

function updateCharacterCount() {
  // Clamp- Cuts off any extra characters:
  if (descriptionInput.value.length > MAX_CHARS){
    descriptionInput.value = descriptionInput.value.slice(0, MAX_CHARS);
  }

  const currentLength = descriptionInput.value.length;
  const remaining = MAX_CHARS - currentLength;

  charCountText.textContent = `${remaining} characters remaining` ;

  // Reset states first
  charCountText.classList.remove('is-warning', 'is-danger');

  // Warning State
  if (remaining <= 10){
    charCountText.classList.add('is-danger');
  }
  else if (remaining <= 20) {
    charCountText.classList.add('is-warning');
  }
}


/* ================= Restore Draft ================= */
// Restore page 5 fields from the shared report object on load
function restoreDraft() {
  if (!issueSelect || !descriptionInput) return;

  const report = getReport();

  issueSelect.value = report.category || "";
  descriptionInput.value = report.description || "";

  updateCharacterCount(); //ensures UI matches restored text
}

restoreDraft();

updateCharacterCount();

saveDraftButton.addEventListener('click', saveDraft);

// Update count + autosave on typing
if (descriptionInput) {
  descriptionInput.addEventListener('input',() => {
    updateCharacterCount();
    autoSaveDraft();
  });
}


/* ================= Tip Toggle ================= */
const tip = document.querySelector('.tip');
const tipButton = document.querySelector('.tip-button');

if (tip && tipButton){
  tipButton.addEventListener('click', () => {
    const isOpen = tipButton.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded
    tipButton.setAttribute('aria-expanded', String(!isOpen));

    // Toggle the visual open state
    tip.classList.toggle('open');
  });
}