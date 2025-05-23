import { errors } from "common"
import { data } from "../data/index.js"

const createPost = (authorId, title, description, img) => {

    return data.users.findOne({ _id: new data.ObjectId(authorId) })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }
            const post = {

                likes: [],
                createdOn: new Date(),
                title,
                description,
                img,
                author: user._id
            }
            return data.posts.insertOne(post)
                .catch(error => { throw new errors.ServerError })

        })
}

export default createPost