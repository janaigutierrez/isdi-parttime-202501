import { Schema, model } from "mongoose";

export const { ObjectId } = Schema.Types

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
}, Timestamp)

export const User = mongoose.model('User', userSchema)

const postSchema = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [ObjectId],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    }
}, Timestamp)

export const Post = mongoose.model('Post', postSchema)

