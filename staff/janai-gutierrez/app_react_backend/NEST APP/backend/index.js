import express from 'express';

const api = express()

const port = 4321

api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World')
})

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})