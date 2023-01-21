function generaLoginForm(loginerror = null) {
    let form = `
    <form action="#" method="POST">
    <h2>Login</h2>
    <p></p>
    <div class="form-outline mb-4">
        <input type="text" name="email" id="email" class="form-control" placeholder="email" value="simobollo88@gmail.com" required autofocus>
    </div>
    <div class="form-outline mb-4">
    <input type="password" name="password" id="password" class="form-control" placeholder="password" value="rimini" required autofocus>
    </div>
    <button class="btn btn-lg btn-danger btn-block btn-signin" name="submit" type="submit">
    enter
    </button>
    </form>`;
    return form;
}


const main = document.querySelector("main");
axios.get('api-login.php').then(response => {
    console.log(response);
    if (response.data["logineseguito"]) {
        // Utente loggato
        console.log("utenteLoggato");
    } else {
        // Utente NON loggato
        console.log("utenteNonLoggato");
        visualizzaLoginForm();
    }
});


function visualizzaLoginForm() {
    // Utente NON loggato
    let form = generaLoginForm();
    main.innerHTML = form;
    // Gestisco tentativo di login
    document.querySelector("main form").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        login(email, password);
    });
}

function login(email, password) {
    /* 
     * Non funzionante in quanto i parametri sono convertiti in formato json e non sono letti 
     * da PHP che non li inserisce nell'array $_POST:
     * 
     * const formData = { 
     *     data: {
     *         username: document.querySelector("#username").value,
     *         password: document.querySelector("#password").value
     *     }
     * }
     */
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    axios.post('api-login.php', formData).then(response => {
        console.log(response);
        if (response.data["logineseguito"]) {
            console.log("prova1");
        } else {
            document.querySelector("form > p").innerText = response.data["errorelogin"];
            console.log("noneseguitoCavolo");
        }
    });
}
