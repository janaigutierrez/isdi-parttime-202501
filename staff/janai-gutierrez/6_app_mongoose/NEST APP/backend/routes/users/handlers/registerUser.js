import { validator } from 'common'
import logics from '../../../logics/index.js'

const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        validator.email(email)
        validator.password(password)

        const username = email.split('@')[0]
        validator.username(username)

        const userId = await logics.registerUser(email, password, username)
        res.status(201).send(userId)
    } catch (error) {
        next(error)
    }
}

export default registerUser