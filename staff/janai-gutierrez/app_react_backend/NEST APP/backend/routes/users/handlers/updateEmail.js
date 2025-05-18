import { validator } from "common";
import logics from "../../../logics/index.js";

const updateEmail = (req, res, next) => {
    const userId = req.userId
    const { email } = req.body

    console.log(`[HANDLER] updateEmail - userId: ${userId}, new email: ${email}`)

    try {
        validator.id(userId)
        validator.email(email)

        logics.updateEmail(userId, email, (error) => {
            if (error) {
                console.error('[HANDLER] Error in updateEmail:', error)
                next(error)
            } else {
                console.log('[HANDLER] Email updated successfully')
                res.status(200).send()
            }
        })
    } catch (error) {
        console.error('[HANDLER] Error validatinc:', error)
        next(error)
    }
}

export default updateEmail