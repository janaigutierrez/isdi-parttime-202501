import { validator } from "common"
import logics from "../../../logics/index.js"

const getUsername = (req, res, next) => {
    const id = req.userId
    try {
        validator.id(id)
        return logics.getUsername(id)
            .then(username => res.status(200).send(username))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

export default getUsername