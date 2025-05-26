import logics from "../../../logics/index.js"
import { validator } from "common"

const getBio = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)

        return logics.getBio(id)
            .catch((error) => next(error))
            .then((retrievedBio) => { res.status(200).send(retrievedBio || '') })

    } catch (error) {
        next(error)
    }
}

export default getBio