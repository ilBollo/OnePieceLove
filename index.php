<?php
require_once("connection.php");

if (!isUserLoggedIn()) {
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/login.js");
    require("template/base.php");
} else {
    header('Location: homepage.php');
}
/* ($_GET["action"]) {
    case 'registrazione-utente':
        $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/form-registrazione.js");
    break;
*/

?>