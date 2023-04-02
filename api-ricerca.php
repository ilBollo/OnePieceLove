<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    $result = $dbh->trovaUtenti($_GET['nome_utente']);
} else {
    header(('Location: index.php'));
}
header('Content-Type: application/json');
echo json_encode($result);
?>