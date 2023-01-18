<?php
require_once("connection.php");

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/login.js");


if (isset($_GET["action"]) && !isUserLoggedIn()) {
    switch ($_GET["action"]) {
        case 'registrazione-utente':
            $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/form-registrazione.js");
        break;
    default:
        break;
    }
}


require("template/base.php");
?>