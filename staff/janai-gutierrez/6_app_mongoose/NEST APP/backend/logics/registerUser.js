import { data } from '../data/index.js'
import { errors } from 'common'

const registerUser = async (email, password, username) => {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await data.users.findOne({ email: email })
        if (existingUser) {
            throw new errors.DuplicityError('user already exists')
        }

        // Crear nuevo usuario
        const newUser = await data.users.create({
            email,
            password,
            username
        })

        return newUser._id.toString()
    } catch (error) {
        if (error.name === 'DuplicityError') {
            throw error
        }
        throw new errors.ServerError(error.message)
    }
}

export default registerUser