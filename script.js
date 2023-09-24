document.addEventListener('DOMContentLoaded', () => {
  let movieData; // Declare movieData here

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
        movieData = Array.from(movieFigures).map((figure) => {
          const title = figure.querySelector("figcaption").textContent;
          const imageSrc = figure.querySelector("img.defer-image").getAttribute("data-src");
          return { title, imageSrc };
        });

        // Debugging: Log the loaded movie data
        console.log("Movie Data Loaded:", movieData);

        // Perform initial search
        performSearch(movieData);
      })
      .catch((error) => {
        console.error('Error loading movie data:', error);
      });
  }

  // Function to perform movie search
  function performSearch(movieData) {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
      searchResults.style.display = "none";
    } else {
      const filteredMovies = movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      if (filteredMovies.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
      } else {
        displayItemList(filteredMovies, searchResults);
      }
      searchResults.style.display = "block";
    }
  }

  // Function to display filtered movie data
  function displayItemList(items, container, maxItems = 12) {
    const ul = document.createElement("ul");
    let visibleItemCount = maxItems;

    function renderItems(startIndex, endIndex) {
      for (let i = startIndex; i < endIndex; i++) {
        const item = items[i];
        if (!item) break;

        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = item.title;
        // Use the imageSrc property to construct the image URL
        link.href = `../movies/${encodeURIComponent(item.title)}.html`;
        li.dataset.tooltip = item.imageSrc; // Use the imageSrc property for the tooltip
        li.appendChild(link);
        ul.appendChild(li);
      }
    }

    renderItems(0, visibleItemCount);

    // Check if there are more items to show
    if (items.length > visibleItemCount) {
      const seeMoreLink = document.createElement("a");
      seeMoreLink.textContent = "See More";
      seeMoreLink.href = "#"; // You can set the actual link here
      seeMoreLink.addEventListener("click", (event) => {
        event.preventDefault();
        visibleItemCount += maxItems; // Increase the visible item count
        ul.innerHTML = ""; // Clear the current list
        renderItems(0, visibleItemCount); // Display more items
        if (visibleItemCount < items.length) {
          ul.appendChild(seeMoreLink); // Add "See More" link if there are still more items
        }
        addTooltipListeners(); // Add tooltip listeners again after updating the list
      });
      ul.appendChild(seeMoreLink);
    }

    container.innerHTML = ""; // Clear the current container
    container.appendChild(ul);
    addTooltipListeners();
  }


  // Function to add tooltip listeners
  function addTooltipListeners() {
    const listItems = document.querySelectorAll("li[data-tooltip]");
    listItems.forEach((li) => {
      const link = li.querySelector("a");
      const tooltipUrl = li.dataset.tooltip;
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = "Loading...";
      li.addEventListener("mouseenter", () => {
        tooltip.textContent = "Loading...";
        tooltip.style.display = "block";
        const tooltipImage = document.createElement("img");
        tooltipImage.src = tooltipUrl;
        tooltipImage.onload = () => {
          tooltip.textContent = "";
          tooltip.appendChild(tooltipImage);

          // Set the maximum width and height of the image here
          tooltipImage.style.maxWidth = "20%";
          tooltipImage.style.maxHeight = "20%";
        };
      });
      li.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
      li.appendChild(tooltip);
    });
  }


  // Load movie data when the page loads
  loadMovieData();

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => performSearch(movieData));
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
