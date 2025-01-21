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
  load.style.display = 'none';
  tabs.style.display = '';
  banner.style.display = 'block';
  continueContainer.style.display = 'inline-block';
  allPage.style.display = 'block';
  ditendenza.style.display = 'block';
}

if (load !== null) {
  const timeoutId = setTimeout(showPage, 2000);

  document.addEventListener('keydown', function() {
    clearTimeout(timeoutId);
    showPage();
  });
}
