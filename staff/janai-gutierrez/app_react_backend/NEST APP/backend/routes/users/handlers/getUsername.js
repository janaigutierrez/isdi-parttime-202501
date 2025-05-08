import { validator } from "common"
import logics from "../../../logics/index.js"

const getUsername = (req, res, next) => {
    const id = req.userId
    try {
        validator.id(id)
        logics.getUsername(id, (error, username) => {
            if (error) next(error)
            else res.status(200).send(username)
        })

    } catch (error) {
        next(error)
    }
}

export default getUsername