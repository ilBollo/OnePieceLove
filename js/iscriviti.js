function generaIscrizioneForm(){
    let form = `
    <div class="error_form" hidden></div>
    <form action="#" method="POST" id="iscrivi_form">
        <h2 class="text-center">Iscriviti</h2>
        <p></p>
        <div class="form-outline mb-4">
            <label for="email" hidden>email</label>
            <input type ="email" id="email" name="email" class="form-control" placeholder="Email" required autofocus>
        </div>
        <div class="form-outline mb-4">
            <label for="nome" hidden>nome</label>
            <input type ="text" id="nome" name="nome" class="form-control" placeholder="Nome" required></input>
        </div>
        <div class="form-outline mb-4">
            <label for="cognome" hidden>cognome</label>  
            <input type ="text" id="cognome" name="cognome" class="form-control" placeholder="Cognome" required></input>
        </div>    
        <div class="form-outline mb-4">
            <label for="data_nascita" class="form-label">Data di nascita</label>
            <input type="date" id="data_nascita" name="data_nascita" class="form-control" required></input>
        </div>    
        <div class="form-outline mb-4">
            <label for="telefono" hidden>telefono</label>
            <input type ="tel" id="telefono" name="telefono" class="form-control" placeholder="Telefono"></input>
        </div>
        <div class="form-outline mb-4">
            <label for="nickname" hidden>nickname</label>
            <input type ="text" id="nickname" name="nickname" class="form-control" placeholder="Nickname" onblur="checkNickname()" required></input>
        </div>
        <div class="form-outline mb-4">
            <label for="password" hidden>password</label>
            <input type ="password" id="password" name="password" class="form-control" placeholder="Password" required></input>
        </div>
        <div class="form-outline mb-4">
        <label for="conferma_password" hidden>conferma password</label>
            <input type ="password" id="conferma_password" name="conferma_password" class="form-control" placeholder="Conferma Password" oninput="checkConfermaPassword()" required></input>
        </div>
        <label for="personaggi_lista">
            Seleziona il tuo personaggio preferito di One Piece:
            <select id="personaggi_lista" title="Lista personaggi">
            </select>
        </label>
        <input type="button" class="form-control btn btn-danger rouded submit px-3" name="iscriviti" value="Iscriviti" onclick="submitForm()">
        </input>
    </form>
    <p>Hai già un account? <a href="index.php">Accedi</a></p>
    `;
    return form;
}




function submitForm(){
    let error_div = document.querySelector('div.error_form');
    if( error_div.innerHTML.length === 0){
        
            // Verifica che tutti i campi obbligatori siano stati compilati
    let email = document.getElementById("email").value;
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;
    let data_nascita = document.getElementById("data_nascita").value;
    let password = document.getElementById("password").value;
    let conferma_password = document.getElementById("conferma_password").value;
    let nickname = document.getElementById("nickname").value;
    let personaggio = document.getElementById('personaggi_lista').value;
    
    if (email == "" || nome == "" || cognome == "" || data_nascita == "" || password == "" || conferma_password == "" || nickname == "" || personaggio =="") {
        // Se un campo obbligatorio non è stato compilato, visualizza un messaggio di errore
        error_div.innerHTML = 'Compilare tutti i campi';
        error_div.removeAttribute('hidden');
                error_div.focus();
    } else {
        let formData = new FormData();
        formData.append('email',email);
        formData.append('nome', nome);
        formData.append('cognome', cognome);
        formData.append('data_nascita', data_nascita);
        formData.append('telefono', telefono);
        formData.append('nickname', nickname);
        formData.append('password', password);
        formData.append('conferma_password',conferma_password);
        formData.append('personaggio', personaggio);
        axios.post('api-iscriviti.php',formData).then(response => {
            console.log(response);
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                let error_div = document.querySelector('div.error_form');

                error_div.innerHTML = response.data.errorMsg;
                error_div.removeAttribute('hidden');
                error_div.focus();
            }  else if(response.data.loggedIn === true) {
                window.location.replace("homepage.php");
            }
        });
    }
    }
}





function creaPersonaggi(personaggi){
    let result = ``;
    personaggi.forEach(element =>{
        let item = `
                <option value="${element["idPersonaggio"]}">${element["nome"]}
                </option>
                `;
        result+=item;
    });
    return result;
}

function checkConfermaPassword(){
    let password = document.getElementById('password');
    let confPassword = document.getElementById('conferma_password');
    let error_div = document.querySelector("div.error_form");
    if (password.value !==confPassword.value){
        error_div.innerHTML = "Password e conferma password sono diversi";    
        error_div.removeAttribute('hidden');
        error_div.focus();
    } else {
        error_div.innerHTML ='';
        error_div.focus();
    }
}


/**
 * Check nickname non usato e valido
 */
function checkNickname(){
    let nickname = document.getElementById('nickname');
    if(!nickname.validity.valueMissing){
        let formData = new FormData();
        formData.append('nickname',nickname.value);
        axios.post('api-iscriviti.php',formData).then(response => {
            console.log(response);
            let error_div = document.querySelector("div.error_form");
            if(response.data.errorMsg !== undefined){
                error_div.innerHTML = response.data.errorMsg;    
                error_div.removeAttribute('hidden');
                error_div.focus();
            } else {
                error_div.innerHTML ='';
                error_div.focus();
            }
        });
    }   
}

const main = document.querySelector("main");
main.innerHTML = generaIscrizioneForm();
const email = document.getElementById('email');
axios.get("api-personaggi.php").then(response => {
    let personaggi = document.getElementById('personaggi_lista');
    personaggi.innerHTML += creaPersonaggi(response.data);
});