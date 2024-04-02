const user_id = getCookie("user");
fetch(`https://surio.ddns.net/isAdmin`, {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({user_id})
})
  .then(response => response.json())
  .then(data => {
    const addFilm = document.getElementById('addFilm');
    const addSerie = document.getElementById('addSerie');
    console.log(data)
    if (data <= 0) {
      addFilm.style.display = 'none';
      addSerie.style.display = 'none';
    }
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });
