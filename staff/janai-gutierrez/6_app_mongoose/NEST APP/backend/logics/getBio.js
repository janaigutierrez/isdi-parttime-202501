import { errors } from 'common'
import { data } from '../data/index.js'

const getBio = (userId) => {

    return data.users.findOne({ _id: new data.ObjectId(userId) })
        .catch(error => { throw new errors.ServerErrorError(error.message) })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }
            return user.bio || ''
        })
}

export default getBio