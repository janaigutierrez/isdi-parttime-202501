import { errors } from "common"
import { data } from "../data/index.js"

const updateAvatar = (id, newAvatar) => {

    return data.users.findOneAndUpdate({ _id: new data.ObjectId(id) }, { $set: { avatar: newAvatar } })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((oldAvatar) => {
            if (!oldAvatar) throw new errors.ExistenceError('user not found')
            return
        })
}

export default updateAvatar