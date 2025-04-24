//FUNCIONES LOGICAS
function loginUser(loginData) {
    var usersJson = localStorage.getItem('users');
    var users = JSON.parse(usersJson);
    var userLoginCheckout = users ? users.find(function (_user) { return _user['email'] === loginData['email']}) : undefined;

    if (!userLoginCheckout || userLoginCheckout['password'] !== loginData['password']) {
        alert('Wrong credentials')
        return;
    }

    if(loginData['rememberMe']) {

        localStorage.id = userLoginCheckout.id;

    } else {

        sessionStorage.id = userLoginCheckout.id;
    }
    
    navigateToHome(currentView);
};


function registerUser(registerData) {
        if(!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) {
        alert('Register data incomplete')
        return;

        } 
        if(registerData['password'] !== registerData['confirmation-password']) {
            alert(`Passwords doesn't match`)
            return;
        }

        var usersJson = localStorage.getItem('users');
        var users; 
        usersJson ? users = JSON.parse(usersJson) : users = [];

       

        var doesUserExist = data.findUserByEmail(registerData['email'])
        if (doesUserExist) {
            alert('This mail is already in use');
            return;
        }

        var username = registerData['email'].split('@')[0];
        var userCreated = {email: registerData['email'], password: registerData['password'], username, id: Date.now()}

        users.push(userCreated);

        localStorage.users = JSON.stringify(users);

        sessionStorage.id = userCreated.id
        navigateToHome(currentView);

}


