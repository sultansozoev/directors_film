function addRequest(name, title, request_idm, type, user_id) {
  const url = `https://surio.ddns.net/addList`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id, request_idm, type, title, name})
  }).then(response => response.json())
    .then(data => {
      const modal = document.getElementById("modal");
      if (title) modal.innerHTML = title;
      else modal.innerHTML = name
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function elimina(list_id, user_id, request_id) {
  const url = `https://surio.ddns.net/elimina`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body:  JSON.stringify({
      list_id,
      user_id,
      request_id
    })
  })
    .then(response => response.json())
    .then(res => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
