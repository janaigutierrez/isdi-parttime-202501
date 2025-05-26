import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updatePassword = (newPassword, confirmationNewPassword, oldPassword) => {
    validator.password(newPassword)
    validator.password(oldPassword)

    if (newPassword !== confirmationNewPassword) {
        throw new errors.ContentError('passwords do not match')
    }

    const userId = getLoggedUserId()
    if (!userId) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ newPassword, oldPassword })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            console.log(`[FRONTEND] updatePassword - status: ${response.status}`)

            if (response.status === 200) {
                console.log(`[FRONTEND] Password updated successfully`)
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default updatePassword