<?php
require_once("bootstrap.php");

if (!isUserLoggedIn()) {
    $templateParams["titolo"] = "OnePieceLove   - Login";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","utils/functions.js","js/login.js");
    require("template/login.php");
} else {
    header('Location: homepage.php');
}
?>