import { validator } from "common"
import logics from "../../../logics/index.js"

const updateBio = async (req, res, next) => {
    try {
        const userId = req.userId
        const { bio } = req.body

        validator.text(bio, 200, 0, 'bio')

        await logics.updateBio(userId, bio)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
}

export default updateBio