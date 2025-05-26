import { errors } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateAvatar = (newAvatar) => {
    const userId = getLoggedUserId()

    if (!userId) {
        throw new errors.AuthError('user not logged in')
    }

    if (newAvatar && typeof newAvatar !== 'string') {
        throw new errors.ContentError('avatar must be a string')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/avatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ avatar: newAvatar })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            console.log(`[FRONTEND] updateAvatar - Status: ${response.status}`)

            if (response.status === 200) {
                console.log('[FRONTEND] Avatar actualizado correctamente')
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default updateAvatar