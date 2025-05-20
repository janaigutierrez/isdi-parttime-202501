import fs from 'fs';
import { errors } from 'common'


const users = {
    createUser: (user, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data);
                if (!users) users = []
                user.id = Date.now()
                users.push(user)
                const usersJson = JSON.stringify(users)

                fs.writeFile('./data/users.json', usersJson, (error) => {
                    if (error) callback(error)
                    else callback(null, user)
                })
            }

        })
    },
    findUserByEmail: (email, callback) => {

        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data);

                if (!users) users = []
                const userFound = users.find(user => user.email === email)

                callback(null, userFound)
            }

        })
    },
    findUserById: (id, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data);
                if (!users) callback(new errors.ExistenceError('user not found'))
                else {
                    const userIndex = users.findIndex(user => user.id === id)
                    if (userIndex === -1) {
                        callback(new errors.ExistenceError('user not found'))
                    } else {
                        callback(null, users[userIndex])
                    }
                }
            }
        })
    },
    getAllUsers: (callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) users = []

                callback(null, users)
            }
        })
    },
    updateUserById: (id, newUserData, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) callback(new errors.ExistenceError('user not found'))
                else {
                    const userIndex = users.findIndex(user => user.id === id)
                    if (userIndex === -1) {
                        callback(new errors.ExistenceError('user not found'))
                    } else {
                        users[userIndex] = newUserData

                        const usersJson = JSON.stringify(users)

                        fs.writeFile('./data/users.json', usersJson, (error) => {
                            if (error) callback(error)
                            else callback(null, newUserData)
                        })
                    }
                }
            }
        })
    },
    deleteUserById: (userId, callback) => {
        fs.readFile('./data/users.json', (error, data) => {
            if (error) callback(error)
            else {
                let users = JSON.parse(data)
                if (!users) users = []

                const userIndex = users.findIndex(user => user.id === userId)
                if (userIndex === -1) {
                    callback(new errors.ExistenceError('user not found'))
                    return
                }

                users.splice(userIndex, 1)

                const usersJson = JSON.stringify(users)
                fs.writeFile('./data/users.json', usersJson, (error) => {
                    if (error) callback(error)
                    else callback(null)
                })
            }
        })
    }
}
export default users