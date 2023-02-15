function generaPost(post){
    let result = "";

    for(let i=0; i < post.length; i++){
        let singolo = `
        <article>
            <header>
                <div>
                    <img src="${post[i]["immaginepost"]}" alt="" />
                </div>
                <h2>${post[i]["titolo"]}</h2>
                <p>${post[i]["nickname"]} - ${post[i]["datapost"]}</p>
            </header>
            <section>
                <p>${post[i]["testo"]}</p>
            </section>
            <footer>
                <a href="post.php?id=${post[i]["idpost"]}">Leggi tutto</a>
            </footer>
        `;
        let likes = `
            ` + showLikes(post[i]["idpost"], post[i]["numLike"], post[i]["isMyReaction"], post[i]["myReaction"])
             + `</article>
        `;
        singolo += likes;
        result += singolo;
    }
    return result;
}




axios.get('api-home.php').then(response => {
    console.log(response);
     let posts = generaPost(response.data);
    const main = document.querySelector("main");
    main.innerHTML = posts;
    main.innerHTML += `
    <section>
        <a href="gestisci-post.php?action=1">Inserisci Post</a>
    </section>
    `;
});
