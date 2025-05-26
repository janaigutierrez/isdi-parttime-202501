import { errors } from 'common'
import { data } from '../data/index.js'

const updatePassword = (userId, newPassword, oldPassword) => {
    return data.users.findOne({ _id: new data.ObjectId(userId) })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }

            if (user.password !== oldPassword) {
                throw new errors.AuthError('wrong password')
            }

            return data.users.findOneAndUpdate(
                { _id: new data.ObjectId(userId) },
                { $set: { password: newPassword } }
            )
                .catch(error => { throw new errors.ServerError(error.message) })
                .then((result) => {
                    if (!result) {
                        throw new errors.ServerError('Failed to update password')
                    }
                    return
                })
        })
}

export default updatePassword