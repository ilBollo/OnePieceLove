<?php
session_start();
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "onepiece", 3306);
define("UPLOAD_DIR", "./upload/")
?>