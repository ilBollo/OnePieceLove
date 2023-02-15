<?php
require("bootstrap.php");

if(isUserLoggedIn()){
    /**
     * Insert all the profile data
     */
    $result["iduser"] = $_SESSION["iduser"];    
    $user = $dbh->getUserProfilo($result["iduser"]);
    $result["nome"] = $user["nome"];
    $result["cognome"] = $user["cognome"];
    $result["nickname"] = $user["nickname"];
    $result["idpersonaggio"] = UPLOAD_DIR.$user["idpersonaggio"];
    $result["personaggiopreferito"] = $user["personaggio_preferito"];
    $result["numeroAmici"] = count($dbh->getUserAmici($result["iduser"]));

  /*  $result["posts"] = $dbh->getUserPosts($result["username"]);
    foreach($result["posts"] as &$post){
        $post["comments"] = $dbh->getPostComments($post["postID"]);
        for ($j = 0; $j < count($post["comments"]); $j++){
            $post["comments"][$j]["profilePicture"] = UPLOAD_DIR.$post["comments"][$j]["profilePicture"];
        }
        $post["reactions"] = $dbh->getReactions($post["postID"]);
        $post["isMyReaction"] = count($dbh->checkReaction($post["postID"], $_SESSION["username"]));
        if($post["isMyReaction"]){
            $post["myReaction"] = $dbh->checkReaction($post["postID"], $_SESSION["username"])[0]["likes"];
        }
        $post["numLike"] = count(array_filter($post["reactions"], function($p) { return $p["likes"]; }));
        $post["numDislike"] = count(array_filter($post["reactions"], function($p) { return !$p["likes"]; }));
    }*/
}

header("Content-Type: application/json");
echo json_encode($result);
