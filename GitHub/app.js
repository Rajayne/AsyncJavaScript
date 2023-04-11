url = `https://api.github.com/users`

async function getUser(user) {
    try {
        let res = await axios.get(`${url}/${user}`);
        console.log(`${res.data.name}: ${res.data.bio}`)
    }
    catch (e) {
        console.log("User does not exist!", e);
    }
}

function getUser2 (user) {
    axios.get(`${url}/${user}`)
    .then(res => {
        console.log(`${res.data.name}: ${res.data.bio}`)
    })
    .catch(e => {
        console.log("User does not exist!", e);    
    })
}