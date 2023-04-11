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
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${url}/${favNumber}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }
// appendFacts();

cardURL = "https://deckofcardsapi.com/api/deck";
let deckId = "icb0owo2zxrh"

async function requestDeck() {
    data = axios.get(`${cardURL}/new`)
    data.then((res) => deckId = res.data.deck_id)
}

let card_image = ""
async function requestCard(deckId) {
    data = axios.get(`${cardURL}/${deckId}/draw`)
    data.then((res) => console.log(
        `Suit: ${res.data.cards[0].suit}, Value: ${res.data.cards[0].value}`))
}

async function shuffleDeck(deckId) {
    let data = await axios.get(`${cardURL}/${deckId}/new`)
    data.then(() => console.log(data.data))
}