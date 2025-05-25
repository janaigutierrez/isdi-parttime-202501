import { errors } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const getBio = () => {
    const id = getLoggedUserId()

    if (!id) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/bio`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${id}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.text()  // Bio es texto plano
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getBio