import errors from "common/errors.js"
import { data } from "../data/index.js"

const updateUsername = (id, newUsername, callback) => {
    data.users.findUserById(id, (error, user) => {
        if (error) callback(error)
        else if (!user) callback(new errors.ExistenceError("user not found"))
        else {
            user.username = newUsername
            data.users.updateUsername(id, user, (error, user) => {
                if (error) callback(error)
                else if (!user) callback(new errors.ExistenceError("unexpected error on update username"))
                else callback(null)

            })

        }
    })
}

export default updateUsername