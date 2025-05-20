import data from "../../data"
import { errors, validator } from "common"

const deleteUserById = (id, password, callback) => {

    try {
        validator.id(id)
        validator.password(password)

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(`[FRONTEND] deleteUserById - status: ${xhr.status}`)
                if (xhr.status === 200) {
                    console.log(`[FRONTEND] User deleted successfully`)
                    callback(null)
                } else if (xhr.status === 400) {
                    try {
                        const response = JSON.parse(xhr.responseText)
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message))
                        } else {
                            callback(new Error(response.message || `Error ${xhr.status}`))
                        }
                    } catch (error) {
                        callback(new Error(`Error ${xhr.status}: ${xhr.statusText}}`))
                    }
                } else if (xhr.status === 401) {
                    callback(new errors.AuthError('user not logged in or wrong password'))
                } else if (xhr.status === 404) {
                    callback(new errors.ExistenceError('user not found'))
                } else {
                    callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
                }

            }
        }

        xhr.open('DELETE', `${import.meta.env.VITE_NEST_APP}/users`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${id}`)
        xhr.send(JSON.stringify({ password }))
    } catch (error) {
        callback(error)
    }
}

export default deleteUserById