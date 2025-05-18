import data from "../../data"
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateEmail = (newEmail, callback) => {

    try {
        validator.email(newEmail)
        const userId = getLoggedUserId()
        if (!userId) {
            callback(new errors.AuthError('user not logged in'))
            return
        }


        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(`[FRONTEND] updateEmail - status: ${xhr.status}`)
                if (xhr.status === 200) {
                    console.log(`[FRONTEND] Email updated successfully`)
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
                        callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
                    }
                } else if (xhr.status === 401) {
                    callback(new errors.AuthError('user not logged in'))
                } else if (xhr.status === 404) {
                    callback(new errors.ExistenceError('user not found'))
                } else if (xhr.status === 409) {
                    callback(new errors.ContentError('email already exists'))
                } else {
                    callback(new Error(`Error ${xhr.status}: ${xhr.statusText} `))
                }
            }
        }

        xhr.open('PATCH', `${import.meta.env.VITE_NEST_APP}/users/email`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
        xhr.send(JSON.stringify({ email: newEmail }))
    } catch (error) {
        callback(error)
    }
}

export default updateEmail