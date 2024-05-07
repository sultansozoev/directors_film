import { apiUrl } from '../api/config.js';

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
      data.forEach(request => {
        const tr = document.createElement('tr');
        const title = document.createElement('td');
        title.innerText = request.title;
        const tipo = document.createElement('td');
        tipo.innerText = request.type;
        const user = document.createElement('td');
        user.innerText = request.username;
        const tdb = document.createElement('td');
        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-archive\" viewBox=\"0 0 16 16\">
                            <path d=\"M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5\"/>`;
        button.setAttribute('onclick', `elimina('${request.list_id}', '${request.user_id}', '${request.request_id}')`)
        tdb.appendChild(button);
        tr.appendChild(title);
        tr.appendChild(tipo);
        tr.appendChild(user);
        tr.appendChild(tdb);
        container.appendChild(tr);

      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
const container = document.getElementById('container');
const user_id = getCookie("user")
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
      if (data[0].admin === 1) {
        const url = `${apiUrl}/getAllList`;
        fetchList(url, container, user_id);
      } else {
        const url = `${apiUrl}/getList`;
        fetchList(url, container, user_id);
      }
    }
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });
