import { errors } from 'common'
import { data } from '../data/index.js'

const getUsername = async (id) => {
    try {
        const user = await data.users.findById(id)
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }
        return user.username
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

export default getUsername