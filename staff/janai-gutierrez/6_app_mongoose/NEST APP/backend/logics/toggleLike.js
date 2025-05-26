import { errors } from 'common'
import { data } from '../data/index.js'

const toggleLike = (userId, postId) => {
    return data.posts.findOne({ _id: new data.ObjectId(postId) })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((post) => {
            if (!post) {
                throw new errors.ExistenceError('post not found')
            }

            if (!post.likes) post.likes = []

            const likeIndex = post.likes.indexOf(userId)

            if (likeIndex !== -1) {
                post.likes.splice(likeIndex, 1)
            } else {
                post.likes.push(userId)
            }

            return data.posts.findOneAndUpdate(
                { _id: new data.ObjectId(postId) },
                { $set: { likes: post.likes } }
            )
                .catch(error => { throw new errors.ServerError(error.message) })
                .then(() => {
                    return
                })
        })
}

export default toggleLike