<?php
require_once 'bootstrap.php';

$result["logineseguito"] = false;

if(isset($_POST["email"]) && isset($_POST["password"])){
    $login_result = $dbh->checkLogin($_POST["email"], $_POST["password"]);
    if(count($login_result)==0){
        //Login fallito
        $result["errorelogin"] = "Email e/o password errati";
    }
    else{
        registerLoggedUser($login_result[0]);
 
    }
}

if(isUserLoggedIn()){
    $result["logineseguito"] = true;
            ricordami($_POST["ricordami"], $_POST["email"], $_POST["password"]);
}

header('Content-Type: application/json');
echo json_encode($result);

        /**
         * setta i cookie se ricordi è ceccato
         */
        function ricordami(bool $ricordami, string $email, string $password)
        {
            if ($ricordami) {
                setcookie("email", $email, time() + 3600);
                setcookie("password", $password, time() + 3600);
            } else {//non funziona
                setcookie("email", "");
                setcookie("password", "");
            }
        }



?>