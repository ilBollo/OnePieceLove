<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if (isset($_POST["idpost"]) && isset($_POST["autore"])) {
        if ($dbh->checkReaction($_POST["idpost"], $_SESSION["iduser"])) {
                $result["updateLike"] = $dbh->removeLike($_POST["idpost"], $_SESSION["iduser"]);
                $result["isMyReaction"] = false;
            
        } else {
            $result["updateLike"] = $dbh->insertLike($_POST["idpost"], $_SESSION["iduser"]);
            $result["isMyReaction"] = true;
            $result["aggiuntaNotifica"] = $dbh->insertNotifica(3,$_SESSION["iduser"], intval($_POST["autore"]));
        }
        $result["numLike"] = $dbh->countReactions($_POST["idpost"]);
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>