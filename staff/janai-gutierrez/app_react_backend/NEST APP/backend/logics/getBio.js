// backend/logics/getBio.js (versión funcional completa)
import { errors } from 'common'
import { data } from '../data/index.js'

const getBio = (userId, callback) => {
    console.log(`[LOGIC] getBio llamado con userId: ${userId}`)

    try {
        // Validar que data.users existe
        if (!data || !data.users) {
            console.error('[LOGIC] Error: data o data.users no está definido')
            callback(new Error('Internal server error'))
            return
        }

        // Usar findUserById con callback
        data.users.findUserById(userId, (error, user) => {
            if (error) {
                console.error('[LOGIC] Error en findUserById:', error)
                callback(error)
                return
            }

            if (!user) {
                console.error('[LOGIC] Usuario no encontrado')
                callback(new errors.ExistenceError('user not found'))
                return
            }

            console.log('[LOGIC] Usuario encontrado:', user)

            // Devolver la bio o cadena vacía si no existe
            const bio = user.bio || ''
            console.log(`[LOGIC] Bio: "${bio}"`)
            callback(null, bio)
        })
    } catch (error) {
        console.error('[LOGIC] Error inesperado:', error)
        callback(error)
    }
}

export default getBio