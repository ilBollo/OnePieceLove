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

}

header("Content-Type: application/json");
echo json_encode($result);
?>
