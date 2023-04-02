function generaPost(post){
    let result = "";
    for(let i=0; i < post.length; i++){
        let singolo = `
            <div class="container my-5 py-5">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-8 col-lg-8 col-xl-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-start align-items-center">
                                        <img class="rounded-circle shadow-1-strong me-3"
                                        src="${post[i]["idpersonaggio"]}.jpg" alt="avatar" width="60"
                                        height="60" />
                                        <div>
                                            <h6 class="fw-bold text-primary mb-1">${post[i]["nickname"]}</h6>
                                            <p class="text-muted small mb-0">
                                            Pubblicato il ${post[i]["datapost"]}
                                            </p>
                                        </div>
                                    </div>
                                    <p class="mt-3 mb-4 pb-2">
                                    <img class="img-fluid" src="${post[i]["immaginepost"]}" alt="Image">
                                    <h2>${post[i]["titolo"]}</h2>
                                    <p>${post[i]["anteprimapost"]}</p>
                                    </p>
            `;
            let likes = showLikes(post[i]["idpost"], post[i]["numLike"], post[i]["isMyReaction"], post[i]["myReaction"])
            +                   `</div>
            `;
             
        singolo += likes;
        let commento =`
                                <div class="card-footer py-3 border-0">
                                    <div class="d-flex flex-start w-100">
                                        <div class="form-outline w-100">
                                            <textarea class="form-control" id="textArea" placeholder="Scrivi commento" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div class="float-end mt-2 pt-1">
                                        <button type="button" class="btn btn-info btn-lg" onclick="inserisciCommento(${post[i]["idpost"]})">Pubblica</button>
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
    showCommenti(id,commentiDiv);
  } else {
    commentiDiv.style.display = "none";
  }
}

function deleteComment(idcomment, idpost){
    let form_data = new FormData();
    form_data.append("idComment", idcomment);
    form_data.append("idPost", idpost);
    axios.post('api-commenti.php', form_data).then(response =>{
        let commentiDiv = document.getElementById("commenti"+idpost);
        showCommenti(idpost,commentiDiv);
    });
}

function showCommenti(id,commentiDiv) {
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
                            <p class="small text-muted mb-0">remove?</p>
                            <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i>
                            <a onclick="deleteComment(${commenti[i]["idCommento"]},${commenti[i]["idPost"]})" style="color: #aaa;" class="link-muted"><i class="bi bi-trash3"></i></a>
                          </div>`;
              }
            singolo += `</div>
                    </div>
                </div> `;
                result += singolo;
            }
            commentiDiv.innerHTML = result;
    })
    .catch(error => {
      console.error(error);
    });
}


function inserisciCommento(idpost) {
    const comment = document.querySelector('#textArea');
    if(comment.value !== ""){
        //chiudo il blocco dei commenti in modo di ricaricarlo alla sucessiva visualizzazione
        let commentiDiv = document.getElementById("commenti"+idpost);
        commentiDiv.style.display = "none";
        let formData = new FormData();
        formData.append('idpost', idpost);
        formData.append('comment', comment.value);
    
        axios.post('api-commenti.php', formData)
        .then(response => {
            comment.value = "";
            mostraCommenti(idpost)
        })
        .catch(error => {
        console.error(error);
        });
    }
  }
  




axios.get('api-postprofilo.php')
    .then(response => {
    console.log(response.data);
     let posts = generaPost(response.data);
     const postUtente = document.querySelector('#contenuto');
    postUtente.innerHTML = posts;
    main.innerHTML += `
    <section>
        <a href="gestisci-post.php?action=1">Inserisci Post</a>
    </section>
    `;
});


