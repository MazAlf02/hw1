<?php
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }

    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $id_fumetto = mysqli_real_escape_string($conn, $_POST['id_fumetto']);

    $query = "SELECT * FROM preferiti WHERE id_utente = $user_id AND id_fumetto = $id_fumetto";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {

        $query = "DELETE FROM preferiti WHERE id_utente = $user_id AND id_fumetto = $id_fumetto";
        $res = mysqli_query($conn, $query);
        if ($res) {
            echo "Fumetto rimosso";
        } else {
            echo "Errore durante la rimozione del fumetto dai preferiti: " . mysqli_error($conn);
        }
    } else {
        $query = "INSERT INTO preferiti (id_utente, id_fumetto) VALUES ($user_id, $id_fumetto)";
        $res = mysqli_query($conn, $query); 
        if ($res) {
            echo "Fumetto aggiunto";
        } else {
            echo "Errore durante l'aggiunta del fumetto ai preferiti: " . mysqli_error($conn);
        }
    }

    mysqli_close($conn);
?>