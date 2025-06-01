import { validator } from "common"
import logics from "../../../logics/index.js"

const getUsername = async (req, res, next) => {
    try {
        const id = req.userId
        validator.id(id)

        const username = await logics.getUsername(id)
        res.status(200).send(username)
    } catch (error) {
        next(error)
    }
}

export default getUsername