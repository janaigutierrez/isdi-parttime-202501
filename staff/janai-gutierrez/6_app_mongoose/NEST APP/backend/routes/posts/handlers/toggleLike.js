import { validator } from "common"
import logics from "../../../logics/index.js"

const toggleLike = async (req, res, next) => {
    try {
        const userId = req.userId
        const postId = req.params.postId

        validator.id(userId)
        validator.id(postId)

        await logics.toggleLike(userId, postId)
        res.status(200).send()

    } catch (error) {
        next(error)
    }
}

export default toggleLike