import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const publishPost = (postInfo) => {
    const { title, description, img } = postInfo

    validator.text(title, 40, 1, 'Post-Title')
    validator.text(description, 210, 1, 'Post-Description')

    const postData = { title, description, img }

    return fetch(`${import.meta.env.VITE_NEST_APP}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${getLoggedUserId()}`
        },
        body: JSON.stringify(postData)
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then((response) => {
            if (response.status === 201) {
                return
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default publishPost