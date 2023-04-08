<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if(isset($_POST["follower"],$_POST["followed"])){
        $dbh->chiudiNotifica($_POST["follower"],$_POST["followed"]);
        $result["ok"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>