function generaPost(post){
    let result = "";
    for(let i=0; i < post.length; i++){
        let singolo = `
            <div class="container my-4 py-4">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-8 col-lg-8 col-xl-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-start align-items-center">
                                        <img class="rounded-circle shadow-1-strong me-3"
                                        src="${post[i]["idpersonaggio"]}.jpg" alt="avatar" width="60"
                                        height="60" />
                                        <div>
                                            <input type="hidden" id="getPostid${post[i]["idpost"]}" value="${post[i]["autore"]}">
                                            <h6 class="fw-bold text-primary mb-1"><a href="profilo.php?user=${post[i]["autore"]}" class="text-decoration-none">${post[i]["nickname"]}</a></h6>
                                            <p class="text-muted small mb-0">
                                            Pubblicato il ${post[i]["datapost"]}
                                            </p>
                                        </div>
                                    </div>
                                    <p class="mt-3 mb-4 pb-2">
                                    <img class="img-fluid" src="${post[i]["immaginepost"]}" alt="Image">
                                    <p class="fs-2 fw-bold mb-2">${post[i]["titolo"]}</p>
                                    <p>${post[i]["testo"]}</p>
                                    </p>
            `;
            let likes = showLikes(post[i]["idpost"], post[i]["numLike"], post[i]["autore"])
            +                   `</div>
            `;
             
        singolo += likes;
        let commento =`
                                <div class="card-footer py-3 border-0">
                                    <div class="d-flex flex-start w-100">
                                        <div class="form-outline w-100">
                                            <label for="textArea${post[i]["idpost"]}" hidden>scrivi commento</label>
                                            <textarea class="form-control" id="textArea${post[i]["idpost"]}" placeholder="Scrivi commento" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div class="float-end mt-2 pt-1">
                                        <button type="button" class="btn btn-primary btn-lg" onclick="inserisciCommento(${post[i]["idpost"]},${post[i]["autore"]})">Pubblica</button>
                                    </div>
                                    <div class="float-left mt-5 pt-1">
                                    <button onclick="mostraCommenti(${post[i]["idpost"]})">Visualizza tutti i commenti</button>
                                    </div>
                                    <div id="commenti${post[i]["idpost"]}" style="display:none">
                                    </div>
                                

                                </div>
                             </div>
                        </div>
                    </div>
        `;
        singolo += commento;
        result += singolo;
           

    }
    return result;
}


function mostraCommenti(id) {
    let commentiDiv = document.getElementById("commenti"+id);
    if (commentiDiv.style.display === "none") {
      commentiDiv.style.display = "block";
      caricaCommenti(id,commentiDiv);
    } else {
      commentiDiv.style.display = "none";
    }
  }
  
  function deleteCommenti(idcomment, idpost){
      let form_data = new FormData();
      form_data.append("idComment", idcomment);
      form_data.append("idPost", idpost);
      axios.post('api-commenti.php', form_data)
      .then(response =>{
          let commentiDiv = document.getElementById("commenti"+idpost);
          caricaCommenti(idpost,commentiDiv);
      });
  }
  
  function caricaCommenti(id,commentiDiv) {
      let formData = new FormData();
      formData.append('idpost', id);
      let result =``;
      axios.post('api-commenti.php', formData)
      .then(response => {
              let commenti=response.data;
              for(let i=0; i < commenti.length; i++){
                  let singolo = `
                  <div class="card mb-4">
                      <div class="card-body">
                          <p>${commenti[i]["Contenuto"]}</p>
                          <div class="d-flex justify-content-between">
                              <div class="d-flex flex-row align-items-center">
                                  <img src="./res/${commenti[i]["IdPersonaggio"]}.jpg" alt="avatar" width="25" height="25" />
                                  <p class="small mb-0 ms-2">${commenti[i]["nickname"]}</p>
                                  <p class="small mb-0 ms-2">${commenti[i]["dataCommento"]}</p>
                              </div>`;
  
          let thisUser = commenti[i]["idUser"];
                if(commenti[i]["user"]===thisUser){
                  singolo +=`<div class="d-flex flex-row align-items-center">
                              <p class="small text-muted mb-0">cancella?</p>
                              <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i>
                              <a onclick="deleteCommenti(${commenti[i]["idCommento"]},${commenti[i]["idPost"]})" style="color: #aaa;" class="link-muted"><i class="bi bi-trash3"></i></a>
                            </div>`;
                }
              singolo += `</div>
                      </div>
                  </div> `;
                  result += singolo;
              }
              commentiDiv.innerHTML = result;
      });
  }


function inserisciCommento(idpost, autore) {
    const comment = document.querySelector('#textArea'+idpost);
    if(comment.value !== ""){
        //chiudo il blocco dei commenti in modo di ricaricarlo alla successiva visualizzazione
        let commentiDiv = document.getElementById("commenti"+idpost);
        commentiDiv.style.display = "none";
        let formData = new FormData();
        formData.append('idpost', idpost);
        formData.append('comment', comment.value);
        formData.append('autore', autore);
        axios.post('api-commenti.php', formData)
        .then(response => {
            comment.value = "";
            mostraCommenti(idpost)
        });
    }
  }

  function showLikes(idpost, numLike, autore){
	let result =`
		<button class="btn btn-primary" onclick="updateLike(${idpost}, ${autore})">
		<em class="bi bi-hand-thumbs-up" id="like${idpost}">${numLike}</em>
		</button>		
	`;
	return result;
}
  

function updateLike(idpost, autore){
	let formData = new FormData();
	formData.append('idpost', idpost);
    formData.append('autore', autore);
	axios.post('api-like.php', formData).then(response => {
		if(response.data["updateLike"]){
			document.getElementById("like"+idpost).innerText = response.data["numLike"];
		}
	});
}

function inserisciPost(){
    let formData = new FormData();
    formData.append('titolo', document.getElementById('titolopost').value);
    formData.append('testo', document.getElementById('testopost').value);
    formData.append('immaginePost', document.getElementById('imgpost').files[0]);
    axios.post('api-gestisciPost.php', formData).then(response => {
        if(response.data["inserito"]) {
            window.location.replace('homepage.php');
        } else {
        document.querySelector("form > p").innerText = "Errore in inserimento post";
    }
});
}

