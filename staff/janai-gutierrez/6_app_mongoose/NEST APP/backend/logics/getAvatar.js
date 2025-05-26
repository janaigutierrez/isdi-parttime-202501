import { errors } from 'common'
import { data } from "../data/index.js"

const getAvatar = (id) => {

    return data.users.findOne({ _id: new data.ObjectId(id) })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            if (!user.avatar || user.avatar === '') {
                return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=random`;
            }
            return user.avatar
        })
}

export default getAvatar