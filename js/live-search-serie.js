import { apiUrl } from '../api/config.js';
import { searchTitle } from './mainFunctions.js';

const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
const scroll = document.getElementById("scroll");
const all = document.getElementById("all");
const second = document.getElementById("second");
results_container.innerText = "";

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    all.style.visibility = "visible";
    second.style.visibility = "visible";
    results_container.style.visibility = "hidden";
    return;
  }
  scroll.scrollIntoView({ behavior: "smooth" });
  const url = `${apiUrl}/searchSerie?title=` + searchValue;
  const urlPlayer = `player_serie.html?serie=`;
  all.style.visibility = "hidden";
  second.style.visibility = "hidden";
  results_container.style.visibility = "visible";
  searchTitle(url, results_container, urlPlayer, 'serie_tv_id');
});
