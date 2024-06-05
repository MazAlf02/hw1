<?php

    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }

    header('Content-Type: application/json');
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $query = "SELECT * FROM piufamosi";
    $result = mysqli_query($conn, $query);

    $notizie = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $notizie[] = $row;
    }
    mysqli_free_result($result);
    mysqli_close($conn);
    echo json_encode($notizie);
?>