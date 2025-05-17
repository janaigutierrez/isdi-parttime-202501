import data from "../../data";
import { errors, validator } from "common"

const API = import.meta.env.VITE_NEST_APP


const getUserAvatarById = (id, callback) => {

    console.log(`getAvatar llamado con ID: ${id}`);
    console.log(`API URL: ${API}`);

    try {
        validator.id(id)

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {

                console.log(`[FRONTEND] Status: ${xhr.status}`);
                console.log(`[FRONTEND] ResponseText: "${xhr.responseText}"`);
                console.log(`[FRONTEND] Response: "${xhr.response}"`);
                console.log(`[FRONTEND] ResponseType: ${xhr.responseType}`);
                console.log(`[FRONTEND] Headers:`, xhr.getAllResponseHeaders());

                if (xhr.status === 200) {

                    const avatar = xhr.responseText || xhr.response
                    console.log(`[FRONTEND] Avatar extraído: "${avatar}"`);
                    console.log(`[FRONTEND] Tipo: ${typeof avatar}`);
                    console.log(`[FRONTEND] Longitud: ${avatar ? avatar.length : 0}`);

                    if (!avatar || avatar === '' || avatar === 'undefined') {
                        console.log('[FRONTEND] Avatar vacío o undefined');

                        callback(new errors.ExistenceError('avatar not found'))
                        return
                    }
                    callback(null, avatar)

                } else if (xhr.status === 404) {
                    callback(new errors.ExistenceError('avatar not found'))
                } else {
                    callback(new Error(`error ${xhr.status}: ${xhr.statusText}`))
                }
            }
        }

        const url = `${API}/users/avatar`
        console.log(`Haciendo petición a: ${url}`);


        xhr.open('GET', `${API}/users/avatar`)
        xhr.setRequestHeader('Authorization', `Bearer ${id}`)
        xhr.send()

    } catch (error) {

        console.error('Error en getUserAvatarById:', error);
        callback(error)
    }
}
export default getUserAvatarById