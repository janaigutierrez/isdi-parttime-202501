import { errors } from 'common'
import { data } from '../data/index.js'

const deleteUserById = async (userId, password) => {
    try {
        // Verificar usuario y password
        const user = await data.users.findById(userId)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        if (user.password !== password) {
            throw new errors.AuthError('wrong password')
        }

        // Eliminar posts del usuario
        await data.posts.deleteMany({ author: userId })

        // Eliminar usuario
        const result = await data.users.findByIdAndDelete(userId)
        if (!result) {
            throw new errors.ServerError('Failed to delete user')
        }

    } catch (error) {
        if (error.name === 'ExistenceError' || error.name === 'AuthError') {
            throw error
        }
        if (error.name === 'CastError') {
            throw new errors.ContentError('Invalid user ID format')
        }
        throw new errors.ServerError(error.message)
    }
}

export default deleteUserById