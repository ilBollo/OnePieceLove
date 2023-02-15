<?php
session_start();
define("UPLOAD_DIR", "./res/");
require_once("utils/functions.php");
require_once("db/database.php");
require_once('utils/input.php');
$dbh = new DatabaseHelper("localhost", "root", "", "onepiece", 3306);
?>