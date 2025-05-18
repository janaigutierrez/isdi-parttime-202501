import { validator } from "common";
import logics from "../../../logics/index.js";

const updatePassword = (req, res, next) => {
    const userId = req.userId
    const { newPassword, oldPassword } = req.body

    console.log(`[HANDLER] updatePassword - userId: ${userId}`)

    try {
        validator.id(userId)
        validator.password(newPassword)
        validator.password(oldPassword)

        logics.updatePassword(userId, newPassword, oldPassword, (error) => {
            if (error) {
                console.error('[HANDLER] Error in updatePassword:', error)
                next(error)
            } else {
                console.log('[HANDLER] Password updated succesfully')
                res.status(200).send()
            }
        })
    } catch (error) {
        console.error('[HANDLER] Error validating:', error)
        next(error)
    }

}

export default updatePassword