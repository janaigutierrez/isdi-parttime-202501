import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId"

const getAllPosts = () => {
    const loggedUserId = getLoggedUserId()
    validator.id(loggedUserId)

    return fetch(`${import.meta.env.VITE_NEST_APP}/posts`, {
        method: "GET",
        headers: {
            Authorization: `Basic ${loggedUserId}`
        },
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

export default getAllPosts