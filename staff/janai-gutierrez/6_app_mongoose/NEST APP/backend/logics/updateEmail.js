import { errors } from 'common'
import { data } from '../data/index.js'

const updateEmail = async (userId, newEmail) => {
    try {
        // Verificar que el email no esté en uso por otro usuario
        const existingUser = await data.users.findOne({
            email: newEmail,
            _id: { $ne: userId }  // Excluir el usuario actual
        })

        if (existingUser) {
            throw new errors.ContentError(`email ${newEmail} already exists`)
        }

        // Actualizar el email del usuario
        const user = await data.users.findByIdAndUpdate(
            userId,
            { email: newEmail },
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

export default updateEmail