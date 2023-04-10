function showProfilo(result){
    return `
  <div class="container my-4 py-4">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-8 col-lg-8 col-xl-8">
        <div class="card">
          <div class="rounded-top text-white bg-primary h-200 d-flex flex-row">
            <div class="ms-4 mt-5 d-flex flex-column w-150">
              <img src="${result["idpersonaggio"]}.jpg"
                alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
              style="width: 150px; z-index: 1"/>
            </div>
            <input type="hidden" id="getProfile" value="${result["iduser"]}">
            <div class="ms-3 mt-5">
              <p class="fs-3" id="nome_cognome">${result["nome"]} ${result["cognome"]}</p>
              <p style="font-family: verdana;">${result["nickname"]}</p>
            </div>
          </div>
          <div class="d-flex justify-content-end text-center p-4" id="datiaccount">
              ${result["isMyProfilo"] ? '' : generaFollowButton(result["seguito"])}
              <div class="px-3 ml-auto">
                <p id="numeroFollower" class="mb-1 h5">${result["numFollower"]}</p>
                <p class="small text-muted mb-0">follower</p>
              </div>
              <div class="px-3">
                <p id="numeroFollowed" class="mb-1 h5">${result["numFollowed"]}</p>
                <p class="small text-muted mb-0">profili seguiti</p>
              </div>
          </div>
         <div class="card-body p-4 bg-light text-black">
            <p class="fw-normal mb-1">Personaggio preferito</p>
            <div class="p-4">
             <p id="personaggioPreferito" class="fw-bold mb-1">${result["personaggiopreferito"]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
}  


function generaFollowButton(seguito) {
                  if (!seguito) {
                      return '<button type="button" id="bottoneSegui" class="btn btn-outline-dark" name="follow" onclick="updateFollowed(true)">Segui</button>';
                  } else {
                      return '<button type="button" id="bottoneSegui" class="btn btn-outline-dark" name="unfollow" onclick="updateFollowed(false)">Non seguire</button>';
                  }
              }

function updateFollowed(seguito){
  let formData = new FormData();
  user = document.getElementById("getProfile").value;
  formData.append('user', user);
  formData.append('value', seguito);
  axios.post('api-follower.php', formData).then(response => {
    console.log(response);
    if(response.data["inserito"]){
      document.getElementById("numeroFollower").textContent = response.data["numFollower"];
      document.getElementById("bottoneSegui").outerHTML = generaFollowButton(seguito);
    }
  });
}


const main = document.querySelector("main");
main.innerHTML = `
                    <div id="header"></div>
                    <div id="contenuto"></div>
                `;

axios.get('api-profilo.php'+location.search).then(response => {
    const profiloHeader = showProfilo(response.data);
    const header = document.querySelector('#header');
    header.innerHTML = profiloHeader;
});
