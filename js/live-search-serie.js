import { apiUrl } from '../api/config.js';
import { searchTitle } from './mainFunctions.js';

const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
const all = document.getElementById("all");
const second = document.getElementById("second");
const banner = document.getElementById("banner");
const header = document.getElementById("header");
const continueContainer = document.getElementById("continue");
results_container.innerText = "";

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    all.style.display = "block";
    second.style.display = "block";
    banner.style.display = "block";
    results_container.style.display = "none";
    return;
  }
  header.scrollIntoView({ behavior: "smooth" });
  const url = `${apiUrl}/searchSerie?title=` + searchValue;
  const urlPlayer = `player_serie.html?serie=`;
  all.style.display = "none";
  second.style.display = "none";
  banner.style.display = "none";
  continueContainer.style.display = "none";
  results_container.style.display = "block";
  searchTitle(url, results_container, urlPlayer, 'serie_tv_id');
});
