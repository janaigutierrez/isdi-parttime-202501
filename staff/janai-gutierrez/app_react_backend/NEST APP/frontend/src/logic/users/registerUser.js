import data from "../../data"
import { errors, validator } from "common"

const registerUser = (registerData, callback) => { //registerData = {'email': '', 'password': '', 'confirmation-password': ''}
    validator.email(registerData['email'])
    validator.password(registerData['password'])
    validator.password(registerData['confirmation-password'])

    if (registerData['password'] !== registerData['confirmation-password']) {
        throw new ContentError('password and confirmation password are not the same')
    }

    const xhr = new XMLHttpRequest()

    console.log(import.meta.env.VITE_NEST_APP)

    xhr.open('POST', `${import.meta.env.VITE_NEST_APP}/users`, true)

    const user = { email: registerData.email, password: registerData.password }

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

    const doesUserExist = data.users.findUserByEmail(registerData['email'])
    if (doesUserExist) {
        throw new ExistenceError('something went wrong, try again with new credentials')
    }

    const userCreated = { email: registerData['email'], password: registerData['password'], id: Date.now() }

    data.users.createUser(userCreated)

    sessionStorage.id = userCreated.id //almacenamos en el sessionStorage el id del usuario que se acaba de registrar y loggear
}

export default registerUser