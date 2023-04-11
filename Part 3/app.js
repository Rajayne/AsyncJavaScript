url = "https://pokeapi.co/api/v2/pokemon"

totalPokemon = 1279

async function requestAllPokemon() {
    data = axios.get(`${url}`)
    data.then((res) => console.log(res.data.results))
}

async function requestRandomPokemon() {
    pokeId = Math.ceil(Math.random() * totalPokemon)
    data = axios.get(`${url}/${pokeId}`)
    data.then((res) => console.log(res.data))
}

async function requestPokemonById(id) {
    data = axios.get(`${url}/${id}`)
    data.then((res) => console.log(res.data))
}
