
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdownContents = document.querySelectorAll('.dropdown-content');
const galleryContainer = document.getElementById('gallery-container');
const genreButtons = document.querySelectorAll('.genre-button');

let currentPage = 1;
const perPage = 32;
let currentFilter = 'all';
let currentGenreFilter = 'all';

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const thisContent = this.nextElementSibling;
        const wasOpen = thisContent.style.display === 'block';

        dropdownContents.forEach(content => {
            content.style.display = 'none';
        });
        galleryContainer.style.marginTop = '0px';

        if (!wasOpen) {
            thisContent.style.display = 'block';
            const totalHeight = thisContent.offsetHeight + toggle.offsetHeight;
            galleryContainer.style.marginTop = `${totalHeight}px`;
        }
    });
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-container')) {
        dropdownContents.forEach(content => {
            content.style.display = 'none';
        });
        galleryContainer.style.marginTop = '0px';
    }
});

const allMoviesButton = document.querySelector('.all-movies-button');
allMoviesButton.addEventListener('click', function() {
    currentFilter = 'all';
    currentGenreFilter = 'all';
    currentPage = 1;
    refreshGallery();
});

const requestedButton = document.querySelector('.requested-button');
requestedButton.addEventListener('click', function() {
    currentFilter = 'requested';
    currentGenreFilter = 'all';
    currentPage = 1;
    refreshGallery();
});

genreButtons.forEach(button => {
    button.addEventListener('click', function() {
        genreButtons.forEach(innerButton => innerButton.classList.remove('active'));
        button.classList.add('active');
        currentFilter = 'all';
        currentGenreFilter = button.getAttribute('data-genre');
        currentPage = 1;
        refreshGallery();
    });
});

const yearTabs = document.querySelectorAll('.dropdown-container .year-button');
yearTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        yearTabs.forEach(innerTab => innerTab.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-year');
        currentGenreFilter = 'all';
        currentPage = 1;
        refreshGallery();
    });
});

function refreshGallery() {
    const movies = document.querySelectorAll('#gallery-container figure');
    movies.forEach(movie => {
        movie.style.display = 'none';
    });

    let filteredMovies = [...movies];

    if (currentFilter === 'requested') {
        filteredMovies = filteredMovies.filter(movie => movie.getAttribute('data-requested') === 'true');
    } else if (currentFilter !== 'all') {
        filteredMovies = filteredMovies.filter(movie => movie.getAttribute('data-release-year') === currentFilter);
    }

    if (currentGenreFilter !== 'all') {
        filteredMovies = filteredMovies.filter(movie => {
            const genreAttribute = movie.getAttribute('data-genre');
            if (!genreAttribute) return false;
            const genres = genreAttribute.split(',');
            return genres.includes(currentGenreFilter);
        });
    }

    filteredMovies.slice((currentPage - 1) * perPage, currentPage * perPage).forEach(movie => {
        movie.style.display = 'block';
    });

    $('.prev-page').toggle(currentPage > 1);
}

refreshGallery();

$('.prev-page').click(function(e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        refreshGallery();
        history.pushState({ page: currentPage }, "", "?page=" + currentPage);
    }
});

$('.next-page').click(function(e) {
    e.preventDefault();
    currentPage++;

    const totalItems = currentFilter === 'all'
        ? movies.length
        : [...movies].filter(movie => movie.getAttribute('data-release-year') === currentFilter).length;

    const numPages = Math.ceil(totalItems / perPage);

    if (currentPage > numPages) {
        currentPage = 1;
    }

    refreshGallery();
    history.pushState({ page: currentPage }, "", "?page=" + currentPage);
});

window.onpopstate = function(event) {
    if (event.state && event.state.page) {
        currentPage = event.state.page;
        refreshGallery();
    }
};
