import { data } from '../data/index.js'
import { errors } from 'common'

const registerUser = (email, password, username) => {

    return data.users.findOne({ email: email })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (user) { throw new errors.DuplicityError('user already exists') }

            return data.users.insertOne({ email, password, username })
                .catch(error => { throw new errors.ServerError(error.message) })
                .then((result) => {
                    const userId = result.insertedId.toString()
                    return userId
                })
        })
}

export default registerUser