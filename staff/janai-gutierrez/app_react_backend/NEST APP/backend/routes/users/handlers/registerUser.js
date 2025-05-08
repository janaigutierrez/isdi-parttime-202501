import { validator } from 'common'
import logics from '../../../logics/index.js'


const registerUser = (req, res, next) => {
    const { email, password } = req.body

    try {
        validator.email(email)
        validator.password(password)

        const username = email.split('@')[0]

        validator.username(username)

        logics.registerUser(email, password, username, (error) => {
            if (error) {
                //
            } else {
                res.status(201).send()
            }
        })
    } catch (error) {
        next(error)

    }


}

export default registerUser