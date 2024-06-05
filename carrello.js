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

//RIMOZIONE CARRELLO

function onResponseRimozioneCarrello(response){
    return response.text();
}

function onTextRimozioneCarrello(text){
    console.log(text);
    impostaCarrello();
}

function onErrorRimozioneCarrello(error){
    console.error(error);
}

function rimuoviDalCarrello(event){
    const bottone = event.currentTarget;
    const idFumetto = bottone.getAttribute('data-id-fumetto');

    const formData = new FormData();
    formData.append('id_fumetto', idFumetto);

    fetch('rimuoviDalCarrello.php', {
        method: 'POST',
        body: formData}
    ).then(onResponseRimozioneCarrello).then(onTextRimozioneCarrello).catch(onErrorRimozioneCarrello);
}

//REPERIMENTO CARRELLO

function onResponseCarrello(response){
    return response.json();
}

function onJsonCarrello(json){
    if(json.length > 0){
        let prezzoTotaleCarrello = 0;

        const containerCentrale = document.querySelector("div.containerCentrale");
        containerCentrale.innerHTML = '';
    
        const containerCarrello = document.createElement('div');
        containerCarrello.classList.add('containerCarrello');
    
        const tabellaProdotti = document.createElement('table');
        tabellaProdotti.classList.add('tabellaProdotti');
    
        const tr = document.createElement('tr');
        
        const th1 = document.createElement('th');
        th1.textContent = "Nome del prodotto";
    
        const th2 = document.createElement('th');
        th2.textContent = "Quantità";
    
        const th3 = document.createElement('th');
        th3.textContent = "Prezzo";
    
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
    
        tabellaProdotti.appendChild(tr);
    
        for(let i = 0; i < json.length; i++){

            const prodottoCorrente = json[i];

            const tr = document.createElement('tr');

            const td1 = document.createElement('td');
            td1.textContent = prodottoCorrente.nome;

            const td2 = document.createElement('td');
            td2.textContent = prodottoCorrente.conta_fumetti;

            const td3 = document.createElement('td');
            td3.textContent = "€" + (prodottoCorrente.conta_fumetti * parseFloat(prodottoCorrente.prezzo)).toFixed(2);

            const td4 = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = "Rimuovi  ";
            button.setAttribute('data-id-fumetto', prodottoCorrente.id);
            button.addEventListener('click', rimuoviDalCarrello);

            td4.appendChild(button);

            prezzoTotaleCarrello = prezzoTotaleCarrello + (prodottoCorrente.conta_fumetti * parseFloat(prodottoCorrente.prezzo));

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tabellaProdotti.appendChild(tr);
        }

        const totaleCarrello = document.createElement('div');
        totaleCarrello.classList.add('totaleCarrello');

        const tabellaTotale = document.createElement('table');
        tabellaTotale.classList.add('tabellaTotale');

        const trt = document.createElement('tr');

        const tdt = document.createElement('td');
        tdt.textContent = "Totale";

        const tdt2 = document.createElement('td');
        tdt2.textContent = "€" + prezzoTotaleCarrello.toFixed(2);

        trt.appendChild(tdt);
        trt.appendChild(tdt2);

        tabellaTotale.appendChild(trt);

        totaleCarrello.appendChild(tabellaTotale);

        containerCarrello.appendChild(tabellaProdotti);
        containerCarrello.appendChild(totaleCarrello);

        containerCentrale.appendChild(containerCarrello);
    }else{
        const containerCentrale = document.querySelector("div.containerCentrale");
        containerCentrale.innerHTML = '';

        const nessunFumetto = document.createElement('div');
        nessunFumetto.classList.add('nessunFumetto');

        const h2 = document.createElement('h2');
        h2.textContent = "Nessun fumetto aggiunto al carrello";

        nessunFumetto.appendChild(h2);

        containerCentrale.appendChild(nessunFumetto);
    }
}

function onErrorCarrello(error){
    console.error(error);
}

function impostaCarrello(){
    fetch('getCarrello.php').then(onResponseCarrello).then(onJsonCarrello).catch(onErrorCarrello);
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

//ESPERIMENTO CARICAMENTO CARRELLO

impostaCarrello();