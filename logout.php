<?php
require_once('bootstrap.php');

if(isUserLoggedIn()){

    unset($_SESSION['iduser'], $_SESSION['nickname']);
    setcookie("email", time() - 3600);
    setcookie("password", time() - 3600);
    session_destroy();
}

header('Location: ./index.php');
?>