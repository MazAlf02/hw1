<?php
    
    require_once 'autenticazione.php';

    if (!$user_id = controlloAutenticazione()){
        exit;
    }

    header('Content-Type: application/json');
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 4;

    $query = "SELECT * FROM fumetti WHERE data > curdate() LIMIT $limit OFFSET $offset";
    $result = mysqli_query($conn, $query);

    $fumetti = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $fumetti[] = $row;
    }

    mysqli_free_result($result);
    mysqli_close($conn);
    echo json_encode($fumetti);
?>