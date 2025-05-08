import { Router } from 'express';
import handlers from './handlers/index.js';
import express from 'express';
import extractId from '../../middlewares/extractId.js';

const jsonBodyParser = express.json()
const userRouter = Router()

userRouter.post('/', jsonBodyParser, handlers.registerUser)
userRouter.post('/auth', jsonBodyParser, handlers.loginUser)

userRouter.get('/username', extractId, handlers.getUsername)
userRouter.get('/avatar', extractId,)

userRouter.patch('/username', jsonBodyParser, extractId, handlers.updateUsername)

export default userRouter