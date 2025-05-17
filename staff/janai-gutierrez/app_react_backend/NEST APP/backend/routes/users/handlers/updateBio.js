import { validator } from "common"
import logics from "../../../logics/index.js"

const updateBio = (req, res, next) => {
    console.log('[HANDLER] Logics disponibles:', Object.keys(logics))
    console.log('[HANDLER] logics.updateBio existe?', typeof logics.updateBio)
    const userId = req.userId
    const { bio } = req.body
    console.log('Request body:', req.body)
    console.log('User ID from token:', req.userId)

    console.log(`[HANDLER] Updating bio for user ${userId}`)

    try {
        validator.text(bio, 200, 0, 'bio')

        logics.updateBio(userId, bio, (error) => {
            if (error) {
                console.log(`[HANDLER] Error updating bio:`, error)
                next(error)
            } else {
                console.log(`[HANDLER] Bio updated successfully`)
                res.status(200).send()
            }
        })
    } catch (error) {
        console.log(`[HANDLER] Error validating`, error)
        next(error)
    }
}

export default updateBio