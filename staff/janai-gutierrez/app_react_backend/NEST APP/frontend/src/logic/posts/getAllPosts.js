import data from "../../data";
import { errors, validator } from "common"
import getLoggedUserId from "../helpers/getLoggedUserId";

const getAllPosts = () => {

    try {
        // Retrieve user ID and convert into a number if not
        const rawId = getLoggedUserId()
        const loggedUserId = rawId != null ? Number(rawId) : null

        // Validate ID if present
        if (loggedUserId != null) {
            validator.id(loggedUserId)
        }

        // Prepare XHR
        const xhr = new XMLHttpRequest()

        xhr.open('GET', `${import.meta.env.VITE_NEST_APP}/posts`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        if (loggedUserId != null) {
            xhr.setRequestHeader('Authorization', `Bearer ${loggedUserId}`)
        }

        // Handle response
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const posts = JSON.parse(xhr.responseText)
                        // Sort by date descending
                        if (posts.length > 0) {
                            posts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                        }

                        // Enrich posts

                        for (let i = 0; i < posts.length; i++) {
                            const post = posts[i]

                            const author = data.users.findUserById(post.author)
                            if (!author) throw new ExistenceError('Author not found')
                            post.author = { id: author.id, username: author.username, avatar: author.avatar }

                            post.createdOn = new Date(post.createdOn).toLocaleDateString()

                            posts.likes = Array.isArray(post.likes) ? post.likes : []

                            post.isLiked = (loggedUserId != null && post.likes.includes(loggedUserId))
                        }

                        callback(null, posts)
                    } catch (parseError) {
                        callback(parseError)
                    }
                } else if (xhr.status === 404) {
                    console.error(new ExistenceError('No posts found'))
                } else {
                    console.error(new Error(`Error fetching posts: ${xhr.status} ${xhr.statusText}`))
                }
            }
        }
        // Send request
        xhr.send()

    } catch (error) {
        callback(error)
    }

    const posts = data.posts.retrievePosts()

}

export default getAllPosts