<?php
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }

    header('Content-Type: application/json');

    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $query = "SELECT fumetti.nome, count(carrello.id_fumetto) AS conta_fumetti, fumetti.prezzo, fumetti.id 
              FROM carrello JOIN fumetti ON carrello.id_fumetto = fumetti.id 
              WHERE id_utente = $user_id
              GROUP BY fumetti.nome, fumetti.prezzo";
    
    $result = mysqli_query($conn, $query);

    $carrello = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $carrello[] = $row;
    }
    
    mysqli_free_result($result);
    mysqli_close($conn);
    echo json_encode($carrello);
?>