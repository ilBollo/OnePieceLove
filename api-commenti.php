<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if(isset($_POST["idComment"],$_POST["idPost"])){
        $dbh->deletePostComment($_POST["idComment"]);
        $result["ok"] = true;
    }
    if (isset($_POST["idpost"]) && isset($_POST["comment"]) && isset($_POST["autore"])) {
        $dbh->aggiungiCommento($_POST["idpost"], $_SESSION["iduser"],$_POST["comment"]);
        $result["ok"] = true;
        $result["aggiuntaNotifica"] = $dbh->insertNotifica(2,intval($_POST["autore"]),$_SESSION["iduser"]);
    }
    if (isset($_POST["idpost"]) && !isset($_POST["comment"])) {
        $result = $dbh->getCommenti($_POST["idpost"]);
        for ($i = 0; $i < count($result); $i++) {
            $result[$i]["user"] = $_SESSION["iduser"];
            }
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>