import { validator } from 'common'
import logics from '../../../logics/index.js'

const deleteUserById = async (req, res, next) => {
    try {
        const userId = req.userId
        const { password } = req.body

        validator.id(userId)
        validator.password(password)

        await logics.deleteUser(userId, password)
        res.status(200).send()

    } catch (error) {
        next(error)
    }
}

export default deleteUserById