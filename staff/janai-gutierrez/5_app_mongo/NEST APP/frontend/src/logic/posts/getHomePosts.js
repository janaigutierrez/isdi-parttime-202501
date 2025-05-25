import { errors } from "common"

const getHomePosts = () => {

    return fetch(`${import.meta.env.VITE_API_APP}/posts/home`, {
        method: 'GET',
        headers: { Authorization: `Basic ${id}` }
    })
        .catch(error => { throw new errors.ConnectionError(error.message) })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(body => {
                    return body.posts
                })
            } else {
                return response.json().then(body => {
                    throw new errors[body.name](body.message)
                })
            }
        })
}

export default getHomePosts