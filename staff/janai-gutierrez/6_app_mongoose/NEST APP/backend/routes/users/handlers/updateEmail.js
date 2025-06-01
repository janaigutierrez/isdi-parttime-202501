import { validator } from "common"
import logic from "../../../logics/index.js"

const updateEmail = async (req, res, next) => {
    try {
        const userId = req.userId
        const { email } = req.body

        validator.id(userId)
        validator.email(email)

        await logic.updateEmail(userId, email)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
}

export default updateEmail