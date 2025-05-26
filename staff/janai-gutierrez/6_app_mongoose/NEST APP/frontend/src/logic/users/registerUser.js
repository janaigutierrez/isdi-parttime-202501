import { errors, validator } from "common"

const registerUser = (email, password, confirmationPassword) => {

    validator.email(email)
    validator.password(password)
    validator.password(confirmationPassword)

    if (password !== confirmationPassword) {
        throw new errors.ContentError('password and confirmation password are not the same')
    }

    const user = { email, password }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 201) {
                return response.text().then(userId => {
                    // Auto-login después de registro
                    sessionStorage.setItem('id', userId)
                    return userId
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default registerUser