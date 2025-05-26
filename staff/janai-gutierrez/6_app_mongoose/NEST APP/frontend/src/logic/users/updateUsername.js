import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateUsername = (newUsername) => {
    validator.username(newUsername)

    const userId = getLoggedUserId()
    if (!userId) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/username`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ username: newUsername })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            console.log(`[FRONTEND] updateUsername - Status: ${response.status}`)

            if (response.status === 200) {
                console.log(`[FRONTEND] Username updated successfully`)
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default updateUsername