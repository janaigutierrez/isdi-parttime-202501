import { validator } from "common"
import logic from "../../../logics/index.js"

const updatePassword = (req, res, next) => {
    const userId = req.userId
    const { newPassword, oldPassword } = req.body

    try {
        validator.id(userId)
        validator.password(newPassword)
        validator.password(oldPassword)

        logic.updatePassword(userId, newPassword, oldPassword)
            .then(() => {
                res.status(200).send()
            })
            .catch((error) => next(error))
    } catch (error) {
        next(error)
    }
}

export default updatePassword