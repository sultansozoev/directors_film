let token = getCookie("jwt");
const login = document.getElementById('login');
const request = document.getElementById('request');
const list = document.getElementById('list');
const ditendenza = document.getElementById('ditendenza');
if (token) {
  login.innerHTML = "Logout";
} else {
  request.style.display = "none";
  list.style.display = "none";
}
function logout() {
  token = "";
  delete_cookie("jwt", "/");
  delete_cookie("user", "/")
  login.innerHTML = "Login";
  login.href = "login.html";
}
function delete_cookie( name, path, domain ) {
  if(getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)===' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
const load = document.getElementById('load');

function showPage() {
  const allPage = document.getElementById('all-page');
  const banner = document.getElementById('banner');
  const tabs = document.getElementById('container1');
  const continueContainer = document.getElementById('continue');
  const addedRecently = document.getElementById('added_recently');
  const voted = document.getElementById('voted');
  load.style.display = 'none';
  if (tabs)
    tabs.style.display = '';
  banner.style.display = 'block';
  voted.style.display = 'block';
  continueContainer.style.display = 'inline-block';
  allPage.style.display = 'block';
  ditendenza.style.display = 'block';
  addedRecently.style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function () {
  if (load !== null) {
    const timeoutId = setTimeout(() => {
      showPage();
      document.removeEventListener('keydown', keyHandler);
    }, 2000);

    function keyHandler() {
      clearTimeout(timeoutId);
      showPage();
      document.removeEventListener('keydown', keyHandler);
    }

    const audioElement = document.getElementById("welcome-audio");

    if (audioElement) {
      audioElement.muted = false;
      audioElement.play().then(() => {
        setTimeout(() => {
          audioElement.muted = false; // Rimuove il muto dopo un breve ritardo
        }, 1);
      }).catch(error => {
        console.log("Riproduzione automatica bloccata. L'utente deve interagire con la pagina.", error);
      });
    }
    document.addEventListener('keydown', keyHandler);

  }
})
