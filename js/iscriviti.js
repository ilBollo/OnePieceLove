function generaIscrizioneForm(){
    let form = `
    <div class="error_form" hidden></div>
    <form action="#" method="POST" id="iscrivi_form">
        <h2 class="text-center">Iscriviti</h2>
        <p></p>
        <div class="form-outline mb-4">
            <input type ="email" id="email" name="email" class="form-control" placeholder="Email" required autofocus>
        </div>
        <div class="form-outline mb-4">
            <input type ="text" id="nome" name="nome" class="form-control" placeholder="Nome" required></input>
        </div>
        <div class="form-outline mb-4">        
            <input type ="text" id="cognome" name="cognome" class="form-control" placeholder="Cognome" required></input>
        </div>    
        <div class="form-outline mb-4">        
            <label for="data_nascita" class="form-label">Data di nascita</label>
            <input type="date" id="data_nascita" name="data_nascita" class="form-control" required></input>
        </div>    
        <div class="form-outline mb-4">        
            <input type ="tel" id="telefono" name="telefono" class="form-control" placeholder="Telefono"></input>
        </div>
        <div class="form-outline mb-4">        
            <input type ="text" id="nickname" name="nickname" class="form-control" placeholder="Nickname" onblur="checkNickname()" required></input>
        </div>
        <div class="form-outline mb-4">
            <input type ="password" id="password" name="password" class="form-control" placeholder="Password" required></input>
        </div>
        <div class="form-outline mb-4">        
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
        let formData = new FormData();
        formData.append('email',document.getElementById('email').value);
        formData.append('nome',document.getElementById('nome').value);
        formData.append('cognome',document.getElementById('cognome').value);
        formData.append('data_nascita',document.getElementById('data_nascita').value);
        formData.append('telefono',document.getElementById('telefono').value);
        formData.append('nickname',document.getElementById('nickname').value);
        formData.append('password',document.getElementById('password').value);
        formData.append('conferma_password',conferma_password.value);
        formData.append('personaggio', document.getElementById('personaggi_lista').value);
        axios.post('api-iscriviti.php',formData).then(response => {
            let error_div = document.querySelector('div.error_form');
            if(response.data.errorMsg !== "" && response.data.errorMsg !== undefined){
                error_div.innerHTML = response.data.errorMsg;
                error_div.removeAttribute('hidden');
                error_div.focus();
            }  else if(response.data.loggedIn === true) {
                window.location.replace("homepage.php");
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