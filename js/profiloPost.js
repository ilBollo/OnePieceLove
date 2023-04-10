axios.get('api-post.php'+location.search,{
    params: {
      pagina: "profilo.php"
    }
  })
    .then(response => {
     let posts = generaPost(response.data);
     const postUtente = document.querySelector('#contenuto');
    postUtente.innerHTML = posts;
});


