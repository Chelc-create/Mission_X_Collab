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
