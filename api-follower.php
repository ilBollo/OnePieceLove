<?php
require_once 'bootstrap.php';
$result['inserito'] = false;


if(isset($_POST["user"]) && isset($_POST["value"])){
    if($_POST["value"] == "true"){
        $result['inserito'] = $dbh->insertFollowed($_POST['user'], $_SESSION["iduser"]);
        $result['numFollower'] = count($dbh->getUserFollower($_POST["user"]));
        $result["aggiuntaNotifica"] = $dbh->insertNotifica(1,intval($_POST["user"]),$_SESSION["iduser"]);
    }
    else {
        $result['inserito'] = $dbh->removeFollowed($_POST['user'], $_SESSION["iduser"]);
        $result['numFollower'] = count($dbh->getUserFollower($_POST["user"]));
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>