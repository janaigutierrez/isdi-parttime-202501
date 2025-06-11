import { errors, validator } from "../../../../common"

const login = ({ email, password }) => {
    validator.email(email, 'email')
    validator.password(password, 'password')

    return fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password
        })
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(data => {
                    localStorage.setItem('authToken', data.token)
                    return data
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default login