let token = getCookie("jwt");
const login = document.getElementById('login');
if (token) {
  login.innerHTML = "Logout";
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

setTimeout(function loadPage() {
  const load = document.getElementById('load');
  const allPage = document.getElementById('all-page');
  load.style.display = 'none';
  allPage.style.visibility = 'visible';
}, 2000);
