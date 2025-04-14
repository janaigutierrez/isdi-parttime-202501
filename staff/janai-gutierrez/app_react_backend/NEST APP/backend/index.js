import express from 'express';
import { data } from 'data';
import { json } from 'express';
 
const api = express()

const jsonBodyParser = json()

const port = 4321

// middleware per processar JSON 
api.use(express.json());

api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World')
})

api.post('/user', jsonBodyParser, (req, res) => {
    const { email, password } = req.body

    try {
        const findUser = data.users.findUserByEmail(email, console.error)

    if(findUser) {
        console.error('user already exists')
        res.status(409)
        res.send('user already exists')
    }
    data.users.createUser({email, password}, console.error)

    res.status(201).send()

    } catch (error) {
        res.status(500).send()
    }

    
})

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})