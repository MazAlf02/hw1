function controlloUsernameJson(json){
    const username = document.querySelector("div#username");
    if (!json.exists) {
        username.classList.remove('errors');
        formStatus.username = true;
    } else {
        const testoUsername = document.querySelector("div#username div.messaggiErrore");
        testoUsername.textContent = "Username già in uso, sceglierne un altro";
        username.classList.add('errors');
        formStatus.username = false;
    }
}

function controlloEmailJson(json){
    const email = document.querySelector("div#email");
    if (!json.exists) {
        email.classList.remove('errors');
        formStatus.email = true;
    } else {
        const testoEmail = document.querySelector("div#email div.messaggiErrore");
        testoEmail.textContent = "Email già associata ad un account, sceglierne un'altra";
        email.classList.add('errors');
        formStatus.email = false;
    }
}

function fetchResponse(response){
    if(!response.ok) return null;
    return response.json();
}

function controlloUsername(event){
    const input = event.currentTarget;

    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)){
        input.parentNode.querySelector("div.messaggiErrore").textContent = "Sono ammesse lettere, numeri e underscore. Massimo 15 caratteri";
        input.parentNode.classList.add('errors');
        formStatus.username = false;
    }else{
        fetch("controlloUsername.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(controlloUsernameJson);
    }
}

function controlloEmail(event){
    const input = event.currentTarget;
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase())) {
        const testoEmail = document.querySelector("div#email div.messaggiErrore");
        testoEmail.textContent = "Email non valida";
        input.parentNode.classList.add('errors');
        formStatus.email = false;
    }else{
        fetch("controlloEmail.php?q="+encodeURIComponent(String(input.value).toLowerCase())).then(fetchResponse).then(controlloEmailJson);
    }
}

function controlloPassword(event){
    const password = document.querySelector("div#password");
    const passwordInput = event.currentTarget;
    if(passwordInput.value.length >= 8){
        password.classList.remove('errors');
        formStatus.password = true;
    }else{
        password.classList.add('errors');
        formStatus.password = false;
    }
}

function controlloConfermaPassword(event){
    const password = document.querySelector("div#password input");
    const confermaPassword = document.querySelector("div#confermaPassword");
    const confermaPasswordInput = event.currentTarget;
    if(confermaPasswordInput.value === password.value){
        confermaPassword.classList.remove('errors');
        formStatus.confermaPassword = true;
    }else{
        confermaPassword.classList.add('errors');
        formStatus.confermaPassword = false;
    }
}

function controlloRegistrazione(event){
    const checkbox = document.querySelector("div#accettaCondizioni input");
    formStatus[checkbox.name] = checkbox.checked;
    if(Object.keys(formStatus).length !== 5 || Object.values(formStatus).includes(false)){
        event.preventDefault();        
    }
}

// Main
const formStatus = {};

const usernameInput = document.querySelector("div#username input");
usernameInput.addEventListener("blur", controlloUsername);

const emailInput = document.querySelector("div#email input");
emailInput.addEventListener("blur", controlloEmail);

const passwordInput = document.querySelector("div#password input");
passwordInput.addEventListener("blur", controlloPassword);

const confermaPasswordInput = document.querySelector("div#confermaPassword input");
confermaPasswordInput.addEventListener("blur", controlloConfermaPassword);

const form = document.querySelector("form");
form.addEventListener("submit", controlloRegistrazione);
