import { validator } from 'common'
import logics from '../../../logics/index.js'

const deleteUserById = (req, res, next) => {
    const userId = req.userId
    const { password } = req.body

    try {
        validator.id(userId)
        validator.password(password)

        return logics.deleteUserById(userId, password)
            .then(() => res.status(200).send())
            .catch((error) => next(error))

    } catch (error) {
        next(error)
    }
}

export default deleteUserById