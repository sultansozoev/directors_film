function addRequest(title, year, poster, vote_average, req_id, type, user_id) {
  const url = `https://surio.ddns.net/addList`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id, year, poster, vote_average, req_id: req_id, type, title})
  }).then(response => response.json())
    .then(data => {
      const modal = document.getElementById("modal");
      if (data.code === "ER_DUP_ENTRY") {
        modal.innerText = `${title} è già stato richiesto`;
        modal.style.color = '#ff0000';
      } else if (data === "Record exists") {
        modal.innerHTML = `'${title}' è già presente nel sito`;
      } else {
        console.log(year)
        modal.innerHTML = `'${title}' è stato inserito nella lista delle richieste`;
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function elimina(list_id, user_id, request_id) {
  const url = `https://surio.ddns.net/elimina`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body:  JSON.stringify({
      list_id,
      user_id,
      request_id
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log("deleted list", res);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function eliminaFavourite(movie_id, user_id, type) {
  let url = `https://surio.ddns.net/eliminaFavourite`;
  if (type === "tv") {
    url = `https://surio.ddns.net/eliminaFavouriteTV`;
  }
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body:  JSON.stringify({
      movie_id,
      user_id
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log("deleted list", res);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function deleteContinue(movie_id, user_id, type) {
  let url = `https://surio.ddns.net/deleteContinueList`;
  if (type === "tv") {
    url = `https://surio.ddns.net/deleteContinueListSerie`;
  }
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body:  JSON.stringify({
      movie_id,
      user_id
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log("deleted list", res);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function addMovie(id, genre_ids, title, poster_path, release_date, popularity, backdrop_path) {
  const url = `https://surio.ddns.net/insertFilm`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body:  JSON.stringify({
      id: id, genres: genre_ids, title_movie: title, poster: poster_path, release_date: release_date, popularity: popularity, backdrop_path: backdrop_path
    })
  })
    .then(response => response.json())
    .then(res => {
      const modal = document.getElementById("modal");
      if (res.message === "ok") {
        modal.innerHTML = title;
      } else {
        modal.innerHTML = "Il film non è stato inserito correttamente oppure è già presente su Surio";
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function addSerie(id, genre_ids, name, poster_path, first_air_date, popularity, backdrop_path) {
  const url = `https://surio.ddns.net/insertSerieTV`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body:  JSON.stringify({
      id: id, genres: genre_ids, name: name, poster: poster_path, first_air_date: first_air_date, popularity: popularity, backdrop_path: backdrop_path
    })
  })
    .then(response => response.json())
    .then(res => {
      const modal = document.getElementById("modal");
      if (res.message === "ok") {
        modal.innerHTML = name;
      } else {
        modal.innerHTML = "La serie non è stata inserita correttamente oppure è già presente su Surio";
      }
    })
    .catch(error => {
      console.error('Error fetching series:', error);
    });
}
