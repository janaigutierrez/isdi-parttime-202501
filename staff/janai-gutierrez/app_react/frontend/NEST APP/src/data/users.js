const users = {
    findUserById: (id) => { 
        const usersJson = localStorage.users 
        if (!usersJson) return undefined 

        const users = JSON.parse(usersJson) 

        const userFound = users.find(user => user.id === id) 

        return userFound 
    },
    findUserByEmail: (email) => {
        const usersJson = localStorage.users
        if (!usersJson) return undefined

        const users = JSON.parse(usersJson)

        const userFound = users.find(user => user.email === email)

        return userFound
    },
    createUser: (user) => { 
        const usersJson = localStorage.users
        let users;
        if (!usersJson) {
            users = []
        } else {
            users = JSON.parse(usersJson)
        }

        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))
    },
    updateUserById: (id, newUserData) => {
        const users = localStorage.users ? JSON.parse(localStorage.getItem("users")) : [];
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            return
        }

        users[userIndex] = newUserData

        localStorage.users = JSON.stringify(users)
    },
}

export default users