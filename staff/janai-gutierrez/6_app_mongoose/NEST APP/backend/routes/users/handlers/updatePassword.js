import { validator } from "common"
import logic from "../../../logics/index.js"

const updatePassword = async (req, res, next) => {
    try {
        const userId = req.userId
        const { newPassword, oldPassword } = req.body

        validator.id(userId)
        validator.password(newPassword)
        validator.password(oldPassword)

        await logic.updatePassword(userId, newPassword, oldPassword)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
}

export default updatePassword