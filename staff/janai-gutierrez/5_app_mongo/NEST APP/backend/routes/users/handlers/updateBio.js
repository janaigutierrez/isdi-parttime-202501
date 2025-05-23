import { validator } from "common"
import logics from "../../../logics/index.js"

const updateBio = (req, res, next) => {
    const userId = req.userId
    const { bio } = req.body

    try {
        validator.text(bio, 200, 0, 'bio')

        return logics.updateBio(userId, bio)
            .then(() => {
                res.status(200).send()
            })
            .catch(error => next(error))

    } catch (error) {
        next(error)
    }
}

export default updateBio