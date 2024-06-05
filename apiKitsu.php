<?php
    require_once 'autenticazione.php';

    if (!controlloAutenticazione()) exit;

    header('Content-Type: application/json');

    function cercaManga() {
        $titolo = urlencode($_GET['q']);
        $url = 'https://kitsu.io/api/edge/manga?filter[text]='.$titolo;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $res = curl_exec($ch);
        curl_close($ch);

        echo $res;
    }

    cercaManga();
?>

