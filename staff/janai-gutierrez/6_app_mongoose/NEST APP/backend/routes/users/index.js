import { Router } from 'express';
import handlers from './handlers/index.js';
import express from 'express';
import extractId from '../../middlewares/extractId.js';

const jsonBodyParser = express.json()
const userRouter = Router()

userRouter.post('/', jsonBodyParser, handlers.registerUser)
userRouter.post('/auth', jsonBodyParser, handlers.loginUser)

userRouter.get('/username', extractId, handlers.getUsername)
userRouter.get('/avatar', extractId, handlers.getAvatar)
userRouter.get('/bio', extractId, handlers.getBio)

userRouter.patch('/username', jsonBodyParser, extractId, handlers.updateUsername)
userRouter.patch('/bio', jsonBodyParser, extractId, handlers.updateBio)
userRouter.patch('/avatar', jsonBodyParser, extractId, handlers.updateAvatar)
userRouter.patch('/email', jsonBodyParser, extractId, handlers.updateEmail)
userRouter.patch('/password', extractId, handlers.updatePassword)

userRouter.delete('/', extractId, handlers.deleteUserById)

export default userRouter