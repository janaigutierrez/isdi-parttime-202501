import { errors } from "common"
import { data } from "../data/index.js"


const updateAvatar = (userId, newAvatar, callback) => {
    console.log(`[LOGIC] updateAvatar called - userId: ${userId}`)
    try {
        validator.id(userId)

        if (newAvatar && typeof newAvatar !== 'string') {
            callback(new errors.ContentError('avatar must be a string'))
            return
        }

        if (!data || !data.users) {
            console.error('[LOGIC] data or data.users is undefined')
            callback(new Error('Internal server error'))
            return
        }

        data.users.findUserById(userId, (error, user) => {
            if (error) {
                console.error('[LOGIC] Error in findUserById:', error)
                callback(error)
                return
            }

            if (!user) {
                console.error('[LOGIC] User not found')
                callback(new errors.ExistenceError('user not found'))
                return

            }

            user.avatar = newAvatar
            data.users.updateUserById(userId, user, (error) => {
                if (error) {
                    console.error('[LOGIC] Error updating user:', error)
                    callback(error)
                } else {
                    console.log('[LOGIC] Avatar updated successfully')
                    callback(null)
                }
            })


        })

    } catch (error) {
        console.error('[LOGIC] unexpected error:', error)
        callback(error)
    }
}

export default updateAvatar