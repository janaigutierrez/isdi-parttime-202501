import { validator } from "common"
import logics from "../../../logics/index.js"

const getAvatar = (req, res, next) => {
    const id = req.userId

    console.log(`Handler getAvatar - ID recibido: ${id}`);
    console.log(`[HANDLER] Tipo de ID: ${typeof id}`);

    try {
        validator.id(id)
        logics.getAvatar(id, (error, retrievedAvatar) => {
            if (error) {
                console.log(`Error en getAvatar: ${error.message}`);
                next(error)
            } else {
                console.log(`Avatar recuperado: ${retrievedAvatar}`);
                console.log(`[HANDLER] Tipo de avatar: ${typeof retrievedAvatar}`);
                console.log(`[HANDLER] Longitud del avatar: ${retrievedAvatar ? retrievedAvatar.length : 0}`);
                if (!retrievedAvatar || retrievedAvatar === '') {
                    const defaultAvatar = `https://ui-avatars.com/api/?name=User&background=random`;
                    console.log(`[HANDLER] Enviando avatar por defecto: ${defaultAvatar}`);
                    res.status(200).send(defaultAvatar)
                }
                console.log(`[HANDLER] Enviando avatar: ${retrievedAvatar}`);

                res.status(200).send(retrievedAvatar)
            }
        })

    } catch (error) {
        console.error(`Error de validación: ${error.message}`);
        next(error)
    }
}

export default getAvatar