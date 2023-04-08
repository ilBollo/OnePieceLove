<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if(isset($_POST["idnotifica"])){
        $dbh->chiudiNotifica($_POST["idnotifica"]);
        $result["ok"] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>