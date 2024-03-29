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
    credentials: 'include',
    body: JSON.stringify({username: username, password: password})
  }).then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful!') {
        // Redirect to home page
        window.location.href = "../index.html";

        // Optionally, access session information from cookies for further use
        // (consider security implications for sensitive data)
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
        if (sessionCookie) {
          console.log(sessionCookie)
        }
      } else {
        // Handle login error
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
