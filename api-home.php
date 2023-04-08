<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    $posts = $dbh->getPosts($_SESSION['iduser']);
    for ($i = 0; $i < count($posts); $i++) {
        $posts[$i]["immaginepost"] = UPLOAD_DIR . $posts[$i]["immaginepost"];
        $posts[$i]["miPiace"] = $dbh->checkReaction($posts[$i]["idpost"], $_SESSION["iduser"]);
        $posts[$i]["numLike"] = $dbh->countReactions($posts[$i]["idpost"]);
        $posts[$i]["idpersonaggio"] = UPLOAD_DIR.$posts[$i]["idpersonaggio"];
    }
} else {
    header(('Location: index.php'));
}
header('Content-Type: application/json');
echo json_encode($posts);
?>