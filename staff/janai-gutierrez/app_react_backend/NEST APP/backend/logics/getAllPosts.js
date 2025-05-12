import { errors } from "common"
import { data } from "../data/index.js"

const getAllPosts = (userId, callback) => {
    data.users.findUserById(userId, (error, user) => {
        if (error) callback(error)
        else {
            if (!user) callback(new errors.ExistenceError('user not found'))
            else {
                data.posts.findPost((error, posts) => {
                    if (error) callback(error)
                    else {
                        if (posts.length > 0) posts.sort((item1, item2) => new Date(item2.createdOn) - new Date(item1.createdOn))

                        data.users.getAllUsers((error, users) => {
                            if (error) callback(error)
                            else {
                                for (let i = 0; i < posts.length; i++) {
                                    const author = users.find(user => user.id === posts[i].author)
                                    if (!author) callback(new errors.ExistenceError('author not found'))
                                    else {
                                        posts[i].author = { id: author.id, username: author.username, avatar: author.avatar }
                                        const date = new Date(posts[i].createdOn)
                                        posts[i].createdOn = date.toLocaleString()
                                        if (posts[i].likes.length > 0 && posts[i].likes.includes(userId)) {
                                            posts[i].isLiked = true
                                        } else {
                                            posts[i].isLiked = false
                                        }

                                    }
                                }

                                callback(null, posts)
                            }
                        })


                    }
                })
            }
        }
    })
}

export default getAllPosts