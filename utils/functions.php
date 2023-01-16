<?php

function isActive($pagename){
    if (basename($_SERVER['PHP_SELF']) == $pagename) {
        echo " active ";
    }
}

function isUserLoggedIn(){
    // nel caso l'utente sia già loggato salvo il suo id in una variabile session predefinita
    if(!isset($_SESSION["EmailUser"]) && !empty($_COOKIE["ID_User"])){
        registerLoggedUser($_COOKIE["ID_User"]);
    }
    return isset($_SESSION['EmailUser']) || !empty($_COOKIE["ID_User"]);
}


function registerLoggedUser($user){
    $_SESSION["EmailUser"] = $user;
}

function rememberMe(string $name, $id, $time){
    setcookie($name, $id, time()+$time, '/');
}


function setLoginHome($section){
    $_SESSION["login-home"] = $section;
}


function removeImg($pathImg){
    unlink($pathImg);
}

function uploadImage($path, $image){
    $imageName = basename($image["name"]);
    $fullPath = $path . $imageName;

    $maxKB = 500;
    $acceptedExtensions = array("jpg", "jpeg", "png", "gif");
    $result = 0;
    $msg = "";
    //Controllo se immagine è veramente un'immagine
    $imageSize = getimagesize($image["tmp_name"]);
    if ($imageSize === false) {
        $msg .= "File caricato non è un'immagine! ";
    }
    //Controllo dimensione dell'immagine < 500KB
    if ($image["size"] > $maxKB * 1024) {
        $msg .= "File caricato pesa troppo! Dimensione massima è $maxKB KB. ";
    }

    //Controllo estensione del file
    $imageFileType = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
    if (!in_array($imageFileType, $acceptedExtensions)) {
        $msg .= "Accettate solo le seguenti estensioni: " . implode(",", $acceptedExtensions);
    }

    // creazione della cartella dove verranno salvate le immagini
    if(!is_dir($path)){
        if(!mkdir($path, 0755)){
            return [0,"percorso insesistente", $path];
        }
    }

    //Controllo se esiste file con stesso nome ed eventualmente lo rinomino
    if (file_exists($fullPath)) {
        $i = 1;
        do {
            $i++;
            $imageName = pathinfo(basename($image["name"]), PATHINFO_FILENAME) . "_$i." . $imageFileType;
        } while (file_exists($path . $imageName));
        $fullPath = $path . $imageName;
    }

    //Se non ci sono errori, sposto il file dalla posizione temporanea alla cartella di destinazione
    if (strlen($msg) == 0) {
        if (!move_uploaded_file($image["tmp_name"], $fullPath)) {
            $msg .= "Errore nel caricamento dell'immagine.";
        } else {
            $result = 1;
            $msg = $imageName;
        }
    }
    return array($result, $msg, $fullPath);
}

?>
