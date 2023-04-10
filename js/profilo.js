function showProfilo(result){
    return `
<section class="h-100">
  <div class="container py-3 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card">
          <div class="rounded-top text-white bg-black h-200 d-flex flex-row">
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
          <div class="p-4 text-black" id="datiaccount">
            <div class="d-flex justify-content-start text-center py-1 id="followButton">
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
          </div>
        </div>
         <div class="card-body p-4 text-black">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">Personaggio preferito</p>
              <div class="p-4" style="background-color: #f8f9fa;">
                <p class="font-italic mb-1">${result["personaggiopreferito"]}</p>
              </div>
            </div>
         <div class="container">
         <div class="row">	
		   <div class="col-lg-6 offset-lg-3">
			<div class="cardbox shadow-lg bg-white">
    </div>
  </div>
</section>
    `;
}  


function generaFollowButton(seguito) {
                  if (!seguito) {
                      return '<button id="followButton" class="btn btn-outline-dark" name="follow" onclick="updateFollowed(true)">Segui</button>';
                  } else {
                      return '<button id="followButton" class="secondary followButton unfollowerButton" name="unfollow" onclick="updateFollowed(false)">Non seguire</button>';
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
      document.getElementById("followButton").outerHTML = generaFollowButton(seguito);
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
