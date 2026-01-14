// PASSWORD EYE TOGGLE
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#loginPassword");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute
  const isPassword = password.getAttribute("type") === "password";
  password.setAttribute("type", isPassword ? "text" : "password");

  // Toggle the eye-slash / eye icon
  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});

// EXIT BUTTON NAV
document.getElementById("navExit").onclick = function () {
  location.href = "1.Landing_Page.html";
};

// LOGIN & REGISTER TOGGLE
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const submitBtn = document.getElementById("mainSubmitBtn");

// Set Login as active by default
loginTab.classList.add("active-tab");

registerTab.addEventListener("click", () => {
  // Switch Sections
  loginSection.classList.add("d-none");
  registerSection.classList.remove("d-none");

  // Switch Tab Styling
  registerTab.classList.add("active-tab");
  loginTab.classList.remove("active-tab");

  // Resetting form data & errors when switching tabs
  signUpForm.reset();
  signUpForm.classList.remove("was-validated");
});

loginTab.addEventListener("click", () => {
  // Switch Sections
  registerSection.classList.add("d-none");
  loginSection.classList.remove("d-none");

  // Switch Tab Styling
  loginTab.classList.add("active-tab");
  registerTab.classList.remove("active-tab");

  // Resetting form data & errors when switching tabs
  signUpForm.reset();
  signUpForm.classList.remove("was-validated");
});

// VALID & INVALID INPUT
// Getting references to the specific inputs
const signUpForm = document.getElementById("logInForm");
const passwordInput = document.getElementById("signUpPassword");
const confirmInput = document.getElementById("signUpConfirm");

// Form Submission Logic
signUpForm.addEventListener("submit", (e) => {
  // Only run this logic if the Register section is currently visible
  if (
    !document.getElementById("registerSection").classList.contains("d-none")
  ) {
    const passwordValue = passwordInput.value;
    const confirmValue = confirmInput.value;

    // Password matching logic
    if (passwordValue !== confirmValue) {
      confirmInput.setCustomValidity("Passwords do not match");
    } else {
      confirmInput.setCustomValidity("");
    }

    // Bootstrap Validation Check
    if (!signUpForm.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }

    signUpForm.classList.add("was-validated");
  }
});

// Real-time feedback as the user types
confirmInput.addEventListener("input", () => {
  if (passwordInput.value !== confirmInput.value) {
    confirmInput.setCustomValidity("Passwords do not match");
  } else {
    confirmInput.setCustomValidity("");
  }
});
