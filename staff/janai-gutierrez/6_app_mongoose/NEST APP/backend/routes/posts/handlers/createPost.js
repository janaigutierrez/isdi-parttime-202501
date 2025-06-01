import { validator } from "common"
import logic from "../../../logics/index.js"

const createPost = async (req, res, next) => {
    try {
        const { title, img, description } = req.body
        const authorId = req.userId

        validator.id(authorId)
        validator.text(title, 40, 1, 'Post-Title')
        validator.text(description, 210, 1, 'Post-Description')

        const postId = await logic.createPost(authorId, title, description, img)

        res.status(201).json({
            message: 'Post created successfully',
            postId: postId
        })

    } catch (error) {
        next(error)
    }
}

export default createPost