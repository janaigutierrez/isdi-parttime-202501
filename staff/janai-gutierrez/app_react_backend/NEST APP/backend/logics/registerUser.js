import { data } from '../data/index.js'
import { errors } from 'common'


const registerUser = (email, password, username, callback) => {
    data.users.findUserByEmail(email, (error, user) => {
        if (error) callback(error)
        else if (user) callback(new errors.DuplicityError('user already exists'))
        else {
            data.users.createUser({ email, password, username }, (error, user) => {
                if (error) callback(error)
                else if (user) callback(null)
                else {
                    callback(new errors.ServerError('unexpected error on register user)'))
                }
            })
        }

    })

}

export default registerUser
