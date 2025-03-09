var data = {
    findUserById: function(id){ //definimos la funcion para poder acceder a ella
        var usersJson = localStorage.users //nos traemos los users de la base de datos del local Storage
        if(!usersJson) return undefined; //si no hay base de datos devolvemos undefined porque no hay ningun espacio

        var users = JSON.parse(usersJson) //si sí que la hay, la convertimos a js

        var userFound = users.find(function (user){ return user.id === id}); //buscamos el usuario con el mismo id usando metodo find
            
        return userFound; //lo devolvemos
    },

    findUserByEmail: function (email) {
        var usersJson = localStorage.users
        if(!usersJson) return undefined

        var users = JSON.parse(usersJson)

        var userFound = users.find(function(user) {return user.email === email} )

        return userFound
    },
    
    createUser: function(user) {
        var usersJson = localStorage.users
        var users;
        if(!usersJson) {
            users = []
        }else {
            users = JSON.parse(usersJson)
        }
        users.push(user)

        localStorage.setItem('users', JSON.stringify(users)) //asi devolvemos a js
    }

};