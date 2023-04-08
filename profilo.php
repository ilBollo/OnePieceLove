<?php
require_once 'bootstrap.php';
$templateParams["titolo"] = "OnePieceLove - Profilo";
$templateParams["js"] = array("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",  "js/profilo.js", "js/profiloPost.js", "js/commenti.js");
require 'template/base.php'
?>