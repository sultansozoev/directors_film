import { apiUrl } from '../api/config.js';
import { searchTitle } from './mainFunctions.js';

const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
const container1 = document.getElementById("container1");
const all = document.getElementsByClassName("all");

results_container.innerText = "";

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    all.style.display = "block";
  }
  container1.scrollIntoView({ behavior: "smooth" });
  const url = `${apiUrl}/search?title=` + searchValue;
  const urlPlayer = `new-player.html?film=`;
  searchTitle(url, results_container, urlPlayer,'movie_id');
  all.style.display = "none";
});
