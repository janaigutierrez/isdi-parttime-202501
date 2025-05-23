import { errors } from "common";
import { data } from '../data/index.js'

const updateBio = (userId, newBio) => {

    return data.users.findOneAndUpdate({ _id: new data.ObjectId(userId) }, { $set: { bio: newBio } })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((result) => {
            if (!result) {
                throw new errors.ExistenceError('user not found')
            }
            return
        })
}

export default updateBio