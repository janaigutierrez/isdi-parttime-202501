import express from 'express';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/users/index.js';
import postRouter from './routes/posts/index.js';


const port = 4321
const api = express()
api.use(cors())


api.use(express.json());

api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World')
})

api.use('/users', userRouter)
api.use('/posts', postRouter)

api.use(errorHandler)

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})