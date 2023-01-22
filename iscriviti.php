<?php
require_once 'bootstrap.php';

if(!isUserLoggedIn()){
    $templateParams["title"] = "One Piece Love - Iscriviti";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/iscriviti.js");
    $templateParams["personaggi"] = $dbh->getPersonaggi();


    require 'template/login.php';
} else {
    header('Location: homepage.php');
}
?>