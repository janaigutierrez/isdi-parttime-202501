import { validator } from "common"
import logic from "../../../logics/index.js"

const createPost = (req, res, next) => {
    const { title, img, description } = req.body
    const authorId = req.userId
    try {
        validator.id(authorId)
        validator.text(title, 40, 1, 'Post-Title')
        validator.text(description, 210, 1, 'Post-Description')

        logic.createPost(authorId, title, description, img)
            .then((postId) => {
                res.status(201).json({
                    message: 'Post created successfully',
                    postId: postId
                })
            })
            .catch((error) => next(error))
    } catch (error) {
        next(error)
    }
}
export default createPost