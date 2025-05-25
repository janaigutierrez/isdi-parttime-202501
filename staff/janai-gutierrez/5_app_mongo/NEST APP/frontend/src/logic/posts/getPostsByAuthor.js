import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const getPostsByAuthor = (authorId) => {
    validator.id(authorId)

    const loggedUserId = getLoggedUserId()
    if (!loggedUserId) {
        throw new errors.AuthError('user not logged in')
    }

    return fetch(`${import.meta.env.VITE_NEST_APP}/posts/author/${authorId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${loggedUserId}`
        }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then(body => body.posts)
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getPostsByAuthor