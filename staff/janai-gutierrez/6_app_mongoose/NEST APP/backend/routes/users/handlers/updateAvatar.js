import { validator } from "common"
import logics from "../../../logics/index.js"

const updateAvatar = async (req, res, next) => {
    try {
        const id = req.userId
        const { avatar } = req.body

        validator.id(id)

        await logics.updateAvatar(id, avatar)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
}

export default updateAvatar