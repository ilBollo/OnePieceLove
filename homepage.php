<?php
require_once 'bootstrap.php';

if(isUserLoggedIn()){
    $templateParams["titolo"] = "One Piece Love  - Home";
    $templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "js/home.js","js/gestisciPost.js");
    $templateParams["notifiche"] = $dbh->getNnotifAperte($_SESSION["iduser"]);
    $templateParams["notificheDescr"] = $dbh->getDescrNotifAperte($_SESSION["iduser"]);
    require 'template/base.php';
} else {
    header('Location: index.php');
}
?>