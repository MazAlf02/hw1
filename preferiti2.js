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

//continuo del codice

function apriBarraRicerca(){
    const barraRicerca = document.querySelector('#sezioneRicerca');
    barraRicerca.classList.remove('hidden');
}

function chiudiBarraRicerca(){
    const barraRicerca = document.querySelector('#sezioneRicerca');
    barraRicerca.classList.add('hidden');
}


//Gestione preferiti

function onResponsePreferiti(response){
    console.log("Risposta ricevuta da gestionePreferiti.php");
    return response.text();
}

function onTextPreferiti(text, imgCuore){
    console.log("Risposta dal server:", text);
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

    console.log("Gestione preferiti per ID fumetto:", idFumetto);

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


//ESPERIMENTO REPERIMENTO PREFERITI

function onResponseMostraPreferiti(response){
    return response.json();
}

function onJsonMostraPreferiti(json) {
    if(json.length > 0){
        const containerCentrale = document.querySelector('div.containerCentrale');

        containerCentrale.innerHTML = '';
    
        const fumettiPerPagina = 4;
        let numeroFumetti = json.length;
        let numeroContainer = Math.ceil(numeroFumetti / fumettiPerPagina);
    
        for (let i = 0; i < numeroContainer; i++) {
            const containerFumetti = document.createElement('div');
            containerFumetti.classList.add('containerFumetti');
    
            for (let j = 0; j < fumettiPerPagina; j++) {
                const z = i * fumettiPerPagina + j;
                const fumettoDiv = document.createElement('div');
                fumettoDiv.classList.add('fumetto');
    
                if (z < numeroFumetti) {
                    const fumettoCorrente = json[z];
    
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
                    prezzoCarrelloH4.innerHTML = '<strong>' + fumettoCorrente.prezzo + '</strong>';
                    prezzoCarrelloDiv1.appendChild(prezzoCarrelloH4);
    
                    const prezzoCarrelloDiv2 = document.createElement('div');
                    prezzoCarrelloDiv2.classList.add('prezzoCarrello');
    
                    const imgCarrello = document.createElement('img');
                    imgCarrello.classList.add('aggiungiCarrello');
                    imgCarrello.setAttribute('data-id-fumetto', fumettoCorrente.id_fumetto);
                    imgCarrello.addEventListener('click', gestisciCarrello);

                    controllaCarrello(imgCarrello);
    
                    const imgCuore = document.createElement('img');
                    imgCuore.classList.add('aggiungiPreferiti');
                    imgCuore.setAttribute('data-id-fumetto', fumettoCorrente.id_fumetto);
                    imgCuore.src = "Images/heart-full.png";
                    imgCuore.addEventListener('click', gestisciPreferiti);
    
                    prezzoCarrelloDiv2.appendChild(imgCuore);
                    prezzoCarrelloDiv2.appendChild(imgCarrello)
    
                    prezzoFumettoDiv.appendChild(prezzoCarrelloDiv1);
                    prezzoFumettoDiv.appendChild(prezzoCarrelloDiv2);
    
                    fumettoDiv.appendChild(immFumettoDiv);
                    fumettoDiv.appendChild(nomeFumettoDiv);
                    fumettoDiv.appendChild(dataFumettoDiv);
                    fumettoDiv.appendChild(prezzoFumettoDiv);
                }
    
                containerFumetti.appendChild(fumettoDiv);
            }
    
            containerCentrale.appendChild(containerFumetti);
        }
    }  
}

function onErrorMostraPreferiti(error){
    console.error(error);
}

function impostaPreferiti(){
    fetch('getPreferiti.php').then(onResponseMostraPreferiti).then(onJsonMostraPreferiti).catch(onErrorMostraPreferiti);
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

//Main - Gestione barra di ricerca

const tastoLente = document.querySelector('a#tastoLente');
tastoLente.addEventListener('click', apriBarraRicerca);

const tastoChiudiBarraRicerca = document.querySelector('p#chiudiRicerca');
tastoChiudiBarraRicerca.addEventListener('click', chiudiBarraRicerca);

// Main - API Ricerca manga

const avviaRicerca = document.querySelector('#avviaRicerca');
avviaRicerca.addEventListener('click', cercaManga);

const ricercaInput = document.querySelector('#ricercaInput')
ricercaInput.addEventListener('keypress', ricercaInvio);

//ESPERIMENTO CARICAMENTO PREFERITI

impostaPreferiti();
