import { errors } from 'common'
import { data } from "../data/index.js"

const getAvatar = (id, callback) => {
    console.log(`[LOGIC] getAvatar llamado con ID: ${id}, tipo: ${typeof id}`);

    data.users.findUserById(id, (error, user) => {
        console.log(`[LOGIC] Resultado de findUserById:`, { error, user });


        if (error) {
            console.log(`[LOGIC] Error encontrado:`, error);
            callback(error)

        }

        else if (!user) {
            console.log(`[LOGIC] Usuario no encontrado`);

            callback(new errors.ExistenceError('user not found'))
        }

        else {
            console.log(`[LOGIC] Usuario encontrado:`, user);
            console.log(`[LOGIC] Avatar del usuario: "${user.avatar}"`)

            if (!user.avatar || user.avatar === '') {
                const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=random`;
                console.log(`[LOGIC] Avatar vacío, devolviendo default: ${defaultAvatar}`);
                callback(null, defaultAvatar);

            } else {
                console.log(`[LOGIC] Devolviendo avatar existente: ${user.avatar}`);

                callback(null, user.avatar)
            }
        }
    })
}


export default getAvatar