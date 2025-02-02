const user_id = getCookie("user");
import { apiUrl } from '../api/config.js';
fetch(`${apiUrl}/isAdmin`, {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({ user_id })
})
  .then(response => response.json())
  .then(data => {
    const addFilm = document.getElementById('addFilm');
    const addSerie = document.getElementById('addSerie');
    const adminText = document.getElementById("admin");
    const username = document.getElementById("offcanvasDarkNavbarLabel");
    const blog = document.getElementById("addBlog");
    if (data[0])
      username.innerHTML = data[0].username;
    if (data <= 0) {
      addFilm.style.display = 'none';
      addSerie.style.display = 'none';
      adminText.style.display = 'none';
      blog.style.display = 'none';
    } else if (data[0].admin === 0) {
      addFilm.style.display = 'none';
      addSerie.style.display = 'none';
      adminText.style.display = 'none';
      blog.style.display = 'none';
    }
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });
