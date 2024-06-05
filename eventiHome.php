<?php

    require_once 'dbconfig.php';

    header('Content-Type: application/json');
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 4;

    $query = "SELECT * FROM eventi LIMIT $limit";
    $result = mysqli_query($conn, $query);

    $notizie = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $notizie[] = $row;
    }
    mysqli_free_result($result);
    mysqli_close($conn);
    echo json_encode($notizie);
?>