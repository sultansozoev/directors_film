const searchBar = document.querySelector("[data-search]")
const results_container = document.getElementById("results-container");
results_container.innerText = "";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjhjYmM2YzFhMjQ1ZWU5N2MxNTNjNTVmYWZiN2I2MiIsInN1YiI6IjYwMTFjNWE2NDU4MTk5MDAzYzIxZTQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LNtZ__C8hNms7aOYLF6R44lHIarYsTCrE8eAohKAt8E'
  }
};
searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') return;
  fetch('https://api.themoviedb.org/3/search/tv?query=' + searchValue + '&include_adult=false&language=it-IT&page=1', options)
    .then(response => response.json())
    .then(data => {
      const films = data.results;

      results_container.innerHTML = '';

      films.forEach(serie => {
        if ('poster_path' in serie && serie.poster_path != null) {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');

          const movieLink = document.createElement('a');
          movieLink.setAttribute('href', `javascript:void(0)`);
          movieLink.setAttribute('onclick', "addSerie(\"" + serie.id +"\", \""+serie.genre_ids+"\", \""+serie.name+"\", \""+serie.poster_path+"\", \""+serie.first_air_date+"\", \""+serie.popularity+"\", \""+serie.backdrop_path+"\", \""+serie.vote_average+"\")")
          movieCard.setAttribute('data-bs-toggle', 'modal');
          movieCard.setAttribute('data-bs-target', '#staticBackdrop');
          const movieHeader = document.createElement('div');
          movieHeader.classList.add('movie-header', 'movie-image');
          movieHeader.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${serie.poster_path}')`;

          movieLink.appendChild(movieHeader);
          movieCard.appendChild(movieLink);
          results_container.appendChild(movieCard);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
});

