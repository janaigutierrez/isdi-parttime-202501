import { errors, validator } from "common"

const loginUser = (loginData) => {
    validator.password(loginData.password)
    validator.email(loginData.email)

    const user = {
        email: loginData.email,
        password: loginData.password
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.text().then(userId => {
                    // Lógica de storage según remember
                    if (loginData.remember) {
                        localStorage.setItem('id', userId)
                    } else {
                        sessionStorage.setItem('id', userId)
                    }
                    return userId
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default loginUser