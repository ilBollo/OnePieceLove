function utentiFilter(post){
    let result ="";
    if (post.length > 0) {
      result += `<ul class="list-group position-absolute dropdown-menu" style="width:40%; background-color: transparent;">`;
      for(let i=0; i < post.length; i++){
        result +=`
        <li class="list-group-item border-0">
          <a href="#">${post[i]["nome"]} ${post[i]["cognome"]} ${post[i]["linkImmagine"]}</a>
        </li>`;
      }
      result += `</ul>`;
    }
    return result;
  }

  document.querySelector('#nome_utente').addEventListener('input', function() {
    const nomeUtente = this.value;
    axios.get('api-ricerca.php', {
      params: {
        nome_utente: nomeUtente
      }
    })
    .then(function(response) {
      let risRicerca = utentiFilter(response.data);
      document.querySelector('#risultati_ricerca').innerHTML = risRicerca;
    });
  });

  //se clicco su qualsiasi altro punto cancello la risRicerca
  window.addEventListener('click', function(event) {
    if (!event.target.matches('#nome_utente')) {
      document.querySelector('#risultati_ricerca').innerHTML = '';
    }
  });