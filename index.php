<?php
require_once("connection.php");

/*if (isset($_GET["action"]) && !isUserLoggedIn()) {
    $templateParams["nome"] = "form-registrazione.php";
}*/

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/login.js");

require("template/base.php");
?>