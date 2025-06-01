import { errors } from 'common'
import { data } from '../data/index.js'

const updatePassword = async (userId, newPassword, oldPassword) => {
    try {
        // Buscar el usuario para verificar password actual
        const user = await data.users.findById(userId)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        // Verificar que la password antigua es correcta
        if (user.password !== oldPassword) {
            throw new errors.AuthError('wrong password')
        }

        // Actualizar con la nueva password
        const updatedUser = await data.users.findByIdAndUpdate(
            userId,
            { password: newPassword },
            { new: false } // Devuelve el documento original
        )

        if (!updatedUser) {
            throw new errors.ServerError('Failed to update password')
        }

        return
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

export default updatePassword