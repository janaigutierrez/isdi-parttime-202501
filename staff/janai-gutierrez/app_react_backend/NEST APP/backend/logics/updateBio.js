import { errors } from "common";
import { data } from '../data/index.js'

const updateBio = (userId, newBio, callback) => {
    console.log(`[LOGIC] Updating bio for user ${userId}`)

    data.users.findUserById(userId, (error, user) => {
        if (error) {
            callback(error)
            return
        }
        if (!user) {
            callback(new errors.ExistenceError('user not found'))
            return
        }
        user.bio = newBio

        data.users.updateUserById(userId, user, (updateError) => {
            if (updateError) {
                callback(updateError)
            } else {
                console.log(`[LOGIC] Bio updated: ${newBio}`)
                callback(null)

            }

        })
    })
}

export default updateBio