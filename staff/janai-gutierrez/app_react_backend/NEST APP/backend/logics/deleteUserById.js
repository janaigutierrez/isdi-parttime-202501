import { errors, validator } from 'common'
import { data } from '../data/index.js'

const deleteUserById = (userId, password, callback) => {
    console.log(`[LOGIC] deleteUserById called - userId: ${userId}`)

    try {
        validator.id(userId)
        validator.password(password)

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

            if (user.password !== password) {
                console.error('[LOGIC] Password does not match')
                callback(new errors.AuthError('wrong password'))
                return
            }

            data.posts.deletePostsByAuthor(userId, (error) => {
                if (error) {
                    console.error('[LOGIC] Error deleting user posts:', error)
                    callback(error)
                    return
                }

                data.users.deleteUserById(userId, (error) => {
                    if (error) {
                        console.error('[LOGIC] Error in deleteUserById:', error)
                        callback(error)
                    } else {
                        console.log(`[LOGIC] User deleted: ${userId}`)
                        callback(null)
                    }
                })
            })
        })
    } catch (error) {
        console.error('[LOGIC] Error deleting user:', error)
        callback(error)
    }
}

export default deleteUserById