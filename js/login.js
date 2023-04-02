function generaLoginForm(loginerror = null) {
    let form = `
            <form action="#" method="POST">            
                    <h2 class="text-center">Login</h2>
                    <p></p>
                    <div class="form-outline mb-4">
                        <input type="text" name="email" id="email" class="form-control" placeholder="email"  required autofocus>
                    </div>
                    <div class="form-outline mb-4">
                    <input type="password" name="password" id="password" class="form-control" placeholder="password" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="form-control btn btn-danger rouded submit px-3" name="submit">
                    Accedi
                        </button>
                    </div>
                    <div class="form-group d-md-flex">
                        <div class="w-50 text-left">
                            <label for="ricordami" class="checkbox-wrap checkbox-primary mb-0">
                                Ricordami
                                <input type="checkbox" id="ricordami" name="ricordami" role="switch">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>       
            </form>
            <p></p>
            <p>Non hai un account? <a href="iscriviti.php">Iscriviti</a></p>
    `;
    return form;
}


const main = document.querySelector("main");


axios.get('api-login.php').then(response => {
    if (response.data["logineseguito"]) {
        // Utente loggato mi sposto nella home
        header('Location: homepage.php');
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
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        login(email, password);
    });
}

function login(email, password) {
    const ricordami = document.getElementById("ricordami");
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('ricordami',ricordami.checked);
    axios.post('api-login.php', formData).then(response => {
        console.log(response);
        if (response.data["logineseguito"]) {
            window.location.replace('homepage.php');
        } else {
            document.querySelector("form > p").innerText = response.data["errorelogin"];
        }
    });
}
