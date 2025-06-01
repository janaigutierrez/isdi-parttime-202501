import logic from "../../../logics/index.js"

const getPostsByAuthor = async (req, res, next) => {
    try {
        const authorId = req.params.authorId || req.userId

        const posts = await logic.getPostsByAuthor(authorId)

        res.status(200).send(posts)
    } catch (error) {
        next(error)
    }
}

export default getPostsByAuthor