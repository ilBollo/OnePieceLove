<?php
require_once 'bootstrap.php';

$result['loggedIn'] = false;

if (!isUserLoggedIn()) {
    $result['errorMsg'] = "";
    if (isset($_POST['checkNickname'])) {
        $result['valid'] = false;
        $nickname = Input::filter_string($_POST['checkNickname']);
        if (!empty($nickname)) {
            if (count($dbh->cercaAccountByNickname($nickname)) != 0) {
                $result['errorMsg'] = 'Nickname già utilizzato';
            } else {
                $result['valid'] = true;
            }
        } else {
            $result['errorMsg'] = 'NickName obbligatorio';
        }
    }
    else if(empty($result['errorMsg'])){
        $dbh->insertAccount($_POST['email'], $_POST['nome'], $_POST['cognome'], $_POST['data_nascita'], $_POST['telefono'], $_POST['nickname'], $_POST['password'], $_POST['personaggio']);
        $result['loggedIn'] = true;
    }
}
      
 else {
    header('Location: homepage.php');
}

header('Content-Type: application/json');
echo json_encode($result);