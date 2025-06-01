import { errors } from 'common'
import { data } from "../data/index.js"

const getAvatar = async (id) => {
    try {
        const user = await data.users.findById(id)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        if (!user.avatar || user.avatar === '') {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=random`
        }

        return user.avatar

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

export default getAvatar