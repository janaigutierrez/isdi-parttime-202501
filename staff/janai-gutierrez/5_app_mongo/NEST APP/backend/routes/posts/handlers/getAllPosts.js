import { validator } from "common"
import logic from "../../../logics/index.js"

const getAllPosts = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)

        return logic.getAllPosts(id)
            .then((posts) => res.status(200).send(JSON.stringify({ posts })))
            .catch((error) => next(error))

    } catch (error) {
        next(error)
    }
}

export default getAllPosts