axios.get('api-postprofilo.php'+location.search)
    .then(response => {
     let posts = generaPost(response.data);
     const postUtente = document.querySelector('#contenuto');
    postUtente.innerHTML = posts;
});


