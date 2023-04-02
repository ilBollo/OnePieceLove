function showLikes(idpost, numLike, myReaction){
	let likeValue = false;
		if(myReaction == 1){
			likeValue = true;
		} 
	
	let result =`
		<button class="btn btn-primary" onclick="updateLike(${likeValue}, ${idpost})">
		<i class="bi bi-hand-thumbs-up" id="like${idpost}">${numLike}</i>
		</button>		
	`;
			
	return result;
}
  

function updateLike(likeValue, idpost){
	let formData = new FormData();
	formData.append('idpost', idpost);
	formData.append('likeValue', likeValue ? 1 : 0);
	axios.post('api-like.php', formData).then(response => {
		if(response.data["updateLike"]){
			document.getElementById("like"+idpost).innerText = response.data["numLike"];
		}
	});
}


