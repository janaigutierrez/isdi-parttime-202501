import logics from '../../../logics/index.js'
import { validator } from 'common'


const loginUser = (req, res, next) => {
    const { email, password } = req.body

    try {
        validator.email(email)
        validator.password(password)

        logics.loginUser(email, password, (error, id) => {
            if (error) next(error)
            else res.status(200).send(id)
        })

    } catch (error) {
        next(error)
    }
}

export default loginUser