function showProfile(result){
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
             <div class="ms-3" style="margin-top: 130px;">
              <h5>${result["nome"]} ${result["cognome"]}</h5>
              <p style="font-family: verdana;">${result["nickname"]}</p>
            </div>
          </div>
          <div class="p-4 text-black" style="background-color: #f8f9fa;">
            <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark" style="z-index: 1;">
                Edit profile
            </button>
            <div class="d-flex justify-content-end text-center py-1">
              <div class="px-3">
                <p class="mb-1 h5">${result["numeroAmici"]}</p>
                <p class="small text-muted mb-0">Amici</p>
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

axios.get('api-profile.php').then(response => {
    console.log(response);
    const profileHeader = showProfile(response.data);
    const header = document.querySelector('#header');
    header.innerHTML = profileHeader;
    
});
