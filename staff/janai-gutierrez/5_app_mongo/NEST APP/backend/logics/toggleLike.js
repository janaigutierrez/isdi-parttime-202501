import { errors, validator } from 'common'
import { data } from '../data/index.js'

const toggleLike = (userId, postId, callback) => {
    console.log(`[LOGIC] toggleLike called - userId: ${userId} (type: ${typeof userId}), postId: ${postId} (type: ${typeof postId})`)
    try {
        validator.id(userId)
        validator.id(postId)

        if ((!data) || !data.posts) {
            console.error('[LOGIC] Error: data or data.posts is undefined')
            callback(new Error('Internal server error'))
            return
        }

        data.posts.findPostById(postId, (error, post) => {
            if (error) {
                console.error('[LOGIC] Error in findPostById:', error)
                callback(error)
                return
            }

            if (!post) {
                console.error('[LOGIC] Post not found')
                callback(new errors.ExistenceError('post not found'))
                return
            }

            if (!post.likes) post.likes = []

            const likeIndex = post.likes.indexOf(userId)

            if (likeIndex !== -1) {
                post.likes.splice(likeIndex, 1)
                console.log(`[LOGIC] User ${userId} removed like from post ${postId}`)
            } else {
                post.likes.push(userId)
                console.log(`[LOGIC] User ${userId} liked post ${postId}`)
            }

            data.posts.updatePostById(postId, post, (error) => {
                if (error) {
                    console.error('[LOGIC] Error in updatePostById:', error)
                    callback(error)
                } else {
                    console.log(`[LOGIC] Like toggled for post: ${postId}`)
                    callback(null)
                }
            })
        })
    } catch (error) {
        console.error('[LOGIC] Error toggling like:', error)
        callback(error)
    }
}

export default toggleLike