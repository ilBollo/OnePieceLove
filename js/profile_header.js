/**
 * Create the initial part of a user profile with image, username, full name, follower, followed, posts, favourite genres 
 * and a follow button if its not me.
 * @returns div containing the user profile infos
 */
function showProfileHeader(result){
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
                style="width: 150px; z-index: 1">
              <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                style="z-index: 1;">
                Edit profile
              </button>
            </div>
            <div class="ms-3" style="margin-top: 130px;">
              <h5>${result["nome"]} ${result["cognome"]}</h5>
              <p>${result["nickname"]}</p>
            </div>
          </div>
          <div class="p-4 text-black" style="background-color: #f8f9fa;">
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
			 
			 <div class="cardbox-heading">
			  <!-- START dropdown-->
			  <div class="dropdown float-right">
			   <button class="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
				<em class="fa fa-ellipsis-h"></em>
			   </button>
			   <div class="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style="position: absolute; transform: translate3d(-136px, 28px, 0px); top: 0px; left: 0px; will-change: transform;">
				<a class="dropdown-item" href="#">Hide post</a>
				<a class="dropdown-item" href="#">Stop following</a>
				<a class="dropdown-item" href="#">Report</a>
			   </div>
			  </div><!--/ dropdown -->
			  <div class="media m-0">
			   <div class="d-flex mr-3">
				<a href=""><img class="img-fluid rounded-circle" src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/4.jpg" alt="User"></a>
			   </div>
			   <div class="media-body">
			    <p class="m-0">Benjamin Robinson</p>
				<small><span><i class="icon ion-md-pin"></i> Nairobi, Kenya</span></small>
				<small><span><i class="icon ion-md-time"></i> 10 hours ago</span></small>
			   </div>
			  </div><!--/ media -->
			 </div><!--/ cardbox-heading -->
			  
			 <div class="cardbox-item">
			  <img class="img-fluid" src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/1.jpg" alt="Image">
			 </div><!--/ cardbox-item -->
			 <div class="cardbox-base">
			  <ul class="float-right">
			   <li><a><i class="fa fa-comments"></i></a></li>
			   <li><a><em class="mr-5">12</em></a></li>
			   <li><a><i class="fa fa-share-alt"></i></a></li>
			   <li><a><em class="mr-3">03</em></a></li>
			  </ul>
			  <ul>
			   <li><a><i class="fa fa-thumbs-up"></i></a></li>
			   <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/3.jpeg" class="img-fluid rounded-circle" alt="User"></a></li>
			   <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/1.jpg" class="img-fluid rounded-circle" alt="User"></a></li>
			   <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/5.jpg" class="img-fluid rounded-circle" alt="User"></a></li>
			   <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/2.jpg" class="img-fluid rounded-circle" alt="User"></a></li>
			   <li><a><span>242 Likes</span></a></li>
			  </ul>			   
			 </div><!--/ cardbox-base -->
			 <div class="cardbox-comments">
			  <span class="comment-avatar float-left">
			   <a href=""><img class="rounded-circle" src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/6.jpg" alt="..."></a>                            
			  </span>
			  <div class="search">
			   <input placeholder="Write a comment" type="text">
			   <button><i class="fa fa-camera"></i></button>
			  </div><!--/. Search -->
			 </div><!--/ cardbox-like -->			  
					
			</div><!--/ cardbox -->

           </div><!--/ col-lg-6 -->	
		   <div class="col-lg-3">
			<div class="shadow-lg p-4 mb-2 bg-white author">
			 <a href="http://www.themashabrand.com/">Get more from themashabrand.com</a>
			 <p>Bootstrap 4.1.0</p>
			</div>
		   </div><!--/ col-lg-3 -->
			
          </div><!--/ row -->
         </div><!--/ container -->
        </section>
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
  ${result["isMyProfile"] ? '' : generateFollowButton(result["canFollow"])}

</section>

    `;
}  

/**
 * Create the button to follow or unfollow a user.
 * @returns button containing follow or unfollow
 */
function generateFollowButton(canFollow) {
    if (canFollow) {
        return '<button id="followButton" class="followButton" name="follow" onclick="updateFollowed(true)">Follow</button>';
    } else {
        return '<button id="followButton" class="secondary followButton unfollowerButton" name="unfollow" onclick="updateFollowed(false)">Unfollow</button>';
    }
}

/**
 * Send a post request with username of who I want to follow or unfollow to update the database,
 * then change the followButton.
 * @returns buttons containing like or dislike
 */
function updateFollowed(canFollow){
    let button = document.getElementById("followButton");
    button.disabled = true;
    let formData = new FormData();
    username = document.getElementById("profileUsername").innerText;
    formData.append('username', username);
    formData.append('value', canFollow ? "add" : "remove");
    axios.post('api-follower.php', formData).then(response => {
        if(response.data["followButton"]){
            document.getElementById("followButton").outerHTML = generateFollowButton(!canFollow);
        }
    });
}

/**
 * Select the main and insert the divisions of profile page.
 */
const main = document.querySelector("main");
main.innerHTML = `
                    <div id="header"></div>
                    <p id="genres"></p>
                    <div id="content"></div>
                `;

/**
 * Send a get request with location.search to know who's profile I have to show.
 */
axios.get('api-profile.php').then(response => {
    console.log(response);
    const profileHeader = showProfileHeader(response.data);
    const header = document.querySelector('#header');
    header.innerHTML = profileHeader;
});

