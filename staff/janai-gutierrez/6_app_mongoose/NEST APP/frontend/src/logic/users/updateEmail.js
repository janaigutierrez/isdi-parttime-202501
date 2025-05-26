import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateEmail = (newEmail) => {
    validator.email(newEmail)

    const userId = getLoggedUserId()
    if (!userId) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/email`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ email: newEmail })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {

            if (response.status === 200) {
                console.log(`[FRONTEND] Email updated successfully`)
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default updateEmail