import { apiUrl } from '../api/config.js';

const form = document.querySelector('form');
const username = document.getElementById('floatingInput');
const password = document.getElementById('floatingPassword');
const url = `${apiUrl}/login`;
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue !== '' && passwordValue !== '') {
    login(usernameValue, passwordValue);
  }
});
function setCookie(name,value,days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function login(username, password) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: username, password: password})
  }).then(response => response.json())
    .then(data => {
      if (data.message === 'Successfully logged-in!') {
        console.log(data)
        setCookie("jwt", data.token, 30);
        setCookie("user", data.user_id, 30)
        window.location.href = "./";
      } else {
        const errorSpan = document.getElementById('error');
        errorSpan.innerHTML = "Username o Password errati!";
      }
    })
    .catch(error => {
      const errorSpan = document.getElementById('error');
      errorSpan.innerHTML = "Username o Password errati!";
    });
}
