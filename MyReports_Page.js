const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");

searchInput.addEventListener("input", function () {
  // Show the 'X' only if there is text in the box
  clearBtn.style.opacity = this.value.length > 0 ? "1" : "0";
});

clearBtn.addEventListener("click", function () {
  searchInput.value = ""; // Clear the text
  this.style.opacity = "0"; // Hide the button
  searchInput.focus(); // Put the cursor back in the box
});
