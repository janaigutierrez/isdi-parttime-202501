import { errors } from "common"
import { data } from "../data/index.js"

const getPostsByAuthor = async (authorId) => {
    try {
        // Verificar que el autor existe
        const author = await data.users.findById(authorId)
        if (!author) {
            throw new errors.ExistenceError('author not found')
        }

        // Obtener posts del autor con populate
        const posts = await data.posts.find({ author: authorId })
            .populate('author', 'username avatar bio')  // Datos del autor
            .sort({ createdAt: -1 })                    // Más recientes primero
            .lean()

        // Mapear y añadir isLiked + formatear fecha
        return posts.map((post) => {
            const likesAsStrings = post.likes ? post.likes.map(id => id.toString()) : []
            const isLiked = likesAsStrings.includes(authorId)

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
            throw new errors.ContentError('Invalid ID format')
        }
        throw new errors.ServerError(error.message)
    }
}

export default getPostsByAuthor