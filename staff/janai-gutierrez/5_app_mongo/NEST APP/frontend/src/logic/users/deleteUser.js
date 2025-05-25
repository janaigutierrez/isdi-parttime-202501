import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const deleteUser = (password) => {
    const id = getLoggedUserId()
    if (!id) {
        throw new errors.AuthError('user not logged in')
    }

    console.log('🔍 Password a validar:', password)
    console.log('🔍 Length:', password.length)
    console.log('🔍 Caracteres:', password.split('').map(c => `'${c}'`).join(', '))

    validator.password(password)

    return fetch(`${import.meta.env.VITE_NEST_APP}/users`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${id}`
        },
        body: JSON.stringify({ password })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                console.log(`[FRONTEND] User deleted successfully`)
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default deleteUser