import { errors } from 'common'
import { data } from '../data/index.js'

const updateUsername = async (id, newUsername) => {
    try {
        // Verificar que el username no esté en uso por otro usuario
        const existingUser = await data.users.findOne({
            username: newUsername,
            _id: { $ne: id }  // Excluir el usuario actual
        })

        if (existingUser) {
            throw new errors.ContentError(`username ${newUsername} already exists`)
        }

        // Actualizar el username
        const user = await data.users.findByIdAndUpdate(
            id,
            { username: newUsername },
            { new: false } // Devuelve el documento original
        )

        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        return
    } catch (error) {
        if (error.name === 'ExistenceError' || error.name === 'ContentError') {
            throw error
        }
        if (error.name === 'CastError') {
            throw new errors.ContentError('Invalid user ID format')
        }
        throw new errors.ServerError(error.message)
    }
}

export default updateUsername