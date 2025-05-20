import { validator } from "common";
import logics from "../../../logics/index.js";

const toggleLike = (req, res, next) => {
    const userId = req.userId
    const postId = Number(req.params.postId)

    console.log(`[HANDLER] toggleLike - userId: ${userId} (type: ${typeof userId}), postId: ${postId} (type: ${typeof postId})`)
    try {
        validator.id(userId)
        validator.id(postId)

        logics.toggleLike(userId, postId, (error) => {
            if (error) {
                console.error('[HANDLER] Error in toggleLike:', error)
                next(error)
            } else {
                console.log('[HANDLER] Like toggled successfully')
                res.status(200).send()
            }
        })
    } catch (error) {
        console.error('[HANDLER] Error validating:', error)
        next(error)
    }
}

export default toggleLike