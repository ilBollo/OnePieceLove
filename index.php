<?php
require_once("connection.php");

$templateParams["nome"] = "index.php";

if (isset($_POST["EmailUser"]) && isset($_POST["PasswordUser"]) && !isUserLoggedIn()) {
    $login_result = $dbh->checkUserLogin($_POST["EmailUser"]);
    if (count($login_result) > 0) {
        $pwd_db = $login_result[0]["Password"];
        $usr_input = $_POST["PasswordUser"];
        // controllo se la password coincida con quella salvata nel db
        if (!password_verify($usr_input, $pwd_db)) {
            $templateParams["errorelogin"] = "Errore! Controllare username o password!";
        } else {
            registerLoggedUser($login_result[0]["Email"]);
            if(isset($_POST["remember"])){
                $LifeTime = 2592000; // Coockie attivo per 30 giorni
                rememberMe("ID_User", $_POST["EmailUser"], $LifeTime);
            }
        }
    } else {
        $templateParams["errorelogin"] = "Errore! Controllare username o password!";
    }
} 


setLoginHome("login-form.php");

if (isUserLoggedIn() && count($ris = $dbh->getUserInfo($_SESSION["EmailUser"]))>0) {
    //reperimento delle informazioni dell'utente
    $templateParams["info-utente"] = $ris[0];
    $templateParams["info-utente"]["Notifiche"] = $dbh->getPreviewUserNotification($_SESSION["EmailUser"]);

    setDefaultLoginHome();

    //aggiornamento section in base all'azione richiesta
    if (isset($_GET["action"])) {
        switch ($_GET["action"]) {
            case 'logout':
                rememberMe("ID_User", "", -1); // elimino il cookie
                unset($_SESSION["EmailUser"]);
                header("location: login.php");
                return;
            default:
                break;
        }
    }
} else {
    rememberMe("ID_User", "", -1); // elimino il cookie
    if(isset($_SESSION["EmailUser"])){
        unset($_SESSION["EmailUser"]);
    }
}

if (isset($_GET["action"]) && !isUserLoggedIn()) {
    $templateParams["nome"] = "form-registrazione.php";
}

$templateParams["home"] = $_SESSION["login-home"];

require("template/base.php");
?>