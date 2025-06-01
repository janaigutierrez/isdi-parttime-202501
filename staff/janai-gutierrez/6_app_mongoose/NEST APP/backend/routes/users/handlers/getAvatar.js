import { validator } from "common"
import logics from "../../../logics/index.js"

const getAvatar = async (req, res, next) => {
    try {
        const id = req.userId

        validator.id(id)

        const avatar = await logics.getAvatar(id)
        res.status(200).send(avatar)

    } catch (error) {
        next(error)
    }
}

export default getAvatar