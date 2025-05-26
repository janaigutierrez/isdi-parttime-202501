import { validator } from "common"
import logic from "../../../logics/index.js"

const updateEmail = (req, res, next) => {
    const userId = req.userId
    const { email } = req.body

    try {
        validator.id(userId)
        validator.email(email)

        logic.updateEmail(userId, email)
            .then(() => {
                res.status(200).send()
            })
            .catch((error) => next(error))
    } catch (error) {
        next(error)
    }
}

export default updateEmail