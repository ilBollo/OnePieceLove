function bottoneRacconta(){
   return `
    <div class="container my-5 py-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-8 col-lg-8 col-xl-8">
                <button type="button" class="btn btn-warning btn-lg d-block mx-auto text-dark" onclick="visInserimento()">
                <span class="bi bi-fire"></span> Racconta qualcosa su One Piece</button>
                <form action="#" method="POST" id="inserisci_post" class="card" style="display:none">
                <p></p>
                    <div class="form-outline mb-4">
                    <input type="text" id="titolopost" name="titolopost" class="form-control" maxlength="200" placeholder="Titolo.." />
                     <div class="form-outline mb-4">
                        <textarea id="testopost" name="testopost" class="form-control" maxlength="700" placeholder="Testo Storia..."></textarea>
                    </div>
                    <div class="form-outline mb-4">
                        <label for="imgpost">Aggiungi un immagine
                        </label><input type="file" name="imgpost" id="imgpost"/>
                    </div>
                    <div class="float-left mt-5 pt-1">
                        <button type="button" class="btn btn-primary btn-lg" name="inserisci" value="Inserisci" onclick="inserisciPost()">Inserisci Storia
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}


function visInserimento(id) {
    let raccontaDiv = document.getElementById("inserisci_post");
    if (raccontaDiv.style.display === "none") {
      raccontaDiv.style.display = "block";
    } else {
        raccontaDiv.style.display = "none";
    }
}


axios.get('api-home.php')
    .then(response => {
     let posts = generaPost(response.data);
     let racconta = bottoneRacconta();
     const main = document.querySelector("main");
    main.innerHTML = racconta;
    main.innerHTML += posts;
});

