// frontend/logic/users/updateAvatar.js
import { errors } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const updateAvatar = (newAvatar, callback) => {
    try {
        const userId = getLoggedUserId()

        if (!userId) {
            callback(new errors.AuthenticationError('user not logged in'))
            return
        }

        if (newAvatar && typeof newAvatar !== 'string') {
            callback(new errors.ContentError('avatar must be a string'))
            return
        }

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(`[FRONTEND] updateAvatar - Status: ${xhr.status}`)

                if (xhr.status === 200) {
                    console.log('[FRONTEND] Avatar actualizado correctamente')
                    callback(null)
                } else if (xhr.status === 400) {
                    try {
                        const response = JSON.parse(xhr.responseText)
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message))
                        } else {
                            callback(new Error(response.message || `Error ${xhr.status}`))
                        }
                    } catch (e) {
                        callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
                    }
                } else if (xhr.status === 401) {
                    callback(new errors.AuthenticationError('user not authenticated'))
                } else if (xhr.status === 404) {
                    callback(new errors.ExistenceError('user not found'))
                } else {
                    callback(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
                }
            }
        }

        xhr.open('PATCH', `${import.meta.env.VITE_NEST_APP}/users/avatar`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
        xhr.send(JSON.stringify({ avatar: newAvatar }))
    } catch (error) {
        callback(error)
    }
}

export default updateAvatar