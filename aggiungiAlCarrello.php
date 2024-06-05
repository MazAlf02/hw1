<?php
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }
    
    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $id_fumetto = mysqli_real_escape_string($conn, $_POST['id_fumetto']);
    
    $query = "SELECT * FROM carrello WHERE id_utente = $user_id AND id_fumetto = $id_fumetto";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $quantita = mysqli_num_rows($result) + 1;
        $query = "INSERT INTO carrello (id_fumetto, id_utente) VALUES ($id_fumetto, $user_id)";
        mysqli_query($conn, $query);
        echo strval($quantita);
    } else {
        $query = "INSERT INTO carrello (id_fumetto, id_utente) VALUES ($id_fumetto, $user_id)";
        mysqli_query($conn, $query);
        echo "1";
    }
    
    mysqli_close($conn);
?>
