function addRequest(name, title, request_idm, type, user_id) {
  const url = `https://surio.ddns.net/addList`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id, request_idm, type, title, name})
  }).then(response => response.json())
    .then(data => {
      const modal = document.getElementById("modal");
      if (title) modal.innerHTML = title;
      else modal.innerHTML = name
      console.log(data);
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
      window.location.reload();
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
