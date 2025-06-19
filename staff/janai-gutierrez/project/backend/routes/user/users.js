import { json, Router } from "express"
import handlers from './handlers/index.js'

const jsonBodyParser = json()
const userRouter = Router()

userRouter.post('/login', jsonBodyParser, handlers.loginUser)
userRouter.post('/register', jsonBodyParser, handlers.registerUser)
userRouter.get('/profile/:userId', handlers.getUserProfile)

export default userRouter 