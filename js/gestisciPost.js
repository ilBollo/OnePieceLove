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

