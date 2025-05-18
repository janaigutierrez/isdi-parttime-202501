import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const toggleLike = (postId, callback) => {

    try {
        validator.id(postId)

        const userId = getLoggedUserId()
        if (!userId) {
            callback(new errors.AuthError('user not logged in'))
            return
        }

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(`[FRONTEND] toggleLike - status: ${xhr.status}`)
                if (xhr.status === 200) {
                    console.log(`[FRONTEND] Like toggled successfully`)
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
                    callback(new errors.ExistenceError('post not found'))
                } else {
                    callback(new Error(`Error ${xhr.status}: ${xhr.statusText} `))
                }
            }
        }
        console.log(`[FRONTEND] toggleLike called with postId: ${postId} (type: ${typeof postId})`)
        xhr.open('PATCH', `${import.meta.env.VITE_NEST_APP}/posts/${postId}/like`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
        xhr.send()
    } catch (error) {
        callback(error)
    }
}

export default toggleLike