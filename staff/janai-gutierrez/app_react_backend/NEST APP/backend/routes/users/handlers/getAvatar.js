import { validator } from "common"
import logics from "../../../logics/index.js"

const getAvatar = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)
        logics.getAvatar(id, (error, retrievedAvatar) => {
            if (error) next(error)
            else res.status(200).send(retrievedAvatar)
        })

    } catch (error) {
        next(error)
    }
}

export default getAvatar