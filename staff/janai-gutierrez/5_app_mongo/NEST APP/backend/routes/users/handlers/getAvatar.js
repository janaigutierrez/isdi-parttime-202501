import { validator } from "common"
import logics from "../../../logics/index.js"

const getAvatar = (req, res, next) => {
    const id = req.userId
    try {
        validator.id(id)
        return logics.getAvatar(id)
            .then(avatar => res.status(200).send(avatar))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
export default getAvatar