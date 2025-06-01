import logics from "../../../logics/index.js"
import { validator } from "common"

const getBio = async (req, res, next) => {
    try {
        const id = req.userId

        validator.id(id)

        const retrievedBio = await logics.getBio(id)
        res.status(200).send(retrievedBio || '')

    } catch (error) {
        next(error)
    }
}

export default getBio