import { connect } from 'mongoose'
import { User, Post, ObjectId } from './models.js'
import 'dotenv/config'

const url = 'mongodb://localhost:27017'
const dbName = 'nest-app'

export const data = {
    users: User, posts: Post,
    ObjectId,
    connect: () => {
        return connect(`${url}/${dbName}`)
            .catch(error => console.error(error))
            .then(() => {
                console.info(`Connected to Mongo Server ${url}/${dbName}`)
            })
    }
}
