<?php
require_once 'bootstrap.php';
$templateParams["titolo"] = "OnePieceLove - Profilo";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js",  "js/profilo.js", "js/profiloPost.js", "js/like.js");

require 'template/base.php'
?>