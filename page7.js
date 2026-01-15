console.log("hello world")


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




/* ================= Upload Photo ================= */
const uploadInput = document.getElementById("photo-upload");
const imageContainer = document.getElementById("image-container");
const uploadCard = document.getElementById("upload-card");

const MAX_PHOTOS = 3;

function getPhotoCount() {
  return imageContainer.querySelectorAll(".photo-card").length;
}
console.log("photo count", getPhotoCount());

function updateUploadCardVisibility() {
  // Check if limit reached:
  const atMax = getPhotoCount() >= MAX_PHOTOS;

  if (atMax) {
    if (uploadCard.parentElement) {
      uploadCard.remove();
    }
  } else {
    if (!imageContainer.contains(uploadCard)) {
      imageContainer.prepend(uploadCard);
    }
  }
}

// 4) Build one photo preview card (image + remove button)
function createPhotoCard(src) {

  const card = document.createElement("div");
  card.className = "image-card photo-card image-preview";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Uploaded Photo";
  img.className = "preview-img";

  // Remove image button
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-image";
  removeBtn.setAttribute("aria-label", "Remove image");
  removeBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;

  // 4) Assemble the card
  card.appendChild(img);
  card.appendChild(removeBtn);

  return card;
}
updateUploadCardVisibility();

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (!file) return;

  if (getPhotoCount() >= MAX_PHOTOS) {
    uploadInput.value = "";
    return;
  }

 
  const imageURL = URL.createObjectURL(file); 
  const newCard = createPhotoCard(imageURL); // Build a new preview card using that URL

  imageContainer.appendChild(newCard); // Add the new photo to the end (upload card stays first)

  updateUploadCardVisibility(); // Hide upload card if we just reached the max
  uploadInput.value = ""; // Reset input so selecting the same file again will still trigger change
});

// 7) Delete handler (event delegation) so it works for dynamically added cards
imageContainer.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".remove-image"); // Works even if user clicks the icon inside the button
  if (!deleteBtn) return; // If click wasn’t on a delete button, ignore

  const card = deleteBtn.closest(".photo-card"); // Find the uploaded photo card that owns this delete button
  if (!card) return;

  const img = card.querySelector("img"); // Grab the image so we can clean up its blob URL
  if (img && img.src && img.src.startsWith("blob:")) {
    // Only revoke URLs we created with createObjectURL
    URL.revokeObjectURL(img.src); // Free memory used by the blob URL
  }

  card.remove(); //Remove the photo card from the DOM
  updateUploadCardVisibility(); // Bring upload card back if we’re now under the max
});




/* ================= Generating Report ID⭐ ================= */ 

// This function creates and returns a unique report ID
function generateReportId() {
//Create a Date object representing the current date and time‼️
  const date = new Date();
//Get the full year from the date
  const year = date.getFullYear();    //2026
  // Get the month (0–11), add 1 to make it human-readable (1–12),
  // convert it to a string, and ensure it is always two digits
  const month = String(date.getMonth() + 1).padStart(2,"0");
  // Get the day of the month (1–31),
  // convert it to a string, and ensure it is always two digits
 const day = String(date.getDate()).padStart(2,"0");

   // Generate a random number between 0 and 1,‼️
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
  return `FIX-${year}${month}${day}-${randomPart}`; //

}




/* ================= Submit Report⭐ ================= */
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
      status: "Pending"
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