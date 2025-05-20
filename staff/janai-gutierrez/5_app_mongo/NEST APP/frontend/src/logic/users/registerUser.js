import data from "../../data"
import { errors, validator } from "common"

const registerUser = (email, password, confirmationPassword, callback) => {
    console.log("🔍 signup got:", email, "typeof:", typeof email)

    validator.email(email)
    validator.password(password)
    validator.password(confirmationPassword)

    if (password !== confirmationPassword) {
        throw new ContentError('password and confirmation password are not the same')
    }

    const xhr = new XMLHttpRequest()

    console.log(import.meta.env.VITE_NEST_APP)

    xhr.open('POST', `${import.meta.env.VITE_NEST_APP}/users`, true)

    const user = { email, password }

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                callback(null)
            } else {
                callback(xhr.response)
            }
        }
    }

    xhr.send(JSON.stringify(user))

    const doesUserExist = data.users.findUserByEmail(email)
    if (doesUserExist) {
        throw new errors.ExistenceError('something went wrong, try again with new credentials')
    }

    const userCreated = { email, password, id: Date.now() }

    data.users.createUser(userCreated)

    sessionStorage.id = userCreated.id //almacenamos en el sessionStorage el id del usuario que se acaba de registrar y loggear
}

export default registerUser