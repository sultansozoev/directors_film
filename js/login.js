import { apiUrl } from '/api/config.js';

const form = document.querySelector('form');
const username = document.getElementById('floatingInput');
const password = document.getElementById('floatingPassword');
const url = `${apiUrl}/login`;
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue !== '' && passwordValue !== '') {
    login(usernameValue, passwordValue);
  }
});

function login(username, password) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    withCredentials: true,
    body: JSON.stringify({username: username, password: password})
  }).then(response => response.json())
    .then(data => {
      if ('username' in data) {
        document.cookie="session=" + data.username;
        window.location.href = "index.html";
      } else {
        console.log("error")
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
