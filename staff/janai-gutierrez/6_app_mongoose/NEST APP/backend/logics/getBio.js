import { errors } from 'common'
import { data } from '../data/index.js'

const getBio = async (userId) => {
    try {
        const user = await data.users.findById(userId)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }

        return user.bio || ''

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

export default getBio