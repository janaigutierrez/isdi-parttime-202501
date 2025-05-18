import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updatePassword = (newPassword, confirmationNewPassword, oldPassword, callback) => {
    try {
        validator.password(newPassword)
        validator.password(oldPassword)

        if (newPassword !== confirmationNewPassword) {
            callback(new errors.ContentError('passwords do not match'))
            return
        }

        const userId = getLoggedUserId()
        if (!userId) {
            callback(new errors.AuthError('user not logged in'))
            return
        }

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(`[FRONTEND] updatePassword - status: ${xhr.status}`)
                if (xhr.status === 200) {
                    console.log(`[FRONTEND] Password updated successfully`)
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
                    callback(new errors.AuthError('user not logged in or wrong password'))
                } else if (xhr.status === 404) {
                    callback(new errors.ExistenceError('user not found'))
                } else {
                    callback(new Error(`Error ${xhr.status}: ${xhr.statusText} `))
                }
            }
        }

        xhr.open('PATCH', `${import.meta.env.VITE_NEST_APP}/users/password`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
        xhr.send(JSON.stringify({ newPassword, oldPassword }))
    } catch (error) {
        callback(error)
    }
}

export default updatePassword