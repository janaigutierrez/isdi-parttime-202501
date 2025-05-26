import logics from '../../../logics/index.js'
import { validator } from 'common'


const loginUser = (req, res, next) => {
    const { email, password } = req.body
    try {
        validator.email(email)
        validator.password(password)

        return logics.loginUser(email, password)
            .then((id) => res.status(200).send(id))
            .catch((error) => next(error))

    } catch (error) {
        next(error)
    }
}

export default loginUser