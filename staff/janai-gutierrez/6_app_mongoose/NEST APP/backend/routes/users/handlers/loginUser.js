import logics from '../../../logics/index.js'
import { validator } from 'common'

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        validator.email(email)
        validator.password(password)

        const userId = await logics.loginUser(email, password)
        res.status(200).send(userId)
    } catch (error) {
        next(error)
    }
}

export default loginUser