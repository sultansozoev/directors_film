import { apiUrl } from '../api/config.js';
import { searchTitle } from './mainFunctions.js';

const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
const container1 = document.getElementById("container1");
const all = document.getElementById("all");
const ditendenza = document.getElementById("ditendenza");
const continueContainer = document.getElementById("continue");
const header = document.getElementById("header");
const banner = document.getElementById("banner");
results_container.innerText = "";

searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    all.style.display = "block";
    ditendenza.style.display = "block";
    container1.style.display = "";
    banner.style.display = "block";
    return;
  }
  header.scrollIntoView({ behavior: "smooth" });
  const url = `${apiUrl}/search?title=` + searchValue;
  const urlPlayer = `new-player.html?film=`;
  all.style.display = "none";
  ditendenza.style.display = "none";
  container1.style.display = "none";
  continueContainer.style.display = "none";
  banner.style.display = "none";
  searchTitle(url, results_container, urlPlayer,'movie_id');
});
