//Funzioni

function creaImmagine(src) {
    const immagine = document.createElement('img');
    immagine.src = src;
    return immagine;
  }

function sottolineaIn(event){
    const a = event.currentTarget;
    a.classList.add('sottolinea');
}

function sottolineaOut(event){
    const a = event.currentTarget;
    a.classList.remove('sottolinea');
}

function evidenziaNavIn(event) {
    const a = event.currentTarget;
    const cambiaTesto = a.getAttribute('data-cambiaTesto');
    if (cambiaTesto !== null) {
        const testoOriginale = a.textContent;
        const width = a.offsetWidth;
        a.textContent = cambiaTesto;
        a.style.width = width + 'px';
        a.setAttribute('data-testoOriginale', testoOriginale);
    }
    a.classList.add('nav2bg');
}

function evidenziaNavOut(event) {
    const a = event.currentTarget;
    const testoOriginale = a.getAttribute('data-testoOriginale');
    if (testoOriginale !== null) {
        a.textContent = testoOriginale;
        a.removeAttribute('data-testoOriginale');
    }
    a.classList.remove('nav2bg');
    a.style.width = '';
}

//Gestione schermo news

let intervalloCambioAutomatico;
let prossimoIndice = 0;

function impostaImmaginePrincipale(i, json) {
    const immaginePrincipale = document.querySelector('div#immagineprimopiano');
    const overlay = document.querySelector('#overlayannuncio p');
    
    const news = json[i];

    overlay.textContent = news.overlay;
    immaginePrincipale.style.backgroundImage = 'url(' + news.immaginePrimoPiano + ')';
}

function togliOpacita(immagine) {
    const altreImm = document.querySelectorAll('div#selettorenews img');
    for (const img of altreImm) {
        img.classList.remove('NoOpaco');
    }
    immagine.classList.add('NoOpaco');
}

function trovaImmagineSuccessiva(indice) {
    const immagini = document.querySelectorAll('div#selettorenews img');
    return immagini[indice];
}

function immagineSuccessiva(json) {
    prossimoIndice = (prossimoIndice + 1) % json.length;
    impostaImmaginePrincipale(prossimoIndice, json);
    togliOpacita(trovaImmagineSuccessiva(prossimoIndice));
}

function iniziaCambioAutomatico(json) {
    intervalloCambioAutomatico = setInterval(function(){ immagineSuccessiva(json) }, 4000);
}

function resetTimer(json) {
    clearInterval(intervalloCambioAutomatico);
    iniziaCambioAutomatico(json);
}

function avviaCambioAutomatico(json) {
    iniziaCambioAutomatico(json);
    const selettoreNews = document.querySelectorAll('div#selettorenews img');
    for (const img of selettoreNews) {
        img.addEventListener('click', function() {
            prossimoIndice = Array.from(selettoreNews).indexOf(img);
            impostaImmaginePrincipale(prossimoIndice, json);
            togliOpacita(img);
            resetTimer(json);
        });
    }
}

function onResponseSchermoNews(response) {
    return response.json();
}

function onJsonSchermoNews(json) {
    const selettoreNews = document.querySelector('div#selettorenews');
    const overlay = document.querySelector('div#overlayannuncio p');
    const primaImmBackground = document.querySelector('div#immagineprimopiano');
    
    const primaNews = json[0];

    overlay.textContent = primaNews.overlay;
    primaImmBackground.style.backgroundImage = 'url(' + primaNews.immaginePrimoPiano + ')';

    for (let i = 0; i < json.length; i++) {
        const news = json[i];
        const foto = news.immagineCover;
        const immagine = creaImmagine(foto);
        selettoreNews.appendChild(immagine);
    }

    const primaImmNoOpaca = document.querySelector('div#selettorenews img');
    primaImmNoOpaca.classList.add('NoOpaco');

    avviaCambioAutomatico(json);
}

function impostaSchermoNews() {
    fetch('schermoNews.php').then(onResponseSchermoNews).then(onJsonSchermoNews);
}

//...

function passaggioMouseIn(event){
    const altriEventiBottone = event.currentTarget;
    altriEventiBottone.classList.add('passaggioMouse');
}

function passaggioMouseOut(event){
    const altriEventiBottone = event.currentTarget;
    altriEventiBottone.classList.remove('passaggioMouse');
}

