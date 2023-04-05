<?php
session_start();
define("UPLOAD_DIR", "./res/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "onepiece2", 3306);
?>