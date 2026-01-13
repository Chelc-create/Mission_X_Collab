console.log("hello world");

/* ================= References ================= */
const uploadInput = document.getElementById("photo-upload");
const imageContainer = document.getElementById("image-container");
const uploadCard = document.getElementById("upload-card");
const saveDraftButton = document.querySelector(".save-draft-btn");
const savedFeedback = document.querySelector(".saved-feedback");

/* ================= Draft (Page 6) ================= */
const PAGE6_DRAFT_KEY = "fixit_page6_draft";

function showDraftSaved(message = "Draft Saved") {
  if (!savedFeedback) return;

  savedFeedback.textContent = message;
  savedFeedback.classList.add("show");

  setTimeout(() => {
    savedFeedback.classList.remove("show");
  }, 2500);
}

if (saveDraftButton && imageContainer) {
  saveDraftButton.addEventListener("click", () => {
    const photoCount = imageContainer.querySelectorAll(".photo-card").length;

    const draft = {
      photoCount,
      savedAt: Date.now(),
    };

    localStorage.setItem(PAGE6_DRAFT_KEY, JSON.stringify(draft));
    showDraftSaved();
  });
}

(function restorePage6Draft() {
  const saved = localStorage.getItem(PAGE6_DRAFT_KEY);
  if (!saved) return;

  const draft = JSON.parse(saved);

  if (typeof draft.photoCount === "number") {
    showDraftSaved(
      `Draft restored — ${draft.photoCount} photo${
        draft.photoCount === 1 ? "" : "s"
      } were attached last time.`
    );
  }
})();

/* ================= Upload Photo ================= */
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



/* ================= Take Photo ================= */
const takePhotoBtn = document.getElementById("take-photo-btn");
const cameraSection = document.getElementById("camera-section");
const videoEl = document.getElementById("camera-preview");
const statusEl = document.getElementById("camera-status");

let stream = null;

async function startCameraPreview() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (statusEl) statusEl.textContentContent = "Camera not supported in this browser.";
    if (cameraSection) cameraSection.hidden = false;
    return;
  }
try{
  if (statusEl) statusEl.textContent = "Requesting camera permission...";

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment"},
    audio: false,
  });

if (videoEl) videoEl.srcObject = stream;
    if (cameraSection) cameraSection.hidden = false;
    if (statusEl) statusEl.textContent = "Camera connected.";
  } catch (err) {
    if (statusEl) statusEl.textContent = `Camera unavailable: ${err.name}`;
    if (cameraSection) cameraSection.hidden = false;
    console.error(err);
  }
}

if (takePhotoBtn) {
  takePhotoBtn.addEventListener("click", startCameraPreview);
}



/* ================= Tip Toggle ================= */
const tip = document.querySelector(".tip");
const tipButton = document.querySelector(".tip-button");

if (tip && tipButton) {
  tipButton.addEventListener("click", () => {
    const isOpen = tipButton.getAttribute("aria-expanded") === "true";
    tipButton.setAttribute("aria-expanded", String(!isOpen));
    tip.classList.toggle("open");
  });
}



