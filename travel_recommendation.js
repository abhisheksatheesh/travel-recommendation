// Function to handle search
async function search() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();
  const resultsContainer = document.getElementById("resultsContainer");
  const body = document.body;

  resultsContainer.innerHTML = ""; // Clear previous results

  if (searchTerm.trim() === "") {
    // If search term is empty, revert to hero section and hide results
    body.classList.remove("show-results");
    return;
  }

  try {
    const response = await fetch("travel_recommendation_api.json");
    const data = await response.json();

    let filteredResults = [];

    // Filter Countries and their cities
    if (data.countries) {
      data.countries.forEach((country) => {
        const countryNameMatch = country.name.toLowerCase().includes(searchTerm);
        if (countryNameMatch) {
          // If country name matches, add all its cities
          country.cities.forEach((city) => {
            filteredResults.push({
              name: city.name,
              imageUrl: city.imageUrl,
              description: city.description,
            });
          });
        } else {
          // Check if any city within the country matches
          country.cities.forEach((city) => {
            const cityNameMatch = city.name.toLowerCase().includes(searchTerm);
            const cityDescriptionMatch = city.description.toLowerCase().includes(searchTerm);
            if (cityNameMatch || cityDescriptionMatch) {
              filteredResults.push({
                name: city.name,
                imageUrl: city.imageUrl,
                description: city.description,
              });
            }
          });
        }
      });
    }

    // Filter Temples
    if (data.temples) {
      data.temples.forEach((temple) => {
        const templeNameMatch = temple.name.toLowerCase().includes(searchTerm);
        const templeDescriptionMatch = temple.description.toLowerCase().includes(searchTerm);
        if (templeNameMatch || templeDescriptionMatch) {
          filteredResults.push({
            name: temple.name,
            imageUrl: temple.imageUrl,
            description: temple.description,
          });
        }
      });
    }

    // Filter Beaches
    if (data.beaches) {
      data.beaches.forEach((beach) => {
        const beachNameMatch = beach.name.toLowerCase().includes(searchTerm);
        const beachDescriptionMatch = beach.description.toLowerCase().includes(searchTerm);
        if (beachNameMatch || beachDescriptionMatch) {
          filteredResults.push({
            name: beach.name,
            imageUrl: beach.imageUrl,
            description: beach.description,
          });
        }
      });
    }

    if (filteredResults.length > 0) {
      filteredResults.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("result-card");
        card.innerHTML = `
              <img src="${item.imageUrl}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <button class="visit-button" onclick="visitDestination('${item.name}')">Visit</button>
            `;
        resultsContainer.appendChild(card);
      });
      body.classList.add("show-results"); // Show results and adjust layout
    } else {
      resultsContainer.innerHTML = "<p class='no-results'>No recommendations found for your search.</p>";
      body.classList.add("show-results"); // Still show the results container, but with no results message
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    resultsContainer.innerHTML = "<p class='no-results'>Error loading recommendations.</p>";
    body.classList.add("show-results");
  }
}

// Function to handle the "Visit" button click
function visitDestination(destinationName) {
  alert("Visiting " + destinationName + "! (This would navigate to a detailed page)");
  // In a real application, you would redirect the user:
  // window.location.href = `details.html?destination=${encodeURIComponent(destinationName)}`;
}

// Function to clear search input
function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";
  document.getElementById("resultsContainer").innerHTML = ""; // Clear results
  document.body.classList.remove("show-results"); // Hide results and revert to hero
  console.log("Search input cleared and results hidden.");
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar .links a");

  navLinks.forEach((link) => {
    if (link.href.includes(currentPath.split("/").pop())) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
