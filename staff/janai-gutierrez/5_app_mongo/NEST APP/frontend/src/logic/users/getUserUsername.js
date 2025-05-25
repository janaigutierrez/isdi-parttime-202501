import { errors, validator } from 'common'
import getLoggedUserId from '../helpers/getLoggedUserId'

const getUserUsername = () => {
    const id = getLoggedUserId()

    if (!id) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/username`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${id}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.text()  // Username es string
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getUserUsername