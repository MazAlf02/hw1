<?php
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }


    header('Content-Type: application/json');

    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $id_fumetto = mysqli_real_escape_string($conn, $_POST['id_fumetto']);

    $query = "SELECT carrello.id_fumetto, count(carrello.id_fumetto) AS conta_fumetti FROM carrello WHERE id_utente = $user_id AND id_fumetto = $id_fumetto";
    $result = mysqli_query($conn, $query);

    $response = array();

    if (mysqli_num_rows($result) > 0) {
        $res = mysqli_fetch_assoc($result);
        $response['id_fumetto'] = $res['id_fumetto'];
        $response['conta_fumetti'] = $res['conta_fumetti'];
    }else{
        $response['error'] = "NON PRESENTE IN CARRELLO";
    }
    mysqli_close($conn);

    echo json_encode($response);
?>