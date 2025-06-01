import { errors } from 'common'
import { data } from '../data/index.js'

const toggleLike = async (userId, postId) => {
    try {
        const post = await data.posts.findById(postId)
        if (!post) {
            throw new errors.ExistenceError('post not found')
        }

        // Inicializar likes si no existe
        if (!post.likes) post.likes = []

        // Buscar si ya tiene like
        const likeIndex = post.likes.findIndex(id => id.toString() === userId)

        if (likeIndex !== -1) {
            // Quitar like
            post.likes.splice(likeIndex, 1)
        } else {
            // Añadir like
            post.likes.push(userId)
        }

        // Guardar cambios
        await post.save()

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

export default toggleLike