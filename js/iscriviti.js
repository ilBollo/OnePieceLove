/**
 * Creo form di iscrizione
 * @returns form di iscrizione
 */
function generaIscrizioneForm(){
    let form = `
    <form action="#" method="POST" id="iscrivi_form">
            <h2>Iscriviti</h2>
                    <label for="email">
                        Email:
                        <input type ="email" id="email" name="email" oninput="checkEmail()" required></input>
                    </label>
                    <div class="grid">
                    <div><label for="nome">
                        Nome:
                        <input type ="text" id="nome" name="nome" required></input>
                        </label> 
                    </div>
                    <div><label for="cognome">
                        Cognome:
                        <input type ="text" id="cognome" name="cognome" required></input>
                        </label>
                    </div>
                    </div>
                    <label for="data_nascita">
                        Data di nascita:
                        <input type="date" id="data_nascita" name="data_nascita" required></input>
                    </label>
                    <label for="telefono">
                        Telefono:
                        <input type ="tel" id="telefono" name="telefono"></input>
                    </label>
                    <label for="nickname">
                        Nickname:
                        <input type ="text" id="nickname" name="nickname" onblur="checkUsername()" required></input>
                    </label>
                    <label for="password">
                        Password:
                        <input type ="password" id="password" name="password" oninput="checkPassword()" required></input>
                    </label>
                    <label for="conferma_password">
                        Conferma password:
                        <input type ="password" id="conferma_password" name="conferma_password" oninput="checkConfirmPassword()" required></input>
                    </label>
                    <label for="personaggio_preferito">
                        Seleziona il tuo personaggio preferito di One Piece:
                        <section>
                        <h2>Personaggi</h2>
                        <ul>
                        <?php foreach($templateParams["personaggi"] as $personaggio): ?>
                            <li><a href="articoli-categoria.php?id=<?php echo $personaggio["idpersonaggio"]; ?>"><?php echo $personaggio["nome"]; ?></a></li>
                        <?php endforeach; ?>
                        </ul>
                    </section>
                    </label>
                <input type="button" name="iscriviti" value="iscriviti"onclick="submitForm()"></input>
            </form>
            <p>Hai già un account? <a href="index.php">Accedi</a></p>
    `;
    return form;
}

/**
 * Verifico se è una mail valida
 */
function checkEmail(){
    if(!email.validity.valueMissing){
        if(email.validity.typeMismatch){
            showError(email,'Invalid email format, expected example@domain.com');
            setValid(email,false);
        } else {
            let formData = new FormData();
            formData.append('checkEmail',email.value);
            axios.post('registration.php',formData).then(response => {
                if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                    showError(email,response.data.errorMsg);
                    setValid(email,false);
                } else if(response.data.valid === true){
                    setValid(email,true);
                }
            });
        }
    } else {
        email.removeAttribute("aria-invalid");
    }
}



/**
 * Make a post request to register a new user
 * @param {HTMLElement} first_name name field
 * @param {HTMLElement} last_name surname field
 * @param {HTMLElement} telephone telephone field
 * @param {HTMLElement} username username field
 * @param {HTMLElement} password password field 
 * @param {HTMLElement} confirm_password confirm password field
 */
function submitForm(first_name,last_name,telephone,username,password,confirm_password){
    let formData = new FormData();
    let SQL_date = birth_date.valueAsDate.toISOString().slice(0,10);
    formData.append('email',email.value);
    formData.append('first_name',first_name.value);
    formData.append('last_name',last_name.value);
    formData.append('birth_date',SQL_date);
    formData.append('telephone',telephone.value);
    formData.append('username',username.value);
    formData.append('password',password.value);
    formData.append('confirmPassword',confirm_password.value);
    if(profile_picture.value !== ''){
        formData.append('profile_picture',profile_picture.files[0]);
    }
    formData.append('notification',notification.checked);
    formData.append('favoriteGenres',JSON.stringify(getGenresID()));

    axios.post('registration.php',formData).then(response => {
        let error_div = document.querySelector('div.error_form');
        if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
            error_div.innerHTML = response.data.errorMsg;
            error_div.removeAttribute('hidden');
            error_div.focus();
            if(response.data.errorElem !== undefined && response.data.errorElem !== undefined){
                response.data.errorElem.forEach(element => setValid(document.getElementById(element),false));
            }
        }  else if(response.data.loggedIn === true) {
            window.location.replace("homepage.php");
        }
    });
}

const main = document.querySelector("main");
main.innerHTML = generaIscrizioneForm();
const email = document.getElementById('email');
const birth_date = document.getElementById('birth_date');
const notification = document.getElementById('notification');
axios.get("genre.php?genre=get").then(response => {
    let dropdown = document.getElementById('genres_list');
    dropdown.innerHTML += createGenres(response.data,false);
});
email.focus();

