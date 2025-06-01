import { validator } from "common"
import logics from "../../../logics/index.js"

const updateUsername = async (req, res, next) => {
    try {
        const id = req.userId
        const { username } = req.body

        validator.id(id)
        validator.username(username)

        await logics.updateUsername(id, username)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
}

export default updateUsername