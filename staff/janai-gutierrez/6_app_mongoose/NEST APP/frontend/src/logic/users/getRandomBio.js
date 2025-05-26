import { errors } from "common"

const getRandomBio = () => {
    return fetch(import.meta.env.VITE_JOKE_API_URL)
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(data => {
                    let randomBio = ''
                    if (data.type === 'single') {
                        randomBio = data.joke
                    }
                    if (data.type === 'twopart') {
                        randomBio = `+ ${data.setup} \n- ${data.delivery}`
                    }
                    return randomBio
                })
            } else {
                throw new Error('External Api Not Working')
            }
        })
}

export default getRandomBio