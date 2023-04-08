<?php
require_once 'bootstrap.php';
$templateParams["titolo"] = "OnePieceLove - Profilo";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",  "js/profilo.js", "js/profiloPost.js", "js/gestisciPost.js");
$templateParams["notifiche"] = $dbh->getNnotifAperte($_SESSION["iduser"]);
$templateParams["notificheDescr"] = $dbh->getDescrNotifAperte($_SESSION["iduser"]);
require 'template/base.php'
?>