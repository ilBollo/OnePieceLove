<?php
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "onepiece", 3306);
define("UPLOAD_DIR", "./upload/")
?>