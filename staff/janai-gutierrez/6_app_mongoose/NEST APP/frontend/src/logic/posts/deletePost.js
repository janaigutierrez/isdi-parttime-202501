import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const deletePost = (postId) => {
    validator.id(postId)

    const userId = getLoggedUserId()
    if (!userId) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${userId}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default deletePost