import { validator } from 'common'
import logics from '../../../logics/index.js'

const deleteUserById = (req, res, next) => {
    const userId = req.userId
    const { password } = req.body

    console.log(`[HANDLER] deleteUserById called - userId: ${userId}`)

    try {
        validator.id(userId)
        validator.password(password)

        logics.deleteUserById(userId, password, (error) => {
            if (error) {
                console.error('[HANDLER] Error in deleteUserById:', error)
                next(error)

            } else {
                console.log(`[HANDLER] User deleted: ${userId}`)
                res.status(200).send()
            }
        })

    } catch (error) {
        console.error('[HANDLER] Error validating:', error)
        next(error)
    }
}

export default deleteUserById