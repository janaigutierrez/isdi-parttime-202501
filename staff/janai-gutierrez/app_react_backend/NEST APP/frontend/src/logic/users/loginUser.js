import data from "../../data"
import { AuthError, ExistenceError } from "common/errors"
import validator from "common"

const loginUser = (loginData, callback) => {
    validator.password(loginData['password'])
    validator.email(loginData['email'])

    const xhr = new XMLHttpRequest()

    xhr.open('POST', `${import.meta.env.VITE_NEST_APP}/users/auth`, true)

    const user = { email: loginData.email, password: loginData.password }

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (loginData['remember']) {
                    localStorage.id = xhr.response
                } else {
                    sessionStorage.id = xhr.response
                }
                callback(null)
            } else {
                callback()
            }
        }
    }
    xhr.send(JSON.stringify(user))

}

export default loginUser