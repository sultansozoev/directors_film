const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const controlsContainer = document.querySelector('.video-container .controls-container');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const backButton = document.querySelector('.back');
const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');
const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');
const captionButton = document.querySelector('.captions');
const playhead = document.querySelector('.playhead');
const subtitle = document.getElementById('subtitle');
const pipButton = document.querySelector('.cast');
const tracks = video.textTracks;
const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
const watching = document.querySelector('.watching');
const timeLeft = document.querySelector('.video-container .progress-controls .time-remaining');

let controlsTimeout;
controlsContainer.style.opacity = '0';
backButton.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';
subtitle.mode = 'showing';

const displayControls = () => {
  controlsContainer.style.opacity = '1';
  backButton.style.opacity = '1';
  document.body.style.cursor = 'initial';
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = '0';
    backButton.style.opacity = '0';
    document.body.style.cursor = 'none';
  }, 2000);
};

const playPause = () => {
  if (video.paused) {
    video.play();
    playButton.style.display = 'none';
    pauseButton.style.display = '';
  } else {
    video.pause();
    playButton.style.display = '';
    pauseButton.style.display = 'none';
  }
};

function back() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    console.log("No previous page to go back to.");
  }
}

let isDragging = false;
let startX = 0;

playhead.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX;
  event.preventDefault(); // Prevent text selection while dragging
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const newX = event.clientX;
    const displacement = newX - startX;
    const newPosition = playhead.offsetLeft + displacement;

    const containerWidth = videoContainer.clientWidth;
    const playheadWidth = playhead.offsetWidth;
    const minX = 0;
    const maxX = containerWidth - playheadWidth;

    let adjustedPosition = Math.min(Math.max(newPosition, minX), maxX);

    playhead.style.left = `${adjustedPosition}px`;

    startX = newX;
  }
});

function enterPiP() {
  if (video.requestPictureInPicture) {
    video.requestPictureInPicture()
      .then(() => {
        console.log("Video entered Picture-in-Picture mode.");
      })
      .catch(error => {
        console.error("Error entering PiP mode:", error);
      });
  } else {
    console.warn("Video element does not support requestPictureInPicture().");
  }
}

function toggleSubtitles() {
  let isAnyShowing = false;
  for (const track of tracks) {
    if (track.kind === 'subtitles' || track.kind === 'captions') {
      track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
      isAnyShowing = isAnyShowing || track.mode === 'showing';
    }
  }
  captionButton.style.opacity = isAnyShowing ? 1 : 0.4;
}

video.addEventListener('dblclick', () => {
  toggleFullScreen();
});

video.addEventListener('click', () => {
  playPause();
});

const toggleMute = () => {
  video.muted = !video.muted;
  if (video.muted) {
    fullVolumeButton.style.display = 'none';
    mutedButton.style.display = '';
  } else {
    fullVolumeButton.style.display = '';
    mutedButton.style.display = 'none';
  }
  displayControls();
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    maximizeButton.style.display = '';
    minimizeButton.style.display = 'none';
  } else {
    maximizeButton.style.display = 'none';
    minimizeButton.style.display = '';
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    console.log("space")
    playPause();
  }

  if (event.code === 'KeyM') {
    toggleMute();
  }

  if (event.code === 'KeyF') {
    toggleFullScreen();
  }
  if (event.code === 'KeyC') {
    toggleSubtitles();
  }

  if (event.code === 'KeyP') {
    enterPiP();
  }

  if (event.code === 'ArrowLeft') {
    rewindButton.click();
  }

  if (event.code === 'ArrowRight') {
    fastForwardButton.click();
  }
  displayControls();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
  }

  displayControls();
});

document.addEventListener('mousemove', () => {
  displayControls();
});

video.addEventListener('timeupdate', () => {
  watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
  const totalSecondsWatched = video.currentTime;

  const time = new Date(null);
  time.setSeconds(totalSecondsWatched);
  let hoursW = null;

  if(totalSecondsWatched >= 3600) {
    hoursW = (time.getHours().toString()).padStart('2', '0');
  }

  let minutesW = (time.getMinutes().toString()).padStart('2', '0');
  let secondsW = (time.getSeconds().toString()).padStart('2', '0');

  watching.textContent = `${hoursW ? hoursW : '00'}:${minutesW}:${secondsW}`;

  let seconds = Math.floor(video.duration - video.currentTime);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  seconds = seconds % 60;
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timeLeft.innerHTML = hours + ':' + minutes + ':' + seconds;
});

video.addEventListener('ended', () => {
  playPauseButton.click();
});

progressBar.addEventListener('click', (event) => {
  const pos = (event.pageX  - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

captionButton.addEventListener('click', toggleSubtitles);

playPauseButton.addEventListener('click', playPause);

rewindButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
  video.currentTime += 10;
});

volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', toggleFullScreen);

pipButton.addEventListener('click', enterPiP);

backButton.addEventListener('click', back);
