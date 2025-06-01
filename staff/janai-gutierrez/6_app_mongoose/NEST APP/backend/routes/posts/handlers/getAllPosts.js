import { validator } from "common"
import logic from "../../../logics/index.js"

const getAllPosts = async (req, res, next) => {
    try {
        const id = req.userId

        validator.id(id)

        const posts = await logic.getAllPosts(id)
        res.status(200).send(JSON.stringify({ posts }))

    } catch (error) {
        next(error)
    }
}

export default getAllPosts