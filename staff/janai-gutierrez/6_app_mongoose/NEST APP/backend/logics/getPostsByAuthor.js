import { errors } from "common"
import { data } from "../data/index.js"

const getPostsByAuthor = (loggedUserId, authorId) => {
    return data.users.findOne({ _id: new data.ObjectId(loggedUserId) })
        .catch((error) => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) {
                throw new errors.ExistenceError('user not found')
            }

            return data.posts.aggregate([
                {
                    $match: { author: new data.ObjectId(authorId) }  // Filtrar por autor
                },
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
                    return posts.map((post) => ({
                        ...post,
                        createdOn: new Date(post.createdOn).toLocaleString(),
                        isLiked: post.likes && post.likes.includes(loggedUserId)
                    }))
                })
        })
}

export default getPostsByAuthor