<?php
require_once 'bootstrap.php';

if(isUserLoggedIn()){
    $templateParams["titolo"] = "One Piece Love  - Home";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/home.js", "js/like.js");
    if(isset($_GET["formmsg"])){
        $templateParams["formmsg"] = $_GET["formmsg"];
    }
    
    require 'template/base.php';
} else {
    header('Location: index.php');
}
?>