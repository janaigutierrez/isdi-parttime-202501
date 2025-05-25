import { validator } from 'common'
import logics from '../../../logics/index.js'

const registerUser = (req, res, next) => {
    const { email, password } = req.body
    try {
        validator.email(email)
        validator.password(password)

        const username = email.split('@')[0]

        validator.username(username)

        return logics.registerUser(email, password, username)
            .then((userId) => {
                res.status(201).send(userId)
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

export default registerUser