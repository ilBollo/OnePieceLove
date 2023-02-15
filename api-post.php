<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if (isset($_POST["idpost"]) && isset($_POST["likeValue"])) {
        $likeValue = $_POST["likeValue"];
        /**
         * Check if I have to update the database with the post data or insert a new line
         */
        if (count($dbh->checkReaction($_POST["idpost"], $_SESSION["iduser"])) > 0) {
            /**
             * Check if I have to remove or update I like
             */
            if ($dbh->checkReaction($_POST["idpost"], $_SESSION["iduser"])) {
                $result["updateLike"] = $dbh->removeLike($_POST["idpost"], $_SESSION["iduser"]);
                $result["isMyReaction"] = false;
            } else {
                $result["updateLike"] = $dbh->updateLike($likeValue, $_POST["idpost"], $_SESSION["iduser"]);
                $result["isMyReaction"] = true;
            }
        } else {
            $result["updateLike"] = $dbh->insertLike($_POST["idpost"], $_SESSION["iduser"], $likeValue);
            $result["isMyReaction"] = true;
        }
        $result["numLike"] = $dbh->countReactions($_POST["idpost"]);

        /**
         * Check if all went good and send a notification
         */
 //       if ($result["updateLike"]) {
 //           $userToNotify = $dbh->getUserByPost($_POST["idpost"]);
 //           $check = $dbh->checkCommentNotification($userToNotify[0]["username"]);
 //           if (count($check) != 0) {
 //               $dbh->insertNotification(date('Y-m-d H-i-s'), 1, $_SESSION["username"], $userToNotify[0]["username"]);
 //           }
 //       }
        /**
         * Update post number of like and dislike
         */
  //      $result["reactions"] = $dbh->getReactions($_POST["idpost"]);
  //      $result["numLike"] = count(array_filter($result["reactions"], function ($p) {
  //          return $p["likes"]; }));
    }
}

header('Content-Type: application/json');
echo json_encode($result);
?>