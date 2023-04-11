url = "https://pokeapi.co/api/v2/pokemon"

// 1. Single request for names and URLs of pokemon
async function requestAllPokemon() {
    data = axios.get(`${url}?limit=1000`);
    data.then((res) => console.log(res.data));
};

async function requestRandomPokemon() {
    id = Math.floor(Math.random() * totalPokemon);
    data = axios.get(`${url}?limit=1000`);
    data.then((res) => console.log(res.data.results[id]));
};

// 2. Request three random pokemon
async function requestThreePokemon() {
    let allData = await $.getJSON(`${url}/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
    }
    let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
    );
    pokemonData.forEach(p => console.log(p));
}

totalSpecies = 1008

async function requestPokemonDescriptions() {
    let allData = await $.getJSON(`${url}/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
    }
    let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
    );
    descriptions = speciesData.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
            entry => entry.language.name === "en"
        );
        return descriptionObj ?
            descriptionObj.flavor_text :
            "No description available.";
    });
    descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].name}: ${desc}`);
    });
}

let $btn = $("button");
let $pokeArea = $("#pokemon");

$btn.on("click", async function() {
    $pokeArea.empty();
    let allData = await $.getJSON(`${url}/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
    }
    let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
    );
    speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find(function(entry) {
            return entry.language.name === "en";
        });
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let name = pokemonData[i].name;
        let imgSrc = pokemonData[i].sprites.front_default;
        $pokeArea.append(makePokeCard(name, imgSrc, description));
    });
});

function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
}

/* **************************REWRITE POKEMON API************************** */

class Pokemon {
    constructor(id) {
        this.id = id
        this.types = []
    }
    async getInfo() {
        let res = await axios.get(`${url}/${this.id}`)
        this.name = res.data.name;
        for (let type of res.data.types) {
            this.types.push(type.type.name)
        }
    }
}

function getThreePokemon() {
    axios.get(`${url}/1`)
    .then(({data}) => {
        console.log(`The first pokemon is ${data.name}`)
        return axios.get(`${url}/2`)
    })
    .then(({data}) => {
        console.log(`The second pokemon is ${data.name}`)
        return axios.get(`${url}/3`)
    })
    .then(({data}) => {
        console.log(`The third pokemon is ${data.name}`)
    })
}

async function getThreePokemonAsyc() {
    let {data: p1} = await axios.get(`${url}/1`)
    console.log(p1.name)
    let {data: p2} = await axios.get(`${url}/2`)
    console.log(p2.name)
    let {data: p3} = await axios.get(`${url}/3`)
    console.log(p3.name)
}