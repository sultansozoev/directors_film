import { apiUrl } from '/api/config.js';
document.addEventListener('DOMContentLoaded', function() {
  const moviesContainer = document.getElementById('movies-container');
  const url = `${apiUrl}/getDirectors`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const directors = data.directors;

      // Clear existing content in moviesContainer
      moviesContainer.innerHTML = '';
      // Loop through directors and create movie cards
      directors.forEach(director => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.href = `films.html?directorId=${director.id_director}`;

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header', 'movie-image');
        movieHeader.style.backgroundImage = `url('${director.url_image}')`;

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieContentHeader = document.createElement('div');
        movieContentHeader.classList.add('movie-content-header');

        const movieTitle = document.createElement('h3');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = `${director.first_name} ${director.last_name}`; // Replace with actual data

        movieContentHeader.appendChild(movieTitle);
        movieContent.appendChild(movieContentHeader)

        movieLink.appendChild(movieHeader);
        movieLink.appendChild(movieContent);
        movieCard.appendChild(movieLink);

        moviesContainer.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
});
