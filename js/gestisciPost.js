/*function generaGestisciPostForm(loginerror = null) {
    let form = `
    <form action="#" method="POST" id="inserisci_post">
        <h2>Gestisci post</h2>
        <p></p>
        <ul>
            <li>
                <label for="titolopost">Titolo:</label><input type="text" id="titolopost" name="titolopost" />
            </li>
            <li>
                <label for="testopost">Testo post:</label><textarea id="testopost" name="testopost"></textarea>
            </li>
            <li>
                <label for="anteprimapost">Anteprima post:</label><textarea id="anteprimapost" name="anteprimapost"></textarea>
            </li>
            <li>
                <label for="imgpost">Immagine post
                </label><input type="file" name="imgpost" id="imgpost"/>
            </li>
            <li>
            <input type="button" class="form-control btn btn-danger rouded submit px-3" name="inserisci" value="Inserisci" onclick="inserisciPost()">
            </input>
                <a href="homepage.php">Annulla</a>
            </li>
        </ul>
    </form>
    `;
    return form;
}
*/

function inserisciPost(){
let formData = new FormData();

    formData.append('titolo', document.getElementById('titolopost').value);
    formData.append('testo', document.getElementById('testopost').value);
    formData.append('immaginePost', document.getElementById('imgpost').files[0]);

    axios.post('api-gestisciPost.php', formData).then(response => {
        console.log(response);
        if(response.data["inserito"]) {
            window.location.replace('homepage.php');
        } else {
            document.querySelector("form > p").innerText = "Errore in inserimento post";
        }
    });
}

//const main = document.querySelector("main");
//let form = generaGestisciPostForm();
//main.innerHTML = form;

