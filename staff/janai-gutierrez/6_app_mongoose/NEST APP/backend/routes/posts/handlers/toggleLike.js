import { validator } from "common";
import logics from "../../../logics/index.js";

const toggleLike = (req, res, next) => {
    const userId = req.userId
    const postId = (req.params.postId)

    try {
        validator.id(userId)
        validator.id(postId)

        logics.toggleLike(userId, postId)

            .then(() => res.status(200).send())
            .catch((error) => next(error))

    } catch (error) {
        next(error)
    }
}

export default toggleLike