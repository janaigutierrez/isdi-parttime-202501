import { errors, validator } from "common"

const getUserIdByUsername = (username) => {
    validator.username(username)

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/search/${username}`, {
        method: 'GET'
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(data => data.userId)  // Retorna solo el ID
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getUserIdByUsername