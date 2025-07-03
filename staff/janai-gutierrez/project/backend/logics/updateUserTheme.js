import User from '../models/User.js'

const validateId = (id, field) => {
    if (typeof id !== 'string' || id.trim().length === 0) {
        throw new Error(`${field} is required and must be a non-empty string`)
    }
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new Error(`${field} must be a valid ObjectId`)
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
    }
}

class ExistenceError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ExistenceError'
    }
}

const updateUserTheme = async (userId, theme) => {
    validateId(userId, 'userId')

    const validThemes = ['default', 'dark', 'library', 'mystic', 'medieval', 'warrior', 'academy']
    if (!validThemes.includes(theme)) {
        throw new ValidationError(`Invalid theme. Valid themes: ${validThemes.join(', ')}`)
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ExistenceError('User not found')
    }

    if (!user.preferences) {
        user.preferences = {}
    }
    user.preferences.theme = theme
    await user.save()

    return {
        message: 'Theme updated successfully',
        theme: user.preferences.theme,
        user: user.toJSON()
    }
}

export default updateUserTheme