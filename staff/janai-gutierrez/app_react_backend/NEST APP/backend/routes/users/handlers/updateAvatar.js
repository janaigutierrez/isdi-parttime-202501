import { validator } from "common";
import logics from "../../../logics/index.js";

const updateAvatar = (req, res, next) => {
    const userId = req.userId
    const { avatar } = req.body

    console.log(`[HANDLER] updateAvatar - userId: ${userId}`)

    try {
        validator.id(userId)
        logics.updateAvatar(userId, avatar, (error) => {
            if (error) {
                console.error('[HANDLER] Error in updateAvatar:', error)
                next(error)
            } else {
                console.log('[HANDLER] Avatar updated successfully')
                res.status(200).send()
            }
        })
    } catch (error) {
        console.error('[HANDLER] unexpected error:', error)
        next(error)
    }
}

export default updateAvatar