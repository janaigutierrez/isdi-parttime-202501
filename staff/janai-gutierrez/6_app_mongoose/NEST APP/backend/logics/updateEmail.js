import { errors } from 'common'
import { data } from '../data/index.js'

const updateEmail = (userId, newEmail) => {
    return data.users.findOne({ email: newEmail, _id: { $ne: new data.ObjectId(userId) } })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((existingUser) => {
            if (existingUser) {
                throw new errors.ContentError(`email ${newEmail} already exists`)
            }

            return data.users.findOneAndUpdate(
                { _id: new data.ObjectId(userId) },
                { $set: { email: newEmail } }
            )
                .catch(error => { throw new errors.ServerError(error.message) })
                .then((result) => {
                    if (!result) {
                        throw new errors.ExistenceError('user not found')
                    }
                    return
                })
        })
}

export default updateEmail