// frontend/src/logic/posts/getAllPosts.js
import { validator } from "common"                // o bé import validator from "../../common/validators.js" si fas servir el paquet local
import getLoggedUserId from "../helpers/getLoggedUserId.js"

const API = import.meta.env.VITE_NEST_APP

export default function getAllPosts(callback) {
    const loggedUserId = getLoggedUserId()

    // Si no hi ha id vàlid, parem aquí
    try {
        validator.id(loggedUserId)
    } catch (error) {
        return callback(error)
    }

    fetch(`${API}/posts`, {
        method: "GET",
        headers: { Authorization: `Basic ${loggedUserId}` },
    })
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return res.json()
        })
        .then((body) => callback(null, body.posts))
        .catch((err) => callback(err))
}
