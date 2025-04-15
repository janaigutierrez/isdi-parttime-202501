import express from 'express';
import { data } from './data/index.js';
import { json } from 'express';
import { errors } from 'common';

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

    const username = email.split('@')[0]

    const saveUser = (error) => {

    }

    /* try {
        const findUser = data.users.findUserByEmail(email, console.error)

        if(findUser) {
            throw new errors.DuplicityError('user already exists')
            
    } */

    data.users.createUser({email, password, username}, (error, user) => {
        if (error) res.status(500).send(error.message)
            if (user) res.status(201).send()
                res.status(500).send('something went wrong')
    })
    res.status(201).send()

    /* } catch (error) {
        if(error instanceof ExistenceError)
            res.status(409).send('user already exists')
        res.status(500).send()
    } */

    
})

api.put('/users', (req, res) => {
    res.status(200)
    res.send('HelloPutUsers!')
})

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})