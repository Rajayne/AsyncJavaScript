let favNumber = 4;
let url = "http://numbersapi.com";

// 1. Request json from API
async function requestNum() {
    let data = await axios.get(`${url}/${favNumber}?json`);
    console.log(data)
}

// 2. Make request for more than one number
let favNumbers = [2, 8, 12];
async function requestNums() {
    let data = await axios.get(`${url}/${favNumbers}?json`);
    console.log(data)
}

// 3. Get 4 facts and list on HTML page
// async function appendFacts() {
//     let facts = await Promise.all(
//       Array.from({ length: 4 }, () => $.getJSON(`${url}/${favNumber}?json`))
//     );
//     facts.forEach(data => {
//       $('body').append(`<p>${data.text}</p>`);
//     });
//   }
// appendFacts();

async function appendFacts() {
  for (let i = 0; i < 4; i++) {
    const data = await $.getJSON(`${url}/${favNumber}?json`);
    $('body').append(`<p>${data.text}</p>`);
  }
}
appendFacts();