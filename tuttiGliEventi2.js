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


//ESPERIMENTO EVENTI

function onResponseEventiHome(response) {
    return response.json();
}

function creaBlocco(evento) {
    const blocco = document.createElement('div');
    blocco.classList.add('blocco');
    blocco.setAttribute('data-id', evento.id);

    const immagineEvento = document.createElement('div');
    immagineEvento.classList.add('immagineEvento');

    const img = document.createElement('img');
    img.src = evento.immagine;

    immagineEvento.appendChild(img);
    blocco.appendChild(immagineEvento);

    const notizia1 = document.createElement('div');
    notizia1.classList.add('notizia1');

    const h4 = document.createElement('h4');
    h4.textContent = evento.titolo;

    const p = document.createElement('p');
    p.textContent = evento.descrizione;

    notizia1.appendChild(h4);
    notizia1.appendChild(p);
    blocco.appendChild(notizia1);

    return blocco;
}

function onJsonEventiHome(json) {
    const eventiContainer = document.querySelector('div#eventiContainer');
    eventiContainer.innerHTML = '';

    let currentEventinotizie = null;

    for(let i = 0; i < json.length; i++){

        const evento = json[i];

        if (i % 2 === 0) {
            currentEventinotizie = document.createElement('div');
            currentEventinotizie.classList.add('eventinotizie');
            eventiContainer.appendChild(currentEventinotizie);
        }

        const blocco = document.createElement('div');
        blocco.classList.add('blocco');

        const immagineEvento = document.createElement('div');
        immagineEvento.classList.add('immagineEvento');

        const img = document.createElement('img');
        img.src = evento.immagine;

        immagineEvento.appendChild(img);
        blocco.appendChild(immagineEvento);

        const notizia1 = document.createElement('div');
        notizia1.classList.add('notizia1');

        const h4 = document.createElement('h4');
        h4.textContent = evento.titolo;

        const p = document.createElement('p');
        p.textContent = evento.descrizione;

        notizia1.appendChild(h4);
        notizia1.appendChild(p);
        blocco.appendChild(notizia1);
        currentEventinotizie.appendChild(blocco);
    }

    if (json.length % 2 !== 0) {
        const blocco = document.createElement('div');
        blocco.classList.add('blocco');
        currentEventinotizie.appendChild(blocco);
    }
}

function onErrorEventiHome(error){
    console.error(error);
}

function impostaEventi() {
    fetch('eventiPaginaDedicata.php').then(onResponseEventiHome).then(onJsonEventiHome).catch(onErrorEventiHome);
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


//Main - Eventi

impostaEventi();

