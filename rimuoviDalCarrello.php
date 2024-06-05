<?php
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }
    
    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $id_fumetto = mysqli_real_escape_string($conn, $_POST['id_fumetto']);
    
    $query = "DELETE FROM carrello WHERE id_utente = $user_id AND id_fumetto = $id_fumetto";
    $res = mysqli_query($conn, $query);
        if ($res) {
            echo "Fumetto rimosso dal carrello";
        } else {
            echo "Errore durante la rimozione del fumetto dal carrello: " . mysqli_error($conn);
        }

    mysqli_close($conn);
?>