function evidenziaBottoneIn(event){
    const avantiIndietro = event.currentTarget;
    avantiIndietro.classList.add('avantiIndietroEvidenziato');
}

function evidenziaBottoneOut(event){
    const avantiIndietro = event.currentTarget;
    avantiIndietro.classList.remove('avantiIndietroEvidenziato');
}

//CONTROLLA PREFERITI (ESPERIMENTO)

function onResponseControllaPreferiti(response){
    return response.text();
}

function onTextControllaPreferiti(text, imgCuore){
    if(text === "PRESENTE"){
        imgCuore.src = 'Images/heart-full.png';
    }else if(text === "NON PRESENTE"){
        imgCuore.src = 'Images/heart.png';
    }
}

function onErrorControllaPreferiti(error){
    console.error("Si è verificato un errore: " + error);
}

function controllaPreferiti(img){
    const imgCuore = img;
    const idFumetto = imgCuore.getAttribute('data-id-fumetto');

    const formData = new FormData();
    formData.append('id_fumetto', idFumetto);

    fetch('controllaPreferiti.php',{
        method: 'POST',
        body: formData}
    ).then(onResponseControllaPreferiti).then(function(text){
        onTextControllaPreferiti(text, imgCuore)}).catch(onErrorControllaPreferiti);
}

//Gestione preferiti

function onResponsePreferiti(response){
    return response.text();
}

function onTextPreferiti(text, imgCuore){
    if(text === 'Fumetto aggiunto'){
        imgCuore.src = 'Images/heart-full.png';
    }else if(text === 'Fumetto rimosso'){
        imgCuore.src = 'Images/heart.png';
    }
}

function onErrorPreferiti(error){
    console.error("Si è verificato il seguente errore: " + error);
}

function gestisciPreferiti(event){
    const imgCuore = event.currentTarget;
    const idFumetto = imgCuore.getAttribute('data-id-fumetto');

    const formData = new FormData();
    formData.append('id_fumetto', idFumetto);

    fetch('gestionePreferiti.php', {
        method: 'POST',
        body: formData}
    ).then(onResponsePreferiti).then(function(text){onTextPreferiti(text, imgCuore)}).catch(onErrorPreferiti);
}

//CONTROLLA CARRELLO

function onResponseControllaCarrello(response){
    return response.json();
}

function onJsonControllaCarrello(json, img){
    const info = json;
    const imgCarrello = img;

    if(info.id_fumetto && info.conta_fumetti){
        let container = imgCarrello.parentElement;
        container.removeChild(imgCarrello);

        const cerchio = document.createElement('div');
        cerchio.classList.add('quantitaCarrello');

        cerchio.setAttribute('data-id-fumetto', imgCarrello.getAttribute('data-id-fumetto'));

        container.appendChild(cerchio);

        const p = document.createElement('p');
        p.textContent = info.conta_fumetti;
        cerchio.appendChild(p);

        cerchio.addEventListener('click', gestisciCarrello);
    }else{
        imgCarrello.src = 'Images/blue.png';
        imgCarrello.addEventListener('click', gestisciCarrello);
    }
}


function onErrorControllaCarrello(error) {
    console.error('Error:', error);
}

function controllaCarrello(img){
    const imgCarrello = img;
    const idFumetto = imgCarrello.getAttribute('data-id-fumetto');

    const formData = new FormData();
    formData.append('id_fumetto', idFumetto);

    fetch('controllaCarrello.php',{
        method: 'POST',
        body: formData}
    ).then(onResponseControllaCarrello).then(function(json){onJsonControllaCarrello(json, imgCarrello)}).catch(onErrorControllaCarrello);
}

//GESTISCI CARRELLO

function onResponseCarrello(response){
    return response.text();
}

function onTextCarrello(text, imgCarrello){
    let container = imgCarrello.parentElement;
    container.removeChild(imgCarrello);

    const cerchio = document.createElement('div');
    cerchio.classList.add('quantitaCarrello');

    cerchio.setAttribute('data-id-fumetto', imgCarrello.getAttribute('data-id-fumetto'));

    container.appendChild(cerchio);

    const p = document.createElement('p');
    p.textContent = text;
    cerchio.appendChild(p);

    cerchio.addEventListener('click', gestisciCarrello);
}

function onErrorCarrello(error) {
    console.error('Error:', error);
}

let intervalloCarrello;

