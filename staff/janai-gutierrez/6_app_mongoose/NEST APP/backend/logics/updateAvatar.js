import { errors } from "common"
import { data } from "../data/index.js"

const updateAvatar = async (id, newAvatar) => {
    try {
        const user = await data.users.findByIdAndUpdate(
            id,
            { avatar: newAvatar },
            { new: false } // Devuelve el documento original (antes del update)
        )

        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        return
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

export default updateAvatar