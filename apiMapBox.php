<?php
    header('Content-Type: application/json');

    function fetchMapBox() {
        $accessToken = 'pk.eyJ1IjoiYWxmcmVkMjQwOSIsImEiOiJjbHZyNTRnZG8wb2pyMnFxenZlZnhqbG81In0.j0_ZqH_3Vl1-WTHPPL9vdw';
        $url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/star-shop.json?country=IT&access_token=' . $accessToken;
    
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($curl);
        curl_close($curl);
    
        echo $response;
    }
    
    fetchMapBox();
?>