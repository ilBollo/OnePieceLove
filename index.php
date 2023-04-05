<?php
require_once("bootstrap.php");

if (!isUserLoggedIn()) {
    $templateParams["titolo"] = "OnePieceLove   - Login";
    $templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js","js/login.js");
    require("template/login.php");
} else {
    header('Location: homepage.php');
}
?>