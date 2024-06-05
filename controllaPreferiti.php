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
        echo "PRESENTE";
    }else{
        echo "NON PRESENTE";
    }

    mysqli_close($conn);
?>