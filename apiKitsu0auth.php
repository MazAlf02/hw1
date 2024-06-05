<?php
    require_once 'autenticazione.php';

    if (!controlloAutenticazione()) exit;
    
    header('Content-Type: application/json');
    
    function cercaManga() {
        $client_id = 'dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd';
        $client_secret = '54d7307928f63414defd96399fc31ba847961ceaecef3a5fd93144e960c0e151';
        $username = 'maz.alf02@gmail.com';
        $password = 'jkvb9856';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://kitsu.io/api/oauth/token');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'grant_type' => 'password',
            'username' => $username,
            'password' => $password
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
        $token_response = curl_exec($ch);
        if (curl_errno($ch)) {
            echo json_encode(['error' => curl_error($ch)]);
            curl_close($ch);
            exit;
        }
        curl_close($ch);
    
        $token_response = json_decode($token_response, true);
    
        $access_token = $token_response['access_token'];
    
        $titolo = urlencode($_GET['q']);
        $url = 'https://kitsu.io/api/edge/manga?filter[text]='.$titolo;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$access_token)); 
        $res = curl_exec($ch);
        curl_close($ch);
    
        echo $res;
    }

    cercaManga();
?>