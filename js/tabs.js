
function openPage(page) {
  if (page === 'collezioni') {
    const x = document.getElementById('generi');
    document.getElementById("radio-1").checked = true;
    document.getElementById("radio-2").checked = false;
    x.style.display = "none";
  } else if (page === 'generi') {
    const x = document.getElementById('collezioni');
    document.getElementById("radio-1").checked = false;
    document.getElementById("radio-2").checked = true;
    x.style.display = "none";
  }
  document.getElementById(page).style.display = "block";
}
