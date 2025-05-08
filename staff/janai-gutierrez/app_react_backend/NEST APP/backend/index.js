import express from 'express';
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/users/index.js';


const port = 4321
const api = express()
api.use(cors())


api.use(express.json());

api.get('/api', (req, res) => {
    res.status(200)
    res.send('Hello World')
})

api.use('/users', userRouter)

api.use(errorHandler)

api.listen(port, () => {
    console.info(`API listening to PORT: ${port}`)
})


/*
api.post('/users', jsonBodyParser, (req, res) => {
    const { email, password } = req.body

    try {
        validator.email(email)
        validator.password(password)

        const username = email.split('@')[0]

        data.users.findUserByEmail(email, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (user)
                return res.status(409).send('Duplicity error.')
            else {
                data.users.createUser({ email, password, username }, (error, user) => {
                    if (error) return res.status(500).send(error.message)
                    else if (user) return res.status(201).send()
                    else {
                        return res.status(500).send('something went wrong')
                    }
                })
            }

        })

    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})

api.put('/users', (req, res) => {
    res.status(200)
    res.send('HelloPutUsers!')
})


api.post('/users/auth', jsonBodyParser, (req, res) => {

    console.log('POST /users/auth called');
    console.log('Request body:', req.body);

    const { email, password } = req.body

    try {
        validator.email(email)
        validator.password(password)

        data.users.findUserByEmail(email, (error, user) => {

            if (error) res.status(500).send(error.message)
            if (!user || user.password !== password)
                return res.status(401).send({ message: 'Invalid email or password' })
            else return res.status(200).send({ id: user.id })
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

api.get('/users/username', (req, res) => {
    const authHeader = req.headers.authorization

    const id = Number(authHeader.split(" ")[1])

    try {
        validator.id(id)
        data.users.findUserById(id, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (!user) res.status(404).send('user not found')
            else res.status(200).send(user.username)
        })

    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send({ name: error.name, message: error.message })
        } else {
            res.status(500).send({ name: 'ServerError', message: error.message })
        }
    }
})

api.get('/users/avatar', (req, res) => {
    const authHeader = req.headers.authorization

    const id = Number(authHeader.split(" ")[1])

    try {
        validator.id(id)
        data.users.findUserById(id, (error, user) => {
            if (error) res.status(500).send(error.message)
            else if (!user) res.status / (404).send('user not found')
            else res.status(200).send(user.avatar)
        })

    } catch (error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    }
})
*/
