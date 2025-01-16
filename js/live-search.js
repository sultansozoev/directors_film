import { apiUrl } from '../api/config.js';
import { searchTitle } from './mainFunctions.js';

const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
const container1 = document.getElementById("container1");
const all = document.getElementById("all");
const ditendenza = document.getElementById("ditendenza");
const end = document.getElementById("end");

results_container.innerText = "";

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    all.style.visibility = "visible";
    ditendenza.style.visibility = "visible";
    container1.style.visibility = "visible";
    return;
  }
  end.scrollIntoView({ behavior: "smooth" });
  const url = `${apiUrl}/search?title=` + searchValue;
  const urlPlayer = `new-player.html?film=`;
  all.style.visibility = "hidden";
  ditendenza.style.visibility = "hidden";
  container1.style.visibility = "hidden";
  searchTitle(url, results_container, urlPlayer,'movie_id');
});
