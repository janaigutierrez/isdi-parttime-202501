import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateBio = (newBio) => {
    validator.text(newBio, 200, 0, 'bio')

    const loggedUserId = getLoggedUserId()

    if (!loggedUserId) {
        throw new errors.AuthError('user not logged in')
    }

    const payload = { bio: newBio }
    console.log('Sending payload:', JSON.stringify(payload))

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/bio`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedUserId}`
        },
        body: JSON.stringify(payload)
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {

            if (response.status === 200) {
                console.log('Bio updated successfully')
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default updateBio