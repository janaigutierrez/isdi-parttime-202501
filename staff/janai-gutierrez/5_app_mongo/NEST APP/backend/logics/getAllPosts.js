import { errors } from "common"
import { data } from "../data/index.js"

const getAllPosts = (userId) => {
    return data.users.findOne({ _id: new data.ObjectId(userId) })
        .catch((error) => {
            throw new errors.ServerError(error.message)
        })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }

            return data.posts.find({}).toArray()
                .catch(error => { throw new errors.ServerError(error.message) })
        })
        .then(posts => {
            if (!posts || posts.length === 0) {
                return []
            }
            posts.sort((post1, post2) => new Date(post2.createdOn) - new Date(post1.createdOn))

            return data.users.find({}).toArray()
                .then(users => {
                    return posts.map(post => {
                        const author = users.find(user => user._id.toString() === post.author.toString())

                        if (!author) {
                            throw new errors.ExistenceError('author not found')
                        }
                        return {
                            id: post._id.toString(),
                            title: post.title,
                            description: post.description,
                            img: post.img,
                            author: {
                                id: author._id.toString(),
                                username: author.username,
                                avatar: author.avatar
                            },
                            createdOn: new Date(post.createdOn).toLocaleString(),
                            likes: post.likes || [],
                            isLiked: post.likes ? post.likes.includes(userId) : false
                        }
                    })
                })
        })
}


export default getAllPosts