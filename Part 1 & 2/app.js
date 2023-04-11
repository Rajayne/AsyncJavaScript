/* **************************NUMBER FACTS API************************** */
let favNumber = 4;
let url = "http://numbersapi.com";

// 1. Request json from API
async function requestNum() {
    let data = await axios.get(`${url}/${favNumber}?json`);
    console.log(data)
}
// requestNum()

// 2. Make request for more than one number
let favNumbers = [2, 8, 12];
async function requestNums() {
    let data = await axios.get(`${url}/${favNumbers}?json`);
    console.log(data)
}
// requestNums()

// 3. Get 4 facts and list on HTML page
async function appendFacts() {
  for (let i = 0; i < 4; i++) {
    const data = await $.getJSON(`${url}/${favNumber}?json`);
    $('body').append(`<p>${data.text}</p>`);
  }
}
// appendFacts();

/* **************************DECK OF CARDS API************************** */
cardURL = "https://deckofcardsapi.com/api/deck";
let deckId = "icb0owo2zxrh"
cards = ""

$(document).ready(() => requestDeck())

$("#draw").on("click", () => requestCard(deckId));
$("#shuffle").on("click", () => shuffleDeck(deckId));
$("#new").on("click", () => requestDeck());

// 1. Request new deck
async function requestDeck() {
    cards = 52
    data = axios.get(`${cardURL}/new`)
    data.then((res) => deckId = res.data.deck_id)
    $("#remaining").html(`${cards}`)
    $("#draw").show()
    $("#shuffle").show()
    $(".cards").empty()
}

// 2. Request cards from same deck
async function requestCard(deckId) {
    cards -= 1
    data = axios.get(`${cardURL}/${deckId}/draw`)
    data.then((res) => $('.cards').append(
        `<img src="${res.data.cards[0].image}"></img>`))
    $("#remaining").html(`${cards}`)
    if (cards == 0) {
        $("#remaining").html(`Start a new deck!`)
        $("#draw").hide()
        $("#shuffle").hide()
    }
}

// Resets deck to newly shuffled 52 cards
async function shuffleDeck(deckId) {
    data = axios.get(`${cardURL}/${deckId}/shuffle`)
    data.then((res) => console.log(res.data))
    alert("Deck shuffled successfully!")
}

// Shuffles remaining cards in deck
async function shufflePartialDeck(deckId) {
    data = axios.get(`${cardURL}/${deckId}/shuffle/?remaining=true`)
    data.then((res) => console.log(res.data))
}