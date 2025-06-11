import { errors } from "common"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginUser = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new errors.ExistenceError('user not found')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        throw new errors.AuthError('invalid credentials')
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        totalXP: user.totalXP,
        currentLevel: user.currentLevel,
        stats: user.stats
    }

    return { user: userResponse, token }
}

export default loginUser