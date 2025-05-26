import { errors } from 'common'
import { data } from '../data/index.js'

const getUsername = (id) => {
    return data.users.findOne({ _id: new data.ObjectId(id) })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            return user.username
        })
}
export default getUsername