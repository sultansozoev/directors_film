let token = getCookie("jwt");
if (!token) {
  window.location.href = "login.html";
}

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
  fetch('https://api.themoviedb.org/3/search/multi?query=' + searchValue + '&include_adult=false&language=it-IT&page=1', options)
    .then(response => response.json())
    .then(data => {
      const films = data.results;

      results_container.innerHTML = '';

      films.forEach(movie => {
        if ('poster_path' in movie && movie.poster_path != null) {
          let t = movie.media_type === 'tv' ? movie.name : movie.title;
          let d = movie.media_type === 'tv' ? movie.first_air_date : movie.release_date;
          const date = new Date(d);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const movieLink = document.createElement('a');
          movieLink.setAttribute('href', `javascript:void(0)`);
          movieLink.setAttribute('onclick', `addRequest(${JSON.stringify(t)}, ${year}, '${movie.poster_path}',
           '${movie.vote_average}', '${movie.id}', '${movie.media_type}', '${getCookie('user')}')`);

          const cardDiv = document.createElement('div');
          cardDiv.classList.add('movie-card');
          cardDiv.classList.add('card');
          cardDiv.setAttribute('data-bs-toggle', 'modal');
          cardDiv.setAttribute('data-bs-target', '#staticBackdrop');

          const movieHeader = document.createElement('div');
          movieHeader.classList.add('movie-header');
          movieHeader.style.background = `url("https://image.tmdb.org/t/p/original/${movie.poster_path}") no-repeat center center`;
          movieHeader.style.backgroundSize = 'cover';
          const movieContent = document.createElement('div');
          movieContent.classList.add('movie-content');
          const movieContentHeader = document.createElement('div');
          movieContentHeader.classList.add('movie-content-header');
          const title = document.createElement('h3');
          title.innerHTML = t;

          const voteSpan = document.createElement('span');
          voteSpan.classList.add('movie-vote');
          voteSpan.innerHTML = `⭐${movie.vote_average.toFixed(1)}`;
          voteSpan.style.marginLeft = '10px';
          if (movie.vote_average.toFixed(1) >= 6 && movie.vote_average.toFixed(1) <= 7.5)
            voteSpan.style.color = '#ffda00';
          else if (movie.vote_average.toFixed(1) > 7.5)
            voteSpan.style.color = '#41ff00';
          else voteSpan.style.color = '#ff0000';
          const titleContainer = document.createElement('div');
          titleContainer.style.display = 'flex';
          titleContainer.style.alignItems = 'center';
          titleContainer.appendChild(title);
          titleContainer.appendChild(voteSpan);
          movieContentHeader.appendChild(titleContainer);

          const movieInfo = document.createElement('div');
          movieInfo.classList.add('movie-info');

          const infoSection = document.createElement('div');
          infoSection.classList.add('info-section');
          const labelDate = document.createElement('label');
          labelDate.innerHTML = "Data di uscita";
          const spanDate = document.createElement('span');
          spanDate.innerHTML = `${day}/${month}/${year}`;
          infoSection.appendChild(labelDate);
          infoSection.appendChild(spanDate);

          const infoSectionType = document.createElement('div');
          infoSectionType.classList.add('info-section');
          const labelType = document.createElement('label');
          labelType.innerHTML = "Tipo";
          const spanType = document.createElement('span');
          spanType.innerHTML = movie.media_type === 'tv' ? "Serie TV" : "Film";
          infoSectionType.appendChild(labelType);
          infoSectionType.appendChild(spanType);

          const infoSectionId = document.createElement('div');
          infoSectionId.classList.add('info-section');
          const labelId = document.createElement('label');
          labelId.innerHTML = "ID";
          const spanId = document.createElement('span');
          spanId.innerHTML = movie.id;
          infoSectionId.appendChild(labelId);
          infoSectionId.appendChild(spanId);

          movieInfo.appendChild(infoSection);
          movieInfo.appendChild(infoSectionType);
          movieInfo.appendChild(infoSectionId);

          movieContent.appendChild(movieContentHeader);
          movieContent.appendChild(movieInfo);

          movieLink.appendChild(movieHeader);
          movieLink.appendChild(movieContent);
          cardDiv.appendChild(movieLink);
          results_container.appendChild(cardDiv);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
});

