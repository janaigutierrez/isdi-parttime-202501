import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const toggleLike = (postId) => {
    validator.id(postId)

    return fetch(`${import.meta.env.VITE_NEST_APP}/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Basic ${getLoggedUserId()}`
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

export default toggleLike