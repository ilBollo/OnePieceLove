<?php
require_once 'bootstrap.php';

$result['inserito'] = false;
$imgpost = $_FILES['immaginePost'];

if(isset($imgpost)){
   list($response,$msg) = uploadImage(UPLOAD_DIR,$imgpost);
   $percorso = $msg;
}



$result['inserito'] = $dbh->insertPost($_POST['titolo'], $_POST['anteprimapost'], $_POST['testo'], date("Y-m-d"), $percorso, $_SESSION["iduser"]);

header('Content-Type: application/json');
echo json_encode($result);
?>