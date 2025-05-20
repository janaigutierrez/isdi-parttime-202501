import data from "../../data"
import { errors, validator } from "common"

const deletePost = (userId, postId) => {
    validator.id(userId)
    validator.id(postId)
    const post = data.posts.findPostById(postId)
    if (!post) throw new errors.ExistenceError('post not found')
    if (post.author !== userId) throw new AuthEror('no permissions')

    data.posts.deletePostById(postId)
}

export default deletePost