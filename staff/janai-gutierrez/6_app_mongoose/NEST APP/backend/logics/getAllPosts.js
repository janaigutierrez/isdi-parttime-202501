import { errors } from "common"
import { data } from "../data/index.js"

const getAllPosts = async (userId) => {
    try {
        // Verificar que el usuario existe
        const user = await data.users.findById(userId)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        // Obtener posts con populate
        const posts = await data.posts.find({})
            .populate('author', 'username avatar')  // Solo estos campos del autor
            .sort({ createdAt: -1 })                 // Ordenar por más recientes
            .lean()                                  // Para mejor performance

        // Mapear y añadir isLiked
        return posts.map((post) => {
            const likesAsStrings = post.likes ? post.likes.map(id => id.toString()) : []

            const isLiked = post.likes && likesAsStrings.includes(userId)

            return {
                ...post,
                createdOn: post.createdAt.toLocaleString(),
                isLiked: isLiked
            }

        })

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

export default getAllPosts