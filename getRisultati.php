<?php

require_once 'autenticazione.php';

if (!$user_id = controlloAutenticazione()) {
    exit;
}

$user_id = $_SESSION["varSessioneIdUtente"];
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}

$query = "SELECT fumetti.id, fumetti.immagine, fumetti.nome, fumetti.data, fumetti.prezzo FROM fumetti 
          JOIN ricerca ON fumetti.nome LIKE CONCAT('%', ricerca.nome, '%')  
          WHERE ricerca.id_utente = $user_id";

$result = mysqli_query($conn, $query);

if (!$result) {
    die("Errore nella query: " . mysqli_error($conn));
}

$preferiti = array();
while ($row = mysqli_fetch_assoc($result)) {
    $preferiti[] = $row;
}

mysqli_free_result($result);
mysqli_close($conn);

echo json_encode($preferiti);

?>
