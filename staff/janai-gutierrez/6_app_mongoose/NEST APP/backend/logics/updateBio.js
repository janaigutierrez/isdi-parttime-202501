import { errors } from "common"
import { data } from "../data/index.js"

const updateBio = async (userId, newBio) => {
    try {
        const user = await data.users.findByIdAndUpdate(
            userId,
            { bio: newBio },
            { new: false } // Devuelve el documento original
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

export default updateBio