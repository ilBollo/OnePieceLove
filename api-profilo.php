<?php
require("bootstrap.php");

if(isUserLoggedIn()){
    /**
     * Insert all the profile data
     */
    $result["iduser"] = isset($_GET["user"]) ? $_GET["user"] :  $_SESSION["iduser"];    
    $user = $dbh->getUserProfilo($result["iduser"]);
    $result["nome"] = $user["nome"];
    $result["cognome"] = $user["cognome"];
    $result["nickname"] = $user["nickname"];
    $result["idpersonaggio"] = UPLOAD_DIR.$user["idpersonaggio"];
    $result["personaggiopreferito"] = $user["personaggio_preferito"];
    $result["numFollower"] = count($dbh->getUserFollower($result["iduser"]));
    $result["numFollowed"] = count($dbh->getUserFollowed($result["iduser"]));

}

header("Content-Type: application/json");
echo json_encode($result);
?>
