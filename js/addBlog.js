const user_id = getCookie("user");
import { apiUrl } from '../api/config.js';

const form = document.getElementById("blog_form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById("exampleFormControlInput1").value;
  const description = document.getElementById("exampleFormControlTextarea1").value;
  console.log(title, description);
  if (!title || !description) {
    alert("Compila tutti i campi");
    return;
  }

  const response = await fetch(`${apiUrl}/addBlog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description, user_id }),
  });

  if (response.ok) {
    window.location.href = "news.html"
  } else {
    alert("Errore nella creazione del blog");
  }
});
