<?php
require_once 'bootstrap.php';

    $personaggi = $dbh->getPersonaggi();
    header('Content-Type: application/json');
    echo json_encode($personaggi);

?>