function rimuoviAvvisoAggiuntaCarrello(container){
    container.classList.add('hidden');
}

function gestisciCarrello(event){
    const containerCarrello = document.querySelector("div#containerCarrello");
    containerCarrello.classList.remove('hidden');
    clearInterval(intervalloCarrello);
    intervalloCarrello = setInterval(function(){rimuoviAvvisoAggiuntaCarrello(containerCarrello)}, 3000);

    const imgCarrello = event.currentTarget;
    const idFumetto = imgCarrello.getAttribute('data-id-fumetto');

    const formData = new FormData();
    formData.append('id_fumetto', idFumetto);

    fetch('aggiungiAlCarrello.php', {
        method: 'POST',
        body: formData
    }).then(onResponseCarrello)
    .then(function(text){ onTextCarrello(text, imgCarrello) })
    .catch(onErrorCarrello);
}

//PROVA ULTIME USCITE DINAMICO

function onResponseUltimeUscite(response){
    return response.json();
}

function onJsonUltimeUscite(json) {
    const container = document.querySelector('div.containerFumetti');

    container.innerHTML = '';

    for(let i = 0; i < json.length; i++){

        const fumettoCorrente = json[i];

        const fumettoDiv = document.createElement('div');
        fumettoDiv.classList.add('fumetto');

        const immFumettoDiv = document.createElement('div');
        immFumettoDiv.classList.add('immFumetto');

        const imgFumetto = document.createElement('img');
        imgFumetto.src = fumettoCorrente.immagine;
        immFumettoDiv.appendChild(imgFumetto);

        const nomeFumettoDiv = document.createElement('div');
        nomeFumettoDiv.classList.add('nomeFumetto');

        const nomeFumettoH4 = document.createElement('h4');
        nomeFumettoH4.textContent = fumettoCorrente.nome;
        nomeFumettoDiv.appendChild(nomeFumettoH4);

        const dataFumettoDiv = document.createElement('div');
        dataFumettoDiv.classList.add('dataFumetto');

        const dataFumettoP = document.createElement('p');
        dataFumettoP.textContent = fumettoCorrente.data;
        dataFumettoDiv.appendChild(dataFumettoP);

        const prezzoFumettoDiv = document.createElement('div');
        prezzoFumettoDiv.classList.add('prezzoFumetto');

        const prezzoCarrelloDiv1 = document.createElement('div');
        prezzoCarrelloDiv1.classList.add('prezzoCarrello');

        const prezzoCarrelloH4 = document.createElement('h4');
        prezzoCarrelloH4.innerHTML = "€" + " " + '<strong>' + fumettoCorrente.prezzo + '</strong>';
        prezzoCarrelloDiv1.appendChild(prezzoCarrelloH4);

        const prezzoCarrelloDiv2 = document.createElement('div');
        prezzoCarrelloDiv2.classList.add('prezzoCarrello');

        const imgCarrello = document.createElement('img');
        imgCarrello.classList.add('aggiungiCarrello');
        imgCarrello.setAttribute('data-id-fumetto', fumettoCorrente.id);
        imgCarrello.addEventListener('click', gestisciCarrello);

        controllaCarrello(imgCarrello);

        const imgCuore = document.createElement('img');
        imgCuore.classList.add('aggiungiPreferiti');
        imgCuore.setAttribute('data-id-fumetto', fumettoCorrente.id);
        imgCuore.addEventListener('click', gestisciPreferiti);

        controllaPreferiti(imgCuore);


        prezzoCarrelloDiv2.appendChild(imgCuore);
        prezzoCarrelloDiv2.appendChild(imgCarrello);

        
        prezzoFumettoDiv.appendChild(prezzoCarrelloDiv1);
        prezzoFumettoDiv.appendChild(prezzoCarrelloDiv2);

        fumettoDiv.appendChild(immFumettoDiv);
        fumettoDiv.appendChild(nomeFumettoDiv);
        fumettoDiv.appendChild(dataFumettoDiv);
        fumettoDiv.appendChild(prezzoFumettoDiv);

        container.appendChild(fumettoDiv);
    }
}

function onErrorUltimeUscite(error){
    console.error(error);
}

function impostaUltimeUscite(offset){
    fetch('ultimeUsciteFumetti.php?offset=' + offset + '&limit=' + limit).then(onResponseUltimeUscite).then(onJsonUltimeUscite).catch(onErrorUltimeUscite);
}

function cambiaPaginaUltimeUscite(event){
    const tasto = event.currentTarget;
    const direzione = tasto.getAttribute('data-moveU');
    const resetFreccia = document.querySelectorAll('[data-moveU]');
    for (const freccia of resetFreccia){
        freccia.classList.remove('avantiIndietroScomparsa');
    }

    if(direzione === 'avanti' || direzione === 'avantiM'){
        if(currentOffset < 4){
            currentOffset = currentOffset + limit;
            impostaUltimeUscite(currentOffset);
            tasto.classList.add('avantiIndietroScomparsa');
        }
    }else{
        if(currentOffset > 0){
            currentOffset = currentOffset - limit;
            impostaUltimeUscite(currentOffset);
            tasto.classList.add('avantiIndietroScomparsa');
        }
    }
}


//Più famosi

function onResponsePiuFamosi(response){
    return response.json();
}

function onJsonPiuFamosi(json){
    const piuFamosi = document.querySelectorAll("div.piufamosi");

    for(let i = 0; i < json.length; i++){
        if(i < piuFamosi.length){
            const piuFamoso = json[i];
            const casellaCorrente = piuFamosi[i];

            const immagine1 = casellaCorrente.querySelector("img.imm1");
            immagine1.src = piuFamoso.immagine1;
            
            const immagine2 = casellaCorrente.querySelector("img.imm2");
            immagine2.src = piuFamoso.immagine2;
        }
    }
}

function onErrorPiuFamosi(error){
    console.error(error);
}

function impostaPiuFamosi(){
    fetch("getPiuFamosi.php").then(onResponsePiuFamosi).then(onJsonPiuFamosi).catch(onErrorPiuFamosi);
}

//Più famosi finale 1

function onResponsePiuFamosiFinale1(response){
    return response.json();
}

function onJsonPiuFamosiFinale1(json){
    const piuFamosiFinale1 = document.querySelector("div#piufamosifinale1");

    const piuFamosoFinale1 = json[0];
    
    const immagine = piuFamosiFinale1.querySelector("img");
    immagine.src = piuFamosoFinale1.immagine;
}

function onErrorPiuFamosiFinale1(error){
    console.error(error);
}

function impostaPiuFamosiFinale1(){
    fetch("getPiuFamosiFinale1.php").then(onResponsePiuFamosiFinale1).then(onJsonPiuFamosiFinale1).catch(onErrorPiuFamosiFinale1);
}

//ESPERIMENTO CAMBIO PROSSIME USCITE DINAMICO

function onResponseProssimeUscite(response){
    return response.json();
}

function onJsonProssimeUscite(json) {
    const container = document.querySelector('.containerFumettiProssimeUscite');

    container.innerHTML = ''; // Pulisce il contenuto precedente

    for(let i = 0; i < json.length; i++){

        const fumettoCorrente = json[i];

        const fumettoDiv = document.createElement('div');
        fumettoDiv.classList.add('fumetto');

        const immFumettoDiv = document.createElement('div');
        immFumettoDiv.classList.add('immFumetto');

        const imgFumetto = document.createElement('img');
        imgFumetto.src = fumettoCorrente.immagine;
        immFumettoDiv.appendChild(imgFumetto);

        const nomeFumettoDiv = document.createElement('div');
        nomeFumettoDiv.classList.add('nomeFumetto');

        const nomeFumettoH4 = document.createElement('h4');
        nomeFumettoH4.textContent = fumettoCorrente.nome;
        nomeFumettoDiv.appendChild(nomeFumettoH4);

        const dataFumettoDiv = document.createElement('div');
        dataFumettoDiv.classList.add('dataFumetto');

        const dataFumettoP = document.createElement('p');
        dataFumettoP.textContent = fumettoCorrente.data;
        dataFumettoDiv.appendChild(dataFumettoP);

        const prezzoFumettoDiv = document.createElement('div');
        prezzoFumettoDiv.classList.add('prezzoFumetto');

        const prezzoCarrelloDiv1 = document.createElement('div');
        prezzoCarrelloDiv1.classList.add('prezzoCarrello');

        const prezzoCarrelloH4 = document.createElement('h4');
        prezzoCarrelloH4.innerHTML = "€" + " " + '<strong>' + fumettoCorrente.prezzo + '</strong>';
        prezzoCarrelloDiv1.appendChild(prezzoCarrelloH4);

        const prezzoCarrelloDiv2 = document.createElement('div');
        prezzoCarrelloDiv2.classList.add('prezzoCarrello');

        const imgCarrello = document.createElement('img');
        imgCarrello.classList.add('aggiungiCarrello');
        imgCarrello.setAttribute('data-id-fumetto', fumettoCorrente.id);
        imgCarrello.addEventListener('click', gestisciCarrello);

        controllaCarrello(imgCarrello);

        const imgCuore = document.createElement('img');
        imgCuore.classList.add('aggiungiPreferiti');
        imgCuore.dataset.idFumetto = fumettoCorrente.id;
        imgCuore.addEventListener('click', gestisciPreferiti);

        controllaPreferiti(imgCuore);

        prezzoCarrelloDiv2.appendChild(imgCuore);
        prezzoCarrelloDiv2.appendChild(imgCarrello);
        
        prezzoFumettoDiv.appendChild(prezzoCarrelloDiv1);
        prezzoFumettoDiv.appendChild(prezzoCarrelloDiv2);

        fumettoDiv.appendChild(immFumettoDiv);
        fumettoDiv.appendChild(nomeFumettoDiv);
        fumettoDiv.appendChild(dataFumettoDiv);
        fumettoDiv.appendChild(prezzoFumettoDiv);

        container.appendChild(fumettoDiv);
    }
}

function onErrorProssimeUscite(error){
    console.error(error);
}

function impostaProssimeUscite(offset){
    fetch('prossimeUsciteFumetti.php?offset=' + offset + '&limit=' + limit).then(onResponseProssimeUscite).then(onJsonProssimeUscite).catch(onErrorProssimeUscite);
}

function cambiaPaginaProssimeUscite(event){
    const tasto = event.currentTarget;
    const direzione = tasto.getAttribute('data-moveP');
    const resetFreccia = document.querySelectorAll('[data-moveP]');
    for (const freccia of resetFreccia){
        freccia.classList.remove('avantiIndietroScomparsa');
    }

    if(direzione === 'avanti' || direzione === 'avantiM'){
        if(currentOffset2 < 4){
            currentOffset2 = currentOffset2 + limit;
            impostaProssimeUscite(currentOffset2);
            tasto.classList.add('avantiIndietroScomparsa');
        }
    }else{
        if(currentOffset2 > 0){
            currentOffset2 = currentOffset2 - limit;
            impostaProssimeUscite(currentOffset2);
            tasto.classList.add('avantiIndietroScomparsa');
        }
    }
}

//Eventi notizie

function onResponseEventiHome(response){
    return response.json();
}

function onJsonEventiHome(json){
    const eventi = document.querySelectorAll("div.eventinotizie div.blocco");

    for(let i = 0; i < json.length; i++){
        if(i < eventi.length){
            const evento = json[i];
            const eventoCorrente = eventi[i];

            const immEventoCorrente = eventoCorrente.querySelector("div.immagineEvento img");
            immEventoCorrente.src = evento.immagine;

            const titoloEventoCorrente = eventoCorrente.querySelector("div.notizia1 h4");
            titoloEventoCorrente.textContent = evento.titolo;

            const descrizioneEventoCorrente = eventoCorrente.querySelector("div.notizia1 p");
            descrizioneEventoCorrente.textContent = evento.descrizione;
        }
    }
}

function onErrorEventiHome(error){
    console.error(error);
}

function impostaEventi(){
    fetch('eventiHome.php?limit=' + limit).then(onResponseEventiHome).then(onJsonEventiHome).catch(onErrorEventiHome);
}

//continuo del codice

function apriBarraRicerca(){
    const barraRicerca = document.querySelector('#sezioneRicerca');
    barraRicerca.classList.remove('hidden');
}

function chiudiBarraRicerca(){
    const containerR = document.querySelector("div#contenitoreR");
    containerR.innerHTML="";

    const barraRicerca = document.querySelector('#sezioneRicerca');
    barraRicerca.classList.add('hidden');
    
}

//Funzioni API MAPPA

function OnResponse(response){
    return response.json();
}

function OnJson(json){
    json.features.forEach(function(marker){
        const coordinates = marker.geometry.coordinates;
        const name = marker.properties.name;

        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup().setHTML('<h3>' + name + '</h3>'))
            .addTo(map);
    })
}

function zoomA(){
    map.zoomIn();
}

function zoomI(){
    map.zoomOut();
}

//Funzione inserimento ricerca

function onResponseInserisciRicerca(response){
    return response.text();
}

function onTextInserisciRicerca(text){
    console.log(text);
}

function onErrorInserisciRicerca(error){
    console.error(error);
}

function inserisciRicerca(tit){
    const titolo = tit;
    const nomeFumetto = titolo.textContent;

    const formData = new FormData();
    formData.append('nome_fumetto', nomeFumetto);

    fetch("inserisciRicerca.php", {
        method: "POST",
        body: formData,}
    ).then(onResponseInserisciRicerca).then(onTextInserisciRicerca).catch(onErrorInserisciRicerca);
}


//Funzioni API Ricerca manga

function onJsonKitsu(json) {
    const containerR = document.querySelector("div#contenitoreR");
    containerR.innerHTML="";
    const manga = json.data[0];
    if (manga) {
        const containerRisultati = document.createElement('div');
        containerRisultati.classList.add('containerRisultati'); 

        const infoRisultati1 = document.createElement('div');
        infoRisultati1.classList.add('infoRisultati1');

        const copertina = document.createElement('div');
        copertina.classList.add('copertinaRisultati');
        const immagine = creaImmagine(manga.attributes.posterImage.small);
        copertina.innerHTML = '';
        copertina.appendChild(immagine);
        
        const dataRisultati = document.createElement('div');
        dataRisultati.classList.add('dataRisultati');
        dataRisultati.innerHTML = '';
        const data = document.createElement('h3');
        data.textContent = manga.attributes.startDate;
        dataRisultati.appendChild(data);

        const riquadroBottone = document.createElement('div');
        riquadroBottone.classList.add('riquadroBottone');

        const a = document.createElement('a');
        a.href = 'ricercaRisultati.php';

        const bottone = document.createElement('button');
        bottone.textContent = "Cerca nel catalogo";

        a.appendChild(bottone);
        riquadroBottone.appendChild(a);

        infoRisultati1.appendChild(copertina);
        infoRisultati1.appendChild(dataRisultati);
        infoRisultati1.appendChild(riquadroBottone);

        const infoRisultati2 = document.createElement('div');
        infoRisultati2.classList.add('infoRisultati2');

        const titoloRisultati = document.createElement('div');
        titoloRisultati.classList.add('titoloRisultati');
        titoloRisultati.innerHTML = '';
        const titolo = document.createElement('h3');
        titolo.textContent = manga.attributes.titles.en;
        titoloRisultati.appendChild(titolo);

        inserisciRicerca(titolo);

        const tramaRisultati = document.createElement('div');
        tramaRisultati.classList.add('tramaRisultati');
        tramaRisultati.innerHTML = '';
        const trama = document.createElement('p');
        trama.textContent = manga.attributes.synopsis;
        tramaRisultati.appendChild(trama);

        infoRisultati2.appendChild(titoloRisultati);
        infoRisultati2.appendChild(tramaRisultati);

        containerRisultati.appendChild(infoRisultati1);
        containerRisultati.appendChild(infoRisultati2);

        containerR.appendChild(containerRisultati);
    } else {
        alert("Manga non trovato!");
    }
}

function onResponseKitsu(response) {
    return response.json();
}

function onErrorKitsu(error){
    console.error(error);
    alert("Si è verificato un errore durante la ricerca del manga.");
}

function ricercaInvio(event){
    if(event.key === 'Enter'){
        cercaManga();
    }
}

function cercaManga() {
    const titolo = document.querySelector('#ricercaInput').value;
    fetch('apiKitsu.php?q=' + encodeURIComponent(titolo))
    .then(onResponseKitsu)
    .then(onJsonKitsu)
    .catch(onErrorKitsu);
}


//Main

//Main - Barre nav

const nav1 = document.querySelectorAll('a.nav1sel');
for (const a of nav1){
    a.addEventListener('mouseover', sottolineaIn);
    a.addEventListener('mouseout', sottolineaOut);
}

const nav2 = document.querySelectorAll('div#containertastinav2 a');
for (const a of nav2) {
    a.addEventListener('mouseover', evidenziaNavIn);
    a.addEventListener('mouseout', evidenziaNavOut);
}

//Main - ESPERIMENTO SCHERMO DELLE NEWS

