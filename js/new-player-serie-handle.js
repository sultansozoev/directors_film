import { apiUrl } from '../api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const serieId = queryParams.get('serie');
const player = document.getElementById('player');
const title = document.getElementById('title');
const episodesButton = document.querySelector(".episodes");
const episodesModal = document.getElementById("episodesModal");
const closeModalButton = document.getElementById("closeModal");
const episodesList = document.getElementById("episodesList");
const subtitle = document.getElementById('subtitle');
const subtitleBaseUrl = `${apiUrl}/subtitleSerieTV`;
let currentSeason = null;
let currentEpisode = null;
let currentEpisodeIndex = 0;
let previousButton = document.querySelector(".previous");
let nextButton = document.querySelector(".next");
let episodes = [];

let token = getCookie("jwt");
if (!token) {
  window.location.href = "login.html";
}

const loadEpisodes = async (seasonId) => {
  try {
    const response = await fetch(`${apiUrl}/getEpisodes?id=${seasonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const episodes = await response.json();
    populateEpisodes(episodes, seasonId);
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
};
const fetchSeriesData = async () => {
  try {
    const response = await fetch(`${apiUrl}/serie_tv?id=${serieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const serie = data.results[0];
    title.textContent = serie.title;
  } catch (error) {
    console.error("Error fetching series data:", error);
  }
};

const fetchSeasonsAndEpisodes = async () => {
  try {
    const response = await fetch(`${apiUrl}/getSeasons?id=${serieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const seasons = await response.json();

    populateSeasons(seasons);
    if (!Array.isArray(seasons) || seasons.length === 0) {
      console.error("Nessuna stagione trovata.");
      return;
    }

    episodes = [];
    for (const season of seasons) {
      const episodesResponse = await fetch(`${apiUrl}/getEpisodes?id=${season.season_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const episodesData = await episodesResponse.json();

      if (Array.isArray(episodesData)) {
        episodes.push(...episodesData);
      }
    }

  } catch (error) {
    console.error("Errore durante il recupero di stagioni ed episodi:", error);
  }
};


const populateSeasons = (seasons) => {
  episodesList.innerHTML = "";
  seasons.forEach((season) => {
    const seasonElement = document.createElement("div");
    seasonElement.classList.add("episode");
    const urlEpisode = "https://image.tmdb.org/t/p/original" + season.background_image;
    seasonElement.innerHTML = `
      <img src="${season.background_image ? urlEpisode : '../img/default_thumbnail.png'}" alt="">
      <h6>${season.season_name} - Episodi: ${season.episode_count}</h6>
    `;
    seasonElement.addEventListener("click", () => loadEpisodes(season.season_id));
    episodesList.appendChild(seasonElement);
  });
};

const updatePlayerWithEpisode = (episode) => {
  if (!episode) return;

  currentEpisode = episode.episode_id;
  const seasonName = `Season ${episode.season_number}`;

  playEpisode(currentSeason, currentEpisode, seasonName, episode.title, episode.episode_number);
  updateDetails(episode.title, seasonName, episode.episode_number);
  setActiveEpisodeById(currentEpisode);
};

const getPlayerState = async () => {
  try {
    const response = await fetch(`${apiUrl}/getPlayerTimeSerie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: getCookie("user"), serie_tv_id: serieId }),
    });

    const data = await response.json();
    console.log(data);

    if (data.length > 0) {
      const savedEpisodeId = data[0].episode_id;
      await fetchSeasonsAndEpisodes();

      if (episodes.length === 0) {
        console.error("La lista degli episodi è vuota dopo fetchSeasonsAndEpisodes.");
        return;
      }

      currentEpisodeIndex = episodes.findIndex((ep) => ep.episode_id === savedEpisodeId);

      if (currentEpisodeIndex >= 0) {
        const savedEpisode = episodes[currentEpisodeIndex];
        playEpisode(
          savedEpisode.season_id,
          savedEpisode.episode_id,
          `Season ${savedEpisode.season_number}`,
          savedEpisode.title,
          savedEpisode.episode_number
        );
        player.currentTime = data[0].player_time;
      } else {
        console.log("Episodio salvato non trovato nell'elenco. Caricamento predefinito.");
        loadFirstEpisode();
      }
    } else {
      console.log("Nessuno stato salvato trovato. Caricamento del primo episodio.");
      await fetchSeasonsAndEpisodes();
      loadFirstEpisode();
    }
  } catch (error) {
    console.error("Errore durante il recupero dello stato del player:", error);
  }
};

const updatePlayer = (episode) => {
  if (!episode) return;

  currentEpisode = episode.episode_id;
  currentSeason = episode.season_id;

  playEpisode(
    currentSeason,
    currentEpisode,
    `Season ${episode.season_number}`,
    episode.title,
    episode.episode_number
  );
  updateDetails(episode.title, episode.season_name, episode.episode_number);
};

const updateNavigationState = () => {
  previousButton.disabled = currentEpisodeIndex <= 0;
  nextButton.disabled = currentEpisodeIndex >= episodes.length - 1;
};

function updateDetails(title, seasonName, episodeNumber) {
  const titleEpisode = document.getElementById("episodeTitle");
  titleEpisode.innerText = seasonName + "\n" + episodeNumber + ": " + title;
}

const loadFirstEpisode = () => {
  if (episodes.length > 0) {
    const firstEpisode = episodes[0];
    currentEpisodeIndex = 0;
    currentEpisode = firstEpisode.episode_id;
    currentSeason = firstEpisode.season_id;

    updatePlayer(firstEpisode);
    updateNavigationState();
  } else {
    console.warn("Nessun episodio trovato per il caricamento iniziale.");
  }
};

const populateEpisodes = (episodeList, seasonId) => {
  episodesList.innerHTML = "";
  episodes = episodeList || []; // Assicurati che episodes sia un array
  currentSeason = seasonId;

  if (episodes.length === 0) {
    console.log("Nessun episodio disponibile.");
    return;
  }

  if (currentEpisode) {
    currentEpisodeIndex = episodes.findIndex((ep) => ep.episode_id === currentEpisode);
    console.log("current: " + currentEpisodeIndex)
  } else {
    currentEpisodeIndex = 0; // Predefinito al primo episodio
  }

  episodes.forEach((episode, index) => {
    const episodeElement = document.createElement("div");
    episodeElement.classList.add("episode");
    episodeElement.dataset.episodeId = episode.episode_id;

    const urlEpisode = "https://image.tmdb.org/t/p/original" + episode.background_image;
    episodeElement.innerHTML = `
      <img src="${episode.background_image ? urlEpisode : '../img/default_thumbnail.png'}" alt="">
      <h6>${episode.episode_number} - ${episode.title}</h6>
    `;

    episodeElement.addEventListener("click", () => {
      currentEpisodeIndex = index; // Aggiorna l'indice corrente
      updatePlayerWithEpisode(episode);
      episodesModal.style.display = "none";
    });

    episodesList.appendChild(episodeElement);
  });
};

const setActiveEpisodeById = (episodeId) => {
  const allEpisodes = episodesList.querySelectorAll(".episode");
  allEpisodes.forEach((ep) => {
    ep.classList.toggle("active", ep.dataset.episodeId === episodeId);
  });
};

previousButton.addEventListener("click", () => {
  if (currentEpisodeIndex > 0) {
    currentEpisodeIndex--;
    const previousEpisode = episodes[currentEpisodeIndex];
    updatePlayerWithEpisode(previousEpisode);
  } else {
    console.log("Sei già al primo episodio.");
  }
});

nextButton.addEventListener("click", () => {
  console.log(episodes.length)
  console.log(currentEpisodeIndex)
  if (currentEpisodeIndex < episodes.length - 1) {
    currentEpisodeIndex++;
    const nextEpisode = episodes[currentEpisodeIndex];
    updatePlayerWithEpisode(nextEpisode);
  } else {
    console.log("Sei già all'ultimo episodio. " + currentEpisodeIndex);
  }
});

const playEpisode = async (currentS, episodeId, seasonName, episodeTitle, episodeNumber) => {
  try {
    const videoResponse = await fetch(`${apiUrl}/stream?title=${episodeId}&tv=true`);
    player.src = videoResponse.url;
    currentSeason = currentS;
    currentEpisode = episodeId;
    updateDetails(episodeTitle, seasonName, episodeNumber);
    player.load();
    playPause();
    const subtitleResponse = await fetch(`${subtitleBaseUrl}?film=${episodeId}`);
    subtitle.src = subtitleResponse.url;
    savePlayerState(episodeId, currentS, player.currentTime);
  } catch (error) {
    console.error("Error playing episode:", error);
  }
};

const savePlayerState = async (episodeId, seasonId, playerTime) => {
  if (!episodeId || !seasonId) return;
  try {
    await fetch(`${apiUrl}/setPlayerTimeSerie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: getCookie("user"),
        serie_tv_id: serieId,
        player_time: playerTime,
        episode_id: episodeId,
        season_id: seasonId,
      }),
    });
  } catch (error) {
    console.error("Error saving player state:", error);
  }
};

episodesButton.addEventListener("click", () => {
  episodesModal.style.display = "block";
  fetchSeasonsAndEpisodes();
});
closeModalButton.addEventListener("click", () => {
  episodesModal.style.display = "none";
});

window.setInterval(() => {
  console.log(currentEpisode + ": " + currentSeason)
  if (currentEpisode && currentSeason) {
    savePlayerState(currentEpisode, currentSeason, player.currentTime);
  }
}, 5000);

fetchSeriesData();
getPlayerState();
