import { apiUrl } from '../api/config.js';
import {searchTitleAll} from './mainFunctions.js';

const searchBar = document.querySelector("[data-search]");
const results_container = document.getElementById("results-container");
const all = document.getElementById("all");
const ditendenza = document.getElementById("ditendenza");
const continueContainer = document.getElementById("continue");
const header = document.getElementById("header");
const banner = document.getElementById("banner");
const listContainer = document.getElementById("listContainer");
const addedRecently = document.getElementById("added_recently");
const voted = document.getElementById("voted");
results_container.innerText = "";

searchBar.addEventListener("input", async (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') {
    all.style.display = "block";
    voted.style.display = "block";
    ditendenza.style.display = "block";
    banner.style.display = "block";
    listContainer.style.display = "block";
    addedRecently.style.display = "block";
    return;
  }
  header.scrollIntoView({behavior: "smooth"});
  const url = `${apiUrl}/searchAll?title=` + searchValue;

  all.style.display = "none";
  ditendenza.style.display = "none";
  voted.style.display = "none";
  listContainer.style.display = "none";
  continueContainer.style.display = "none";
  banner.style.display = "none";
  addedRecently.style.display = "none";
  searchTitleAll(url, results_container);
});
