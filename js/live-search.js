import { apiUrl } from '/api/config.js';
import { searchTitle } from './mainFunctions.js';

const banner = document.getElementById('banner');
const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
results_container.innerText = "";

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    banner.style.display = 'block';
    return;
  } else {
    banner.style.display = 'none';
  }
  const url = `${apiUrl}/search?title=` + searchValue;
  const urlPlayer = `player.html?film=`;
  searchTitle(url, results_container, urlPlayer,'movie_id');
});
