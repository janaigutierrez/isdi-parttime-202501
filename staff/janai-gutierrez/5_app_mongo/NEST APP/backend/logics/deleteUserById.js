import { errors } from 'common'
import { data } from '../data/index.js'

const deleteUserById = (userId, password) => {
    return data.users.findOne({ _id: new data.ObjectId(userId) })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }

            if (user.password !== password) {
                throw new errors.AuthError('wrong password')
            }

            return data.posts.deleteMany({ author: userId })
                .catch(error => { throw new errors.ServerError(error.message) })
                .then(() => {
                    return data.users.deleteOne({ _id: new data.ObjectId(userId) })
                        .catch(error => { throw new errors.ServerError(error.message) })
                        .then((result) => {
                            if (result.deletedCount === 0) {
                                throw new errors.ServerError('Failed to delete user')
                            }
                            return
                        })
                })
        })
}

export default deleteUserById