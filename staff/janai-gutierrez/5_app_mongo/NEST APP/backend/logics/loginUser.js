import { data } from '../data/index.js'
import { errors } from 'common'

const loginUser = (email, password) => {
    return data.users.findOne({ email: email })
        .catch(error => { throw new errors.ServerError(error.message) })
        .then((user) => {
            if (!user) { throw new errors.ExistenceError('user not found') }
            if (user.password !== password) { throw new errors.AuthError('invalid credentials') }
            return user._id.toString()
        })



}
/*

data.users.findUserByEmail(email, (error, user) => {

    if (error) callback(error)
    else if (!user) callback(new errors.ExistenceError('user not found'))
    else {
        if (user.password !== password) callback(new errors.AuthError('invalid credentials'))
        else callback(null, user.id)
    }
})
}*/

export default loginUser
