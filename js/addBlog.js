const user_id = getCookie("user");
import { apiUrl } from '../api/config.js';

const form = document.getElementById("blog_form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById("exampleFormControlInput1").value;
  const description = document.getElementById("exampleFormControlTextarea1").value;

  if (!title || !description) {
    alert("Compila tutti i campi");
    return;
  }
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjhjYmM2YzFhMjQ1ZWU5N2MxNTNjNTVmYWZiN2I2MiIsInN1YiI6IjYwMTFjNWE2NDU4MTk5MDAzYzIxZTQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LNtZ__C8hNms7aOYLF6R44lHIarYsTCrE8eAohKAt8E'
      }
    };
    const movieResponse = await fetch("https://api.themoviedb.org/3/movie/now_playing", options);
    const movieData = await movieResponse.json();

    const movies = movieData.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    let background_image = randomMovie ? randomMovie.poster_path : "";
    background_image = "https://image.tmdb.org/t/p/original/" + background_image;
    const response = await fetch(`${apiUrl}/addBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, background_image, user_id })
    });

    if (response.ok) {
      window.location.href = "news.html"
    } else {
      alert("Errore nella creazione del blog");
    }
  } catch (error) {
    console.error("Errore durante il recupero dei dati del film:", error);
    alert("Errore durante il recupero dei dati del film");
  }
});
