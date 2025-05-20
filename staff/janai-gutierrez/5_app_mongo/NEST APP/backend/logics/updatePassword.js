import { errors, validator } from 'common'
import { data } from '../data/index.js'

const updatePassword = (userId, newPassword, oldPassword, callback) => {
    console.log(`[LOGIC] updatePassword called - userId: ${userId}`)

    try {
        validator.id(userId)
        validator.password(newPassword)
        validator.password(oldPassword)

        if ((!data) || !data.users) {
            console.error('[LOGIC] Error: data or data.users is undefined')
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

            if (user.password !== oldPassword) {
                console.error('[LOGIC] Current password does not match')
                callback(new errors.AuthError('wrong password'))
                return
            }

            user.password = newPassword

            data.users.updateUserById(userId, user, (error) => {
                if (error) {
                    console.error('[LOGIC] Error in updateUserById:', error)
                    callback(error)
                } else {
                    console.log(`[LOGIC] Password updated for user: ${userId}`)
                    callback(null)
                }
            })
        })
    } catch (error) {
        console.error('[LOGIC] Error updating password:', error)
        callback(error)
    }
}

export default updatePassword