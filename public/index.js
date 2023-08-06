//document.getElementById("settings").onclick = OpenSettingsPopup;
//document.getElementById("closeSettings").onclick = CloseSettingsPopup;

const site = "http://tableturfdraft.se"

let linkBox = document.getElementById("link");
let copyBtn = document.getElementById("copyDraft");
let openBtn = document.getElementById("openDraft");

let langForm = document.getElementById("languages");

let player1NameDoc = document.getElementById("player1");
let player2NameDoc = document.getElementById("player2");
let draftSizeDoc = document.getElementById("draftSize");
let minSpecialsDoc = document.getElementById("312Size");
let timerDoc = document.getElementById("timerList");
let generateDraftBtn = document.getElementById("generateDraft");

let optionsPopup = document.getElementById("optionsPopup")
let optionsButton = document.getElementById("options");
let closeOptionsButton = document.getElementById("closeOptions");

let muteAudioCheckbox = document.getElementById("muteAudioCheckbox");
let darkModeCheckbox = document.getElementById("darkModeCheckbox");
let sortOrderForm = document.getElementById("setSizeOrder");
let specialCardSortForm = document.getElementById("set312Order");

let mainDiv = document.querySelector(".main");
let body = document.querySelector(".body");

let langData = GetLang();

var storedSort = localStorage['sort'] || '1';
var stored312Order = localStorage['312Order'] || '1';
var storedLang = localStorage['language'] || 'en';
var storedDark = localStorage['darkMode'] || '0';
document.documentElement.setAttribute('lang', storedLang);
langForm.value = storedLang;
var mute = localStorage['mute' || '0'];
if (mute == '1'){
    muteAudioCheckbox.checked = true;
}
if (+storedDark == '1'){
    body.classList.remove("lightMode");
    body.classList.add("darkMode");
    darkModeCheckbox.checked = true;
}
sortOrderForm.value = storedSort;
specialCardSortForm.value = stored312Order;

optionsButton.addEventListener("click", () => {
    optionsPopup.classList.add("openPopup");
    optionsButton.disabled = true;
});

closeOptionsButton.addEventListener("click", () => {
    optionsButton.disabled = false;
    optionsPopup.classList.remove("openPopup");
    if (muteAudioCheckbox.checked){
        localStorage['mute'] = '1';
    } else{
        localStorage['mute'] = '0';
    }
    if (darkModeCheckbox.checked){
        localStorage['darkMode'] = '1';
        body.classList.remove("lightMode");
        body.classList.add("darkMode");
    } else{
        localStorage['darkMode'] = '0';
        body.classList.add("lightMode");
        body.classList.remove("darkMode");
    }
    localStorage['sort'] = sortOrderForm.value;
    localStorage['312Order'] = specialCardSortForm.value;
});

async function GetLangsJson(){
    let tempList = [];
    const response = await fetch("languages.json");
    const data = await response.json();
    for (let i = 0; i < data.length; i++){
        let language = data[i];
        tempList.push(language);
    }
    //console.log(tempList);
    return tempList;
}

function ChangeLang(){
    optionsButton.disabled = false;
    optionsPopup.classList.remove("openPopup");
    localStorage['language'] = langForm.value;
    storedLang = langForm.value;
    applyStrings();
}

document.addEventListener('DOMContentLoaded', () => {
    //skip the lang value in the HTML tag for this example
    //langData = GetLangsJson();
    applyStrings();
    mainDiv.classList.add("openPopup");
});

function applyStrings() {
    console.log(langData);
    mainDiv.querySelectorAll(`[data-key]`).forEach(element => {
        let key = element.getAttribute('data-key');
        if (key) {
            element.textContent = langData.languages[storedLang].strings[key];
        }
    });
}

generateDraftBtn.addEventListener("click", () => {
    generateDraftBtn.disabled = true;
    let player1 = player1NameDoc.value;
    let player2 = player2NameDoc.value;
    let draftSize = draftSizeDoc.value;
    let minSpecials = minSpecialsDoc.value;
    let timer = timerDoc.value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "GenerateNewDraft", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        player1Name: player1,
        player2Name: player2,
        draftSize: +draftSize,
        minSpecials: +minSpecials,
        timer: +timer
    }));
    xhr.onload = function() {

    var data = JSON.parse(this.responseText);
    linkBox.innerText = site + "/draft?id=" + data;

    //aktivera SSL först
    //copyBtn.disabled = false;
    openBtn.disabled = false;
    }   
});

copyBtn.addEventListener("click", () => {
    console.log(linkBox.innerText);
    navigator.clipboard.writeText(linkBox.innerText);
});

openBtn.addEventListener("click", () => {
    window.location.href = linkBox.innerText;
});

function GetLang(){
    let result = {
        "languages": {
            "en": {
                "strings": {
                    "howToUse": "How to use",
                    "chooseDraftSettings": "- Choose draft settings",
                    "clickOnGenerateDraft": "- Click on \"Generate draft\"",
                    "openLinkGiveToOpponent": "- Open the link, give it to your opponent\n",
                    "draftSettings": "Draft settings",
                    "numberOfCardsInDraft": "Number of cards in draft (30-209):",
                    "player1Name": "Player 1 name:",
                    "player2Name": "Player 2 name:",
                    "playerPositionsRandomized": "Player positions will be randomized",
                    "312Size": "Minimum number of special attack cards (0-17):",
                    "timer": "Timer:",
                    "none": "None",
                    "10": "10 seconds",
                    "20": "20 seconds",
                    "30": "30 seconds",
                    "40": "40 seconds",
                    "50": "50 seconds",
                    "60": "1 minute",
                    "120": "2 minutes",
                    "generateDraft": "Generate draft",
                    "draftLink": "Draft link",
                    "copy": "Copy",
                    "open": "Open",
                    "about": "About",
                    "aboutParagraph1": "Tableturf Online Draft is a tool for drafting cards in Tableturf!",
                    "aboutParagraph2": "It will first generate a random list of cards. Then, both players will take turns picking cards for their own decks.",
                    "aboutParagraph3": "When the draft is finished, create your decks and start playing!",
                    "createdByLjovynn": "Created by Ljovynn",
                    "options": "Options",
                    "muteAudio": "Mute audio",
                    "deckSortingOrder": "Deck sorting order:",
                    "largeToSmall": "Large to small",
                    "smallToLarge": "Small to large",
                    "312Sorting": "Special attack card sorting:",
                    "start": "Start",
                    "end": "End",
                    "inSort": "In sort",
                    "darkMode": "Dark mode",
                    "close": "Close"
                }
            },
            "sv": {
                "strings": {
                    "howToUse": "Hur man gör",
                    "chooseDraftSettings": "- Välj draftinställningar",
                    "clickOnGenerateDraft": "- Klicka på \"Generara draft\"",
                    "openLinkGiveToOpponent": "- Öppna länken, och ge den till motståndaren\n",
                    "draftSettings": "Draftinställningar",
                    "numberOfCardsInDraft": "Antal kort i draften (30-209):",
                    "player1Name": "Första spelarens namn:",
                    "player2Name": "Andra spelarens namn:",
                    "playerPositionsRandomized": "Spelarnas positioner kommer vara slumpmässiga",
                    "312Size": "Minst antal specialattackkort (0-17):",
                    "timer": "Timer:",
                    "none": "Ingen",
                    "10": "10 sekunder",
                    "20": "20 sekunder",
                    "30": "30 sekunder",
                    "40": "40 sekunder",
                    "50": "50 sekunder",
                    "60": "1 minut",
                    "120": "2 minuter",
                    "generateDraft": "Generera draft",
                    "draftLink": "Draftlänk",
                    "copy": "Kopiera",
                    "open": "Öppna",
                    "about": "Om",
                    "aboutParagraph1": "Tableturf Online Draft är ett verktyg för att drafta kort i Tableturf!",
                    "aboutParagraph2": "Den kommer först framställa en slumpmässig lista av kort. Sedan kommer båda spelarna turvis ta kort från draften till deras egna kortlekar.",
                    "aboutParagraph3": "När draften är klar, skapa era kortlekar och börja spela!",
                    "createdByLjovynn": "Skapad av Ljovynn",
                    "options": "Inställningar",
                    "muteAudio": "Stäng av ljud",
                    "deckSortingOrder": "Sorteringsordning:",
                    "largeToSmall": "Stor till liten",
                    "smallToLarge": "Liten till stor",
                    "312Sorting": "Specialkortsortering:",
                    "start": "Början",
                    "end": "Slutet",
                    "inSort": "Inom sorteringen",
                    "darkMode": "Mörkt läge",
                    "close": "Stäng"
                }
            }
        }
    }
    return result;
}