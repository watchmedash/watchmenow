document.addEventListener('DOMContentLoaded', function () {
    // Get the poster URL of the current movie
    const currentMoviePoster = document.querySelector('.video-container video').getAttribute('poster');

    // Log the current movie poster URL
    console.log('Current Movie Poster:', currentMoviePoster);

    // Find the figure element in the gallery that matches the current movie's poster
    const matchingFigure = Array.from(document.querySelectorAll('.gallery figure')).find(figure => {
        const figurePoster = figure.querySelector('img').getAttribute('data-src') || figure.querySelector('img').getAttribute('src');
        console.log('Figure Poster:', figurePoster); // Log the figure poster URL
        return figurePoster === currentMoviePoster;
    });

    if (matchingFigure) {
        // Extract movie details from the matching figure element
        const genreAttribute = matchingFigure.getAttribute('data-genre').split(',');
        const releaseYearAttribute = matchingFigure.getAttribute('data-release-year');
        const movieTitle = matchingFigure.querySelector('figcaption').textContent.trim();
        const isHD = matchingFigure.querySelector('.tag.hd') ? true : false;

        // Rest of your code to extract and display related movies
        const relatedMovies = Array.from(document.querySelectorAll('.gallery figure')).filter(figure => {
            const genreMatches = genreAttribute.some(genre => figure.getAttribute('data-genre').includes(genre));
            const releaseYearMatches = figure.getAttribute('data-release-year') === releaseYearAttribute;

            // Exclude the current movie from related movies
            const isCurrentMovie = figure.querySelector('img').getAttribute('data-src') === currentMoviePoster;

            return genreMatches && releaseYearMatches && !isCurrentMovie;
        });

        // Limit the number of related movies to a maximum of 8
        const maxRelatedMovies = relatedMovies.slice(0, 8);

        // Display related movies on your movie page
        const relatedMoviesContainer = document.getElementById('related-movies');

        maxRelatedMovies.forEach(figure => {
            // Create HTML elements for each related movie and append them to relatedMoviesContainer
            const relatedMovieTitle = figure.querySelector('figcaption').textContent.trim();
            const relatedMovieImage = figure.querySelector('img').getAttribute('data-src');
            const relatedMovieLink = figure.querySelector('a').getAttribute('href');

            // Create a related movie card
            const relatedMovieCard = document.createElement('div');
            relatedMovieCard.className = 'related-movie-card';
            relatedMovieCard.innerHTML = `
                <a href="${relatedMovieLink}">
                    <img src="${relatedMovieImage}" alt="${relatedMovieTitle}" />
                    <p>${relatedMovieTitle}</p>
                </a>
            `;

            relatedMoviesContainer.appendChild(relatedMovieCard);
        });
    } else {
        console.log('Matching poster not found in the gallery.');
    }
});
