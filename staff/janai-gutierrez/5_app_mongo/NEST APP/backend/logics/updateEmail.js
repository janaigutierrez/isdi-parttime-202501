import { errors, validator } from 'common'
import { data } from '../data/index.js'

const updateEmail = (userId, newEmail, callback) => {
    console.log(`[LOGIC] updateEmail called - userId: ${userId}, newEmail: ${newEmail}`)

    try {
        validator.id(userId)
        validator.email(newEmail)

        if ((!data) || !data.users) {
            console.error('[LOGIC] Error: data or data.users is undefined')
            callback(new Error('Internal server error'))
            return
        }

        data.users.getAllUsers((error, users) => {
            if (error) {
                console.error('[LOGIC] Error retrieving users:', error)
                callback(error)
                return
            }
            const emailExists = users.some(user =>
                user.id !== userId && user.email === newEmail
            )
            if (emailExists) {
                console.error('[LOGIC] mail is already in use:', newEmail)
                callback(new errors.ContentError(`email ${newEmail} already exists`))
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

                user.email = newEmail
                data.users.updateUserById(userId, user, (error) => {
                    if (error) {
                        console.error('[LOGIC] Error in updateUserById:', error)
                        callback(error)
                    } else {
                        console.log(`[LOGIC] Mail updated: ${newEmail}`)
                        callback(null)
                    }
                })
            })
        })
    } catch (error) {
        console.error('[LOGIC] Error updating users:', error)
        callback(error)

    }
}

export default updateEmail