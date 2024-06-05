<?php
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }

    $user_id = $_SESSION["varSessioneIdUtente"];
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $nome_fumetto = mysqli_real_escape_string($conn, $_POST['nome_fumetto']);

    $query = "DELETE FROM ricerca WHERE id_utente =$user_id";

    if(!mysqli_query($conn, $query)){
        echo "Errore nella cancellazione della precedente ricerca: " . mysqli_error($conn);
        mysqli_close($conn);
        exit;
    }

    $query = "INSERT INTO ricerca (nome, id_utente) VALUES ('$nome_fumetto', $user_id)";
    $res = mysqli_query($conn, $query);
    if ($res) {
        echo "Ricerca inserita";
    } else {
        echo "Errore durante l'inserimento della ricerca: " . mysqli_error($conn);
    }

    mysqli_close($conn);
?>