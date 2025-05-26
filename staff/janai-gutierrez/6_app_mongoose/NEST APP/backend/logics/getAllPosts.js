import { errors } from "common"
import { data } from "../data/index.js"

const getAllPosts = (userId) => {
    return data.users.findOne({ _id: new data.ObjectId(userId) })
        .catch((error) => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }

            return data.posts.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $addFields: {
                        "id": "$_id",
                        "author.id": "$author._id"
                    }
                },
                {
                    $sort: { createdOn: -1 }
                },
                {
                    $project: {
                        "_id": 0,
                        "author.password": 0,
                        "author.email": 0,
                        "author._id": 0,
                        "author.following": 0,
                        "author.followers": 0
                    }
                }
            ]).toArray()
                .catch((error) => { throw new errors.ServerError(error.message) })
                .then(posts => {
                    return posts.map((post) => {
                        const date = new Date(post.createdOn)
                        return {
                            ...post,
                            createdOn: date.toLocaleString(),
                            isLiked: post.likes && post.likes.includes(userId)
                        }
                    })
                })
        })
}

export default getAllPosts