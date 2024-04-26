export function searchTitle(url, results_container) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const films = data.films;

      results_container.innerHTML = '';

      films.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.setAttribute('href', `player.html?film=${movie.movie_id}`);

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header', 'movie-image');
        movieHeader.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${movie.poster}')`;

        movieLink.appendChild(movieHeader);
        movieCard.appendChild(movieLink);

        results_container.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

export function onScroll() {
  const element = document.getElementById('second');
  const video = document.getElementById("banner");
  if (element) {
    const rect = element.getBoundingClientRect();
    const elementIsVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

    if (elementIsVisible && !player.muted) {
      player.volume = 0.1;
    }
  }
  if (video) {
    const rect = video.getBoundingClientRect();
    const elementIsVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

    if (elementIsVisible && !player.muted) {
      player.volume = 0.4;
    }
  }
}

export function scrollWindow() {
  window.addEventListener("scroll", function () {
    let header = document.getElementById("banner");
    let scrollTop = document.documentElement.scrollTop;
    header.style.opacity = `${1 - scrollTop / 1000}`;
  });
}
