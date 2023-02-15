/**
 * Create the button to like or dislike a post.
 * @returns buttons containing like or dislike
 */
function showLikes(idpost, numLike, isMyReaction, myReaction){
	let likeImg = "";
	if(isMyReaction){
		if(myReaction == 1){
			likeImg = `<img id="like-img${idpost}" src="res/like.svg" alt="Like">`;
		} else {
			likeImg = `<img id="like-img${idpost}" src="res/nolike.svg" alt="Like">`;
		}
	} else {
		likeImg = `<img id="like-img${idpost}" src="res/nolike.svg" alt="Like">`;
	} 

	let result =`
		<button class="btn btn-info btn-lg" onclick="updateLike(true, ${idpost})">
		<span class="glyphicon glyphicon-thumbs-up" id="like${idpost}">${numLike}</span>
		</button>
	`;
			
	return result;
}
  
/**
 * Send a post request with idpost and likeValue to update the database, then change the button image.
 */
function updateLike(likeValue, idpost){
	let formData = new FormData();
	formData.append('idpost', idpost);
	formData.append('likeValue', likeValue ? 1 : 0);
	axios.post('api-post.php', formData).then(response => {
		console.log(response);
		console.log("miao");
		if(response.data["updateLike"]){
		//	updateLikeImg(response.data["isMyReaction"], likeValue, idpost);
			document.getElementById("like"+idpost).innerText = response.data["numLike"];
		}
	});
}


	//	document.getElementById("dislike-img"+idpost).src = `res/nolike.svg`;
