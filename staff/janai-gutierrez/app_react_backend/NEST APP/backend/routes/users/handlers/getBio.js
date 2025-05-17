import logics from "../../../logics/index.js"
import { validator } from "common"

const getBio = (req, res, next) => {
    const id = req.userId

    console.log(`[HANDLER] getBio - ID retrieved: ${id}`)

    try {
        validator.id(id)

        logics.getBio(id, (error, retrievedBio) => {
            if (error) {
                console.log(`[HANDLER] Error retrieving bio:`, error.message)
                next(error)
            } else {
                console.log(`[HANDLER] Bio retrieved: "${retrievedBio || ''}"`)
                res.status(200).send(retrievedBio || '')
            }
        })
    } catch (error) {
        console.log(`[HANDLER] Validating error:`, error.message)
        next(error)
    }
}

export default getBio