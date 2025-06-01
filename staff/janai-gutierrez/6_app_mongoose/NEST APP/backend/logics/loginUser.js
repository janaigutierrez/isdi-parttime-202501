import { data } from '../data/index.js'
import { errors } from 'common'

const loginUser = async (email, password) => {
    try {
        const user = await data.users.findOne({ email: email })
        if (!user) {
            throw new errors.ExistenceError('user not found')
        }
        if (user.password !== password) {
            throw new errors.AuthError('invalid credentials')
        }
        return user._id.toString()
    } catch (error) {
        if (error.name === 'ExistenceError' || error.name === 'AuthError') {
            throw error
        }
        throw new errors.ServerError(error.message)
    }
}

export default loginUser