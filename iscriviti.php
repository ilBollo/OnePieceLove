<?php
require_once 'bootstrap.php';

if(!isUserLoggedIn()){
    $templateParams["titolo"] = "One Piece Love - Iscriviti";
    $templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js","js/iscriviti.js");
    $templateParams["personaggi"] = $dbh->getPersonaggi();
    require 'template/login.php';
} else {
    header('Location: homepage.php');
}
?>