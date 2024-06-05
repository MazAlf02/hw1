<?php 
    require_once 'autenticazione.php';
    if(!$userid = controlloAutenticazione()){
        header("Location: login.php");
        exit;
    }
?>


<!DOCTYPE html>
<html lang="en">
    <?php 
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = mysqli_real_escape_string($conn, $userid);

        $query = "SELECT * FROM utenti WHERE id = $userid";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1);

        $query_2 = "SELECT * FROM ricerca WHERE id_utente = $userid";
        $res_2 = mysqli_query($conn, $query_2);
        $ricercainfo = mysqli_fetch_assoc($res_2);
    ?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="ricercaRisultati.css" />
    <script src="ricercaRisultati.js" defer></script>
    <title>Ricerca</title>
</head>
<body>
    
    <div id="sezioneRicerca" class="hidden">
        <div id="boxRicerca">
            <div id="containerRicerca">
                <div id="barraRicerca">
                    <input type="text" id="ricercaInput" placeholder="Inserire il titolo di un manga">
                </div>
                <div id="pulsantiRicerca">
                    <p id="avviaRicerca">Cerca</p>
                    <p id="chiudiRicerca">X</p>
                </div>
            </div>

            <div id=contenitoreR></div>
            
        </div>
    </div>

    <div id="containerCarrello" class="hidden">
        <div class="containerMessaggioCarrello">
            <div class="messaggioAggiuntaCarrello">
                <p>Prodotto aggiunto al carrello</p>
                <img src="Images/icons8-done-50.png"/>
            </div>
        </div>
    </div> 

    <nav>
        <div id="navigazione">
            <div id="containertasti">
                <a>Benvenuto <strong><?php echo $userinfo['username']; ?></strong></a>
                <a href="home.php" class="nav1sel">Home</a>
                <a href="preferiti.php" class="nav1sel">Preferiti</a>
                <a href="carrello.php" class="nav1sel">Carrello</a>
                <a href="logout.php" class="nav1sel">Logout</a>
            </div>
        </div>
        <div id="logostar">
            <div id="bloccoImmagine">
                <a href="home.php"><img src="Images/logo_starcomics_2021.png"/></a>
            </div>
        </div>
        <div id="navigazione2">
            <div id="containertastinav2">
                <a>NEWS</a>
                <a>ULTIME USCITE</a>
                <a>SHOP</a>
                <a>CATALOGO</a>
                <a>SFOGLIA ONLINE</a>
                <a>DIGISTAR</a>
                <a data-cambiaTesto="#STAR">#ILOVEMANGA</a>
                <a data-cambiaTesto="#ASTRA">#ILOVECOMICS</a>
                <a id="tastoLente"><img src="Images/lente ricerca.png"/></a>
            </div>
        </div>
    </nav>    
    
        <section>
            <span class = "ricercaScritta">
                <p><?php echo $ricercainfo['nome'];?></p>
            </span>
            
            <div class="containerCentrale">
                <div id="nessunFumetto">
                    <h2>Opera non edita da Starcomics e quindi non presente nel catalogo</h2>
                </div>
            </div>

        </section>
    

    <footer>
        <div id="footer1">
            <div id="edizionistarcomics">
                <h4>EDIZIONI STAR COMICS</h4>
                <p>Edizioni Star Comics s.r.l. strada delle Selvette,<br/> 1/bis/1 - 06134 Bosco (Perugia)<br/>
                    P.IVA 03850300546<br/>
                    Tel. <a>+39 075 591 8353</a> - per informazioni<br/><a>info@starcomics.com</a>, per informazioni sugli<br/>acquisti <a>acquistaonline@starcomics.com</a></p>
            </div>
            <div class="brandaltro">
                <h4>BRAND</h4>
                <a>Info acquisti</a>
                <a>Contattaci</a>
                <a>Condizioni</a>
            </div>
            <div class="brandaltro">
                <h4>ALTRO</h4>
                <a>News</a>
                <a>Eventi</a>
                <a>Iscriviti alla newsletter</a>
            </div>
        </div>
        <div id="footer2">
            <div id="containercopyright">
                <p>Copyright © 2024 Edizioni Star Comics | Design by IT-AL | Privacy Policy | Cookie Policy</p>
            </div>
            <div id="containercopyrightimg">
                
            </div>
        </div>
    </footer>
</body>
</html>