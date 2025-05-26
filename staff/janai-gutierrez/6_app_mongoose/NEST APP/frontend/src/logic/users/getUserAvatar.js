import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const getAvatar = () => {
    const id = getLoggedUserId()

    if (!id) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/avatar`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${id}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            console.log(`[FRONTEND] Status: ${response.status}`)

            if (response.status === 200) {
                return response.text().then(avatar => {

                    if (!avatar || avatar === '' || avatar === 'undefined') {
                        console.log('[FRONTEND] Avatar vacío o undefined')
                        throw new errors.ExistenceError('avatar not found')
                    }
                    return avatar
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getAvatar