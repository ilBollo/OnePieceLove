function showProfilo(result){
    return `
<section class="h-100 gradient-custom-2">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              <img src="${result["idpersonaggio"]}.jpg"
                alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
              style="width: 150px; z-index: 1"/>
            </div>
            <input type="hidden" id="getProfile" value="${result["iduser"]}">
             <div class="ms-3" style="margin-top: 130px;">
              <h5>${result["nome"]} ${result["cognome"]}</h5>
              <p style="font-family: verdana;">${result["nickname"]}</p>
            </div>
          </div>
          <div class="p-4 text-black" id=bottoneSegui style="background-color: #f8f9fa;">
            ${result["isMyProfilo"] ? '' : generaFollowButton(result["seguito"])}
            <div class="d-flex justify-content-end text-center py-1">
            <div class="px-3">
                <p id="numeroFollower" class="mb-1 h5">${result["numFollower"]}</p>
                <p class="small text-muted mb-0">follower</p>
              </div>
              <div class="px-3">
                <p  class="mb-1 h5">${result["numFollowed"]}</p>
                <p class="small text-muted mb-0">profili seguiti</p>
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
            <section class="hero">
         <div class="container">
         <div class="row">	
		   <div class="col-lg-6 offset-lg-3">
			<div class="cardbox shadow-lg bg-white">
    </div>
  </div>
</section>
    `;
}  


const main = document.querySelector("main");
main.innerHTML = `
                    <div id="header"></div>
                    <div id="contenuto"></div>
                `;


function generaFollowButton(seguito) {
                  if (!seguito) {
                      return '<button id="followButton" class="btn btn-outline-dark" name="follow" onclick="updateFollowed(true)">Segui</button>';
                  } else {
                      return '<button id="followButton" class="secondary followButton unfollowerButton" name="unfollow" onclick="updateFollowed(false)">Non seguire</button>';
                  }
              }

function updateFollowed(seguito){
  let button = document.getElementById("followButton");
  let formData = new FormData();
  user = document.getElementById("getProfile").value;
  formData.append('user', user);
  formData.append('value', seguito ? "add" : "remove");
  axios.post('api-follower.php', formData).then(response => {
    console.log(response.data["inserito"]);
    if(response.data["inserito"]){
      console.log(response.data["numFollower"]);
      document.getElementById("numeroFollower").textContent = response.data["numFollower"];
      document.getElementById("followButton").outerHTML = generaFollowButton(seguito);
    }
  });
}


axios.get('api-profilo.php'+location.search).then(response => {
    const profiloHeader = showProfilo(response.data);
    const header = document.querySelector('#header');
    header.innerHTML = profiloHeader;    
});
