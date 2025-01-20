import {apiUrl} from '../api/config.js';

function fetchList(url, container, user_id) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({user_id})
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(list => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('movie-card');
        cardDiv.classList.add('card');

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = `&times`;
        deleteButton.addEventListener('click',  () => {
          cardDiv.remove();
          elimina(list.list_id, list.user_id, list.request_id)
        });

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header');
        movieHeader.style.background = `url("https://image.tmdb.org/t/p/original/${list.poster}") no-repeat center center`;
        movieHeader.style.backgroundSize = 'cover';
        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');
        const movieContentHeader = document.createElement('div');
        movieContentHeader.classList.add('movie-content-header');
        const title = document.createElement('h3');
        title.innerHTML = list.title;

        const voteSpan = document.createElement('span');
        voteSpan.classList.add('movie-vote');
        if (list.vote_average > 0) {
          voteSpan.innerHTML = `⭐${list.vote_average.toFixed(1)}`;
          voteSpan.style.marginLeft = '10px';
          if (list.vote_average.toFixed(1) >= 6 && list.vote_average.toFixed(1) <= 7.5)
            voteSpan.style.color = '#ffda00';
          else if (list.vote_average.toFixed(1) > 7.5)
            voteSpan.style.color = '#41ff00';
          else voteSpan.style.color = '#ff0000';
          const titleContainer = document.createElement('div');
          titleContainer.style.display = 'flex';
          titleContainer.style.alignItems = 'center';
          titleContainer.appendChild(title);
          titleContainer.appendChild(voteSpan);
          movieContentHeader.appendChild(titleContainer);
        }
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        const infoSection = document.createElement('div');
        infoSection.classList.add('info-section');
        const labelDate = document.createElement('label');
        labelDate.innerHTML = "Data di aggiunta";
        const spanDate = document.createElement('span');
        const date = new Date(list.added_date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        spanDate.innerHTML = `${day}/${month}/${year} - ${hours}:${minutes}`;
        infoSection.appendChild(labelDate);
        infoSection.appendChild(spanDate);

        const infoSectionUser = document.createElement('div');
        infoSectionUser.classList.add('info-section');
        const labelUser = document.createElement('label');
        labelUser.innerHTML = "Utente";
        const spanUser = document.createElement('span');
        spanUser.innerHTML = list.username;
        infoSectionUser.appendChild(labelUser);
        infoSectionUser.appendChild(spanUser);

        const infoSectionType = document.createElement('div');
        infoSectionType.classList.add('info-section');
        const labelType = document.createElement('label');
        labelType.innerHTML = "Tipo";
        const spanType = document.createElement('span');
        spanType.innerHTML = list.type === 'tv' ? "Serie TV" : "Film";
        infoSectionType.appendChild(labelType);
        infoSectionType.appendChild(spanType);

        const infoSectionId = document.createElement('div');
        infoSectionId.classList.add('info-section');
        const labelId = document.createElement('label');
        labelId.innerHTML = "ID";
        const spanId = document.createElement('span');
        spanId.innerHTML = list.request_id;
        infoSectionId.appendChild(labelId);
        infoSectionId.appendChild(spanId);

        movieInfo.appendChild(infoSection);
        movieInfo.appendChild(infoSectionUser);
        movieInfo.appendChild(infoSectionType);
        movieInfo.appendChild(infoSectionId);

        movieContent.appendChild(movieContentHeader);
        movieContent.appendChild(movieInfo);

        cardDiv.appendChild(deleteButton);
        cardDiv.appendChild(movieHeader);
        cardDiv.appendChild(movieContent);

        container.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
const container = document.getElementById('container');
const user_id = getCookie("user")
const url = `${apiUrl}/getAllList`;
fetchList(url, container, user_id);

fetch(`${apiUrl}/isAdmin`, {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({user_id})
})
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {

    }
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });
