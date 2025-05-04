import { errors, validator } from "common"

const loginUser = (loginData, callback) => {

    // validem entrades
    try {
        validator.password(loginData['password'])
        validator.email(loginData['email'])
    } catch (error) {
        return callback(error)
    }

    // creem la request
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${import.meta.env.VITE_NEST_APP}/users/auth`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { email: loginData.email, password: loginData.password }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (loginData['remember']) {
                    localStorage.id = xhr.response
                } else {
                    sessionStorage.id = xhr.response
                }
                return callback(null)
            } else {
                const response = JSON.parse(xhr.response)
                if (errors[response.name]) {
                    return callback(new errors[response.name](response.message))
                }
                return callback(new Error(`${response.name}: ${response.message}`))
            }
        }
    }
    xhr.send(JSON.stringify(user))

}

export default loginUser