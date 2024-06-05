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
    ?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>h1</title>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" />
    <link rel="stylesheet" href="home5.css"/>
    <script src="home1.js" defer></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
</head>
<body>


    <section>
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
    </section>


    <nav>
        <div id="navigazione">
            <div id="containertasti">
                <a>Benvenuto <strong><?php echo $userinfo['username']; ?></strong></a>
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
    
    <header>
        <div id="immagineprimopiano">
            <div id="overlayannuncio">
                <p></p>
            </div>
        </div>
        <div id="selettorenews">
        </div>
    </header>

    <section>
        <div id="ultimeuscite">
            <p>ULTIME USCITE</p>
        </div>

        <div id="frecceMobileUU">
            <div id="contenitoreFrecceUU">
                <div data-moveU="indietroM" class="avantiIndietroUltimeUsciteMobile">
                    <img src="Images/arrowleft.png"/>
                </div>
                <div data-moveU="avantiM" class="avantiIndietroUltimeUsciteMobile">
                    <img src="Images/arrowright.png"/>
                </div>
            </div>
        </div>

        <div id="elencoultimeuscite">
            <div class="fumettiUltimeUscite">
                <div data-moveU="indietro" class="avantiIndietroUltimeUscite">
                    <img src="Images/arrowleft.png"/>
                </div>

                <div class="containerFumetti"></div>

                <div data-moveU="avanti" class="avantiIndietroUltimeUscite">
                    <img src="Images/arrowright.png"/>
                </div>
            </div>
        </div>
    </section>  

    <section>
        <div id="containerMappa">
            <div id="avvisoMappa">
                <h3>Trova i nostri</h3><h3>punti vendita</h3><h3>autorizzati</h3>
            </div>
            <div class="containerZoomMappa">
                <button id="zoomAvanti">+</button>
                <button id="zoomIndietro">-</button>
            </div>
            <div id="mappa">
            </div>
        </div>
    </section>

    <article>
    <section>
        <div class="piufamosi">
            <img src="" class="imm1"/>
            <img src="" class="imm2"/>
        </div>
        
        <div class="piufamosi">
                <img src="" class="imm1"/>
                <img src="" class="imm2">
        </div>
        
        <div class="piufamosi">
                <img src="" class="imm1"/>
                <img src="" class="imm2"/>
        </div>
        
        <div class="piufamosi">
                <img src="" class="imm1"/>
                <img src="" class="imm2"/>
        </div>
        
        <div id="piufamosifinale1">
                <img src=""/>
        </div>

        <div id="piufamosifinale2">
                <img src="Images/digistar-540x215-1.jpg"/>
                <img src="Images/anteprima-540x215.jpg"/>
        </div>

    </section>
    <section>
        <div id="eventi">
            <p>EVENTI</p>
        </div>
        <div class="eventinotizie">
            <div class="blocco">
                <div class="immagineEvento">
                    <img src=""/>
                </div>
                <div class="notizia1">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="blocco">
                <div class="immagineEvento">
                    <img src=""/>
                </div>
                <div class="notizia1">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
        </div>
        <div class="eventinotizie">
            <div class="blocco">
                <div class="immagineEvento">
                    <img src=""/>
                </div>
                <div class="notizia1">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
            <div class="blocco">
                <div class="immagineEvento">
                    <img src=""/>
                </div>
                <div class="notizia1">
                    <h4></h4>
                    <p></p>
                </div>
            </div>
        </div>
        <div id="altrieventi">
            <div id="tasto" >
                <a href="tuttiGliEventi.php"><p>Vedi tutti gli eventi</p></a>
            </div>
        </div>
    </section>
    </article>
    <section>
        <div id="prossimeuscite">
            <p>PROSSIME USCITE</p>
        </div>

        <div id="frecceMobilePU">
            <div id="contenitoreFreccePU">
                <div data-moveP="indietroM" class="avantiIndietroProssimeUsciteMobile">
                    <img src="Images/arrowleft.png"/>
                </div>
                <div data-moveP="avantiM" class="avantiIndietroProssimeUsciteMobile">
                    <img src="Images/arrowright.png"/>
                </div>
            </div>
        </div>

        <div id="elencoprossimeuscite">
            <div class="fumettiProssimeUscite">
                <div data-moveP="indietro" class="avantiIndietroProssimeUscite">
                    <img src="Images/arrowleft.png"/>
                </div>
                
                <div class="containerFumettiProssimeUscite"></div>

                <div data-moveP="avanti" class="avantiIndietroProssimeUscite">
                    <img src="Images/arrowright.png"/>
                </div>
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