import { errors } from "common"
import { data } from "../data/index.js"

const createPost = async (authorId, title, description, img) => {
    try {

        const user = await data.users.findById(authorId)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        const newPost = new data.posts({
            title,
            description,
            img,
            author: authorId,
            likes: []
        })

        const savedPost = await newPost.save()
        return savedPost.id

    } catch (error) {
        if (error.name === 'ExistenceError') {
            throw error
        }
        if (error.name === 'CastError') {
            throw new errors.ContentError('Invalid user ID format')
        }
        throw new errors.ServerError(error.message)
    }
}

export default createPost