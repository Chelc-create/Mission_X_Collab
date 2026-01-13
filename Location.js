// use my current location

document.getElementById("find-me").addEventListener("click", function () {
  const status = document.getElementById("location");
  const inputField = document.getElementById("enterLocation");
  const map = document.getElementById("map-embed");

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Finding Location...";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // 1. Fetch address using OpenStreetMap (Free)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
          const address = data.display_name;

          // 2. Reflect address in the Input field
          inputField.value = address;
          status.textContent = "";

          // 3. Update the Google Map iframe
          // We use encodeURIComponent to make the address URL-safe
          const newMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
            address
          )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
          map.src = newMapUrl;
        } catch (error) {
          status.textContent = "Unable to retrieve your address";
          status.classList.add("error-text"); // triggers the CSS styling
        }
      },
      () => {
        status.textContent = "Unable to retrieve your location";
        status.classList.add("error-text");
      }
    );
  }
});

// autocomplete address

const addressInput = document.getElementById("enterLocation");
const parentContainer = addressInput.parentElement;
const mapEmbed = document.getElementById("map-embed");

// 1. Ensure the parent is relative so the dropdown aligns to the input
parentContainer.style.position = "relative";

// Create a container for suggestions and inject it after the input
const resultsContainer = document.createElement("ul");
resultsContainer.className =
  "list-group position-absolute w-100 shadow-lg mt-1";
resultsContainer.style.zIndex = "1000";
addressInput.parentNode.appendChild(resultsContainer);

addressInput.addEventListener("input", async (e) => {
  const query = e.target.value;
  if (query.length < 3) {
    resultsContainer.innerHTML = "";
    return;
  }

  // Fetch suggestions from Photon (OpenStreetMap based)
  try {
    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
    );
    const data = await response.json();

    resultsContainer.innerHTML = "";

    data.features.forEach((feature) => {
      const { name, street, city, country } = feature.properties;
      const fullAddress = [name, street, city, country]
        .filter(Boolean)
        .join(", ");

      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.style.cursor = "pointer";
      li.textContent = fullAddress;

      li.onclick = () => {
        addressInput.value = fullAddress;
        resultsContainer.innerHTML = "";
        // Update Map
        const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
          fullAddress
        )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        mapEmbed.src = mapUrl;
      };

      resultsContainer.appendChild(li);
    });
  } catch (err) {
    console.error("Autocomplete error:", err);
  }
});

// Close suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (e.target !== addressInput) resultsContainer.innerHTML = "";
});

const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat, lng },
  zoom: 15,
});
new google.maps.Marker({ position: { lat, lng }, map });
