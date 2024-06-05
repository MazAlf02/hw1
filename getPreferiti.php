<?php

    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }

    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $query = "SELECT * FROM fumetti JOIN preferiti on fumetti.id = preferiti.id_fumetto WHERE id_utente = $user_id";
    $result = mysqli_query($conn, $query);

    $preferiti = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $preferiti[] = $row;
    }
    mysqli_free_result($result);
    mysqli_close($conn);
    echo json_encode($preferiti);
?>