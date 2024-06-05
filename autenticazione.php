<?php
    require_once 'dbconfig.php';
    session_start();

    function controlloAutenticazione() {
        if(isset($_SESSION['varSessioneIdUtente'])) {
            return $_SESSION['varSessioneIdUtente'];
        } else 
            return 0;
    }
?>