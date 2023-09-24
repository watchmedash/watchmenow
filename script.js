document.addEventListener('DOMContentLoaded', () => {
  let movieTitles; // Declare movieTitles here

  // Function to load movie data from "home.html"
  function loadMovieData() {
    fetch('home.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        const movieFigures = tempElement.querySelectorAll('figure[data-genre][data-release-year]');
        movieTitles = Array.from(movieFigures).map((figure) => {
          return figure.querySelector("figcaption").textContent;
        });

        // Debugging: Log the loaded movie data
        console.log("Movie Data Loaded:", movieTitles);

        // Perform initial search
        performSearch(movieTitles);
      })
      .catch((error) => {
        console.error('Error loading movie data:', error);
      });
  }

  // Function to perform movie search
  function performSearch(movieTitles) {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
      searchResults.style.display = "none";
    } else {
      const filteredTitles = movieTitles.filter((title) =>
        title.toLowerCase().includes(searchTerm)
      );
      if (filteredTitles.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
      } else {
        displayItemList(filteredTitles, searchResults);
      }
      searchResults.style.display = "block";
    }
  }

  // Function to display filtered movie titles
  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const trimmedItem = item.trim(); // Trim leading and trailing whitespaces
      link.textContent = trimmedItem;
      // Add the appropriate link for the movie here
      link.href = `../movies/${encodeURIComponent(trimmedItem)}.html`;
      li.dataset.tooltip = `../images/${encodeURIComponent(trimmedItem)}.webp`; // Add a data-tooltip attribute to the li
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  // Load movie data when the page loads
  loadMovieData();

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => performSearch(movieTitles));
  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});


// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

// Check if user has already consented to cookies
if (getCookie("cookieConsent") === "true") {
    // User has consented. Hide the banner.
    document.getElementById('cookieConsentBanner').style.display = 'none';
} else {
    // User has not consented. Show the banner.
    document.getElementById('cookieConsentBanner').style.display = 'block';
}

// When user clicks "Accept", set a cookie to remember the consent
document.getElementById('acceptCookiesButton').addEventListener('click', function() {
    setCookie("cookieConsent", "true", 365);  // Set cookie for 1 year
    document.getElementById('cookieConsentBanner').style.display = 'none';  // Hide the banner
});
