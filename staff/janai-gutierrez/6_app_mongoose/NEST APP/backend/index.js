import express from 'express';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/users/index.js';
import postRouter from './routes/posts/index.js';
import { data } from './data/index.js'

const port = 4321

try {
    data.connect()
        .then(() => {
            console.info('MongoDB connected - starting Express...')

            const api = express()
            api.use(cors())
            api.use(express.json())

            api.get('/api', (req, res) => {
                res.status(200).send('Hello World')
            })

            api.use('/users', userRouter)
            api.use('/posts', postRouter)
            api.use(errorHandler)

            api.listen(port, () => {
                console.info(`API listening to PORT: ${port}`)
            })
        })
        .catch(error => {
            console.error('Error connecting to MongoDB:', error)
        })
} catch (error) {
    console.error(error)
}