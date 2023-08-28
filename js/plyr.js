import { apiUrl } from '/api/config.js';

document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const film = queryParams.get('film');
    const url = `${apiUrl}/video?film=${encodeURIComponent(film)}`;

    const videoPlayer = document.getElementById('player');
    const sourceElement = videoPlayer.querySelectorAll('source')[0];

    const player = new Plyr('video', { captions: { active: true } });
    window.player = player;

    fetch(url)
        .then(response => response.url)  // Get the URL directly
        .then(videoUrl => {
            sourceElement.src = videoUrl;
            videoPlayer.load();  // Load the video
        });
});