impostaSchermoNews();

//Main - Più famosi

impostaPiuFamosi();

//Main - Più famosi finale 1

impostaPiuFamosiFinale1();


//Main - Gestione blocchi ultime uscite

const avantiIndietroUU = document.querySelectorAll('div.avantiIndietroUltimeUscite');
for (const tasto of avantiIndietroUU){
    tasto.addEventListener('mouseover', evidenziaBottoneIn);
    tasto.addEventListener('mouseover', passaggioMouseIn);
    tasto.addEventListener('mouseout', evidenziaBottoneOut);
    tasto.addEventListener('mouseout', passaggioMouseOut);
    
    tasto.addEventListener('click', cambiaPaginaUltimeUscite);
}

const resetFreccia = document.querySelector('[data-moveU="indietro"]');
resetFreccia.classList.add('avantiIndietroScomparsa');

let currentOffset = 0;
let limit = 4;

impostaUltimeUscite();

//Main- gestione frecce MOBILE

const avantiIndietroMobileUU = document.querySelectorAll('div.avantiIndietroUltimeUsciteMobile');
for(const tasto of avantiIndietroMobileUU){
    tasto.addEventListener('click', cambiaPaginaUltimeUscite);
}

//Main - Gestione blocco notizie

const notizie = document.querySelectorAll('.notizia1 h4');
for (const not of notizie){
    not.addEventListener('mouseover', passaggioMouseIn);
    not.addEventListener('mouseout', passaggioMouseOut);
}
const infoFooter = document.querySelectorAll('footer a');
for (const inf of infoFooter){
    inf.addEventListener('mouseover', passaggioMouseIn);
    inf.addEventListener('mouseout', passaggioMouseOut);
}

const altriEventiBottone = document.querySelector('div#tasto p');
altriEventiBottone.addEventListener('mouseover', passaggioMouseIn);
altriEventiBottone.addEventListener('mouseout', passaggioMouseOut);

impostaEventi();

//Main - Prossime Uscite Dinamico

const avantiIndietroPU = document.querySelectorAll('div.avantiIndietroProssimeUscite');
for (const tasto of avantiIndietroPU){
    tasto.addEventListener('mouseover', evidenziaBottoneIn);
    tasto.addEventListener('mouseover', passaggioMouseIn);
    tasto.addEventListener('mouseout', evidenziaBottoneOut);
    tasto.addEventListener('mouseout', passaggioMouseOut);
    
    tasto.addEventListener('click', cambiaPaginaProssimeUscite);
}

const resetFreccia2 = document.querySelector('[data-moveP="indietro"]');
resetFreccia2.classList.add('avantiIndietroScomparsa');

let currentOffset2 = 0;

impostaProssimeUscite();

//Main - Gestione frecce Mobile

const avantiIndietroMobilePU = document.querySelectorAll('div.avantiIndietroProssimeUsciteMobile');
for(const tasto of avantiIndietroMobilePU){
    tasto.addEventListener('click', cambiaPaginaProssimeUscite);
}

//Main - Gestione barra di ricerca

const tastoLente = document.querySelector('a#tastoLente');
tastoLente.addEventListener('click', apriBarraRicerca);

const tastoChiudiBarraRicerca = document.querySelector('p#chiudiRicerca');
tastoChiudiBarraRicerca.addEventListener('click', chiudiBarraRicerca);


//Main - API Mappa punti vendita

const mapbox = "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js";
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxmcmVkMjQwOSIsImEiOiJjbHZyNTRnZG8wb2pyMnFxenZlZnhqbG81In0.j0_ZqH_3Vl1-WTHPPL9vdw';

const map = new mapboxgl.Map({
    container: 'mappa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [12.5674, 41.8719],
    zoom: 5
  });


fetch('apiMapBox.php').then(OnResponse).then(OnJson);

map.scrollZoom.disable();

const zoomAvanti = document.querySelector('#zoomAvanti');
zoomAvanti.addEventListener('click', zoomA);
const zoomIndietro = document.querySelector('#zoomIndietro');
zoomIndietro.addEventListener('click', zoomI);


// Main - API Ricerca manga

const avviaRicerca = document.querySelector('#avviaRicerca');
avviaRicerca.addEventListener('click', cercaManga);

const ricercaInput = document.querySelector('#ricercaInput')
ricercaInput.addEventListener('keypress', ricercaInvio);