
function openPage(page) {
  if (page === 'collezioni') {
    const x = document.getElementById('generi');
    const saga = document.getElementById('saga');
    document.getElementById("radio-1").checked = true;
    document.getElementById("radio-2").checked = false;
    document.getElementById("radio-3").checked = false;
    x.style.display = "none";
    saga.style.display = "none";
  } else if (page === 'generi') {
    const x = document.getElementById('collezioni');
    const saga = document.getElementById('saga');
    document.getElementById("radio-1").checked = false;
    document.getElementById("radio-2").checked = true;
    document.getElementById("radio-3").checked = false;
    x.style.display = "none";
    saga.style.display = "none";
  } else if (page === 'saga') {
    const x = document.getElementById('collezioni');
    const generi = document.getElementById('generi');
    document.getElementById("radio-1").checked = false;
    document.getElementById("radio-2").checked = false;
    document.getElementById("radio-3").checked = true;
    x.style.display = "none";
    generi.style.display = "none";
  }
  document.getElementById(page).style.display = "block";
}
