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

   // Update the href attributes of movie links
   const movieLinks = tempElement.querySelectorAll('.movie-link');
   movieLinks.forEach(link => {
      const originalHref = link.getAttribute('href');
      const updatedHref = originalHref.replace('movies/', '');
      link.setAttribute('href', updatedHref);
   });

   // Find all movie figures
   const movieFigures = tempElement.querySelectorAll('.gallery figure');

   // Randomly shuffle the related movies array
   const relatedMovies = Array.from(movieFigures).sort(() => Math.random() - 0.5);

   // Display the first 5 related movies in the gallery
   const relatedMoviesGallery = document.querySelector('.related-movies-gallery');
   relatedMovies.slice(0, 5).forEach(figure => {
      const clonedFigure = figure.cloneNode(true);
      relatedMoviesGallery.appendChild(clonedFigure);
   });
});
