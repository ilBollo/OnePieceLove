<?php
require_once 'bootstrap.php';


if(!isUserLoggedIn() /*|| !isset($_GET["action"]) || ($_GET["action"]!=1 && $_GET["action"]!=2 && $_GET["action"]!=3) || ($_GET["action"]!=1 && !isset($_GET["iduser"]))*/){
    header("location: index.php");
}


$templateParams["titolo"] = "One Piece Love";
$templateParams["azione"] = $_GET["action"];
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/gestisciPost.js");

/*
if($_GET["action"]!=1){
    $risultato = $dbh->getPostByIdAndAuthor($_GET["id"], $_SESSION["idautore"]);
    if(count($risultato)==0){
        $templateParams["articolo"] = null;
    }
    else{
        $templateParams["articolo"] = $risultato[0];
        $templateParams["articolo"]["categorie"] = explode(",", $templateParams["articolo"]["categorie"]);
    }
}
else{
    $templateParams["post"] = getEmptyPost();
}
*/




require 'template/base.php';
?>