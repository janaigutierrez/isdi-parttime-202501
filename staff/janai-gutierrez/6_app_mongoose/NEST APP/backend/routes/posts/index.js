import { json, Router } from "express"
import handlers from "./handlers/index.js"
import extractId from "../../middlewares/extractId.js"

const jsonBodyParser = json()
const postRouter = Router()

postRouter.post('/', jsonBodyParser, extractId, handlers.createPost)

postRouter.get('/', extractId, handlers.getAllPosts)
postRouter.get('/my', extractId, handlers.getPostsByAuthor)
postRouter.get('/author/:authorId', extractId, handlers.getPostsByAuthor)

postRouter.patch('/:postId/like', extractId, handlers.toggleLike)


export default postRouter