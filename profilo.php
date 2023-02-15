<?php
require_once 'bootstrap.php';
$templateParams["titolo"] = "OnePieceLove - Profilo";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "utils/functions.js", "js/like.js", "js/profile_header.js");

require 'template/base.php'
?>