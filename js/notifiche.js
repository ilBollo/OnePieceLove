function closeNotifica(idnotifica) {
    let form_data = new FormData();
    form_data.append("idnotifica", idnotifica);
    axios.post('api-notifiche.php', form_data)
    .then(response =>{
     let nNotif = document.getElementById('nNotifiche');
     let numero = parseInt(nNotif.innerText);
     nNotif.innerText = numero -1;
     let notif = document.getElementById('notif' + idnotifica);
     notif.remove();
     if (parseInt(nNotif.innerText) === 0) {
      let ul = document.getElementById('elenco-notifiche');
      let li = document.createElement('li');
      li.innerText = 'non ci sono notifiche aperte';
      ul.appendChild(li);
    }
    });
  }