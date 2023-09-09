// Function to load content from another HTML page
function loadPage(url, callback) {
   fetch(url)
      .then(response => response.text())
      .then(data => {
         callback(data);
      })
      .catch(error => {
         console.error('Error loading page:', error);
      });
}

// Get the current movie's genre from the other HTML page
loadPage('../home.html', function(data) {
   const tempElement = document.createElement('div');
   tempElement.innerHTML = data;

   // Update the IDs for the current movies
   const currentMovie1 = tempElement.querySelector('#current-movie-1');
   const currentMovie2 = tempElement.querySelector('#current-movie-2');

   // Check if the current movies exist and have genres
   if (currentMovie1 && currentMovie2) {
      const currentGenre1 = currentMovie1.getAttribute('data-genre');
      const currentGenre2 = currentMovie2.getAttribute('data-genre');

      // Update the href attributes of movie links
      const movieLinks = tempElement.querySelectorAll('.movie-link');
      movieLinks.forEach(link => {
         const originalHref = link.getAttribute('href');
         const updatedHref = originalHref.replace('movies/', '');
         link.setAttribute('href', updatedHref);
      });

      // Filter related movies based on the genre of both current movies
      const movieFigures = tempElement.querySelectorAll('.gallery figure');
      const relatedMovies = Array.from(movieFigures).filter(figure => {
         const figureGenre = figure.getAttribute('data-genre');
         return figureGenre && (figureGenre.includes(currentGenre1) || figureGenre.includes(currentGenre2));
      });

      // Display the related movies in the gallery
      const relatedMoviesGallery = document.querySelector('.related-movies-gallery');
      relatedMovies.forEach(figure => {
         const clonedFigure = figure.cloneNode(true);
         relatedMoviesGallery.appendChild(clonedFigure);
      });
   }
});
