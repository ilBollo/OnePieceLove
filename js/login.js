function generaLoginForm(loginerror = null) {
    let form = `
    <form action="#" method="POST">
        <h2>Login</h2>
        <p></p>
        <ul>
            <li>
                <label for="username">Username:</label><input type="text" id="username" name="username" />
            </li>
            <li>
                <label for="password">Password:</label><input type="password" id="password" name="password" />
            </li>
            <li>
                <input type="submit" name="submit" value="Invia" />
            </li>
        </ul>
    </form>`;
    return form;
}


const main = document.querySelector("main");
axios.get('api-login.php').then(response => {
    console.log(response);
    if (response.data["logineseguito"]) {
        // Utente loggato
        console.log(prova1);
    } else {
        // Utente NON loggato
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
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        login(username, password);
    });
}

function login(username, password) {
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
    formData.append('username', username);
    formData.append('password', password);
    axios.post('api-login.php', formData).then(response => {
        console.log(response);
        if (response.data["logineseguito"]) {
            console.log(prova1);
        } else {
            document.querySelector("form > p").innerText = response.data["errorelogin"];
        }
    });
}
