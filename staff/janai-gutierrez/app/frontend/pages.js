var body = document.body;
var currentView

//diferentes vistas de la app

function createRegisterPage() {
    var registerContainer = createContainer('');
    var registerTitle = createTextContainer('h1', 'Register', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true }
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true }
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //usamos una función que nos permite registrar el usuario y cambiar de vista


    var toLoginButton = createButton('Go to login', '', function () { navigateToLogin(view) })
    var view = appendChildren(registerContainer, registerTitle, registerForm, toLoginButton)

    return view;
}

function createHomePage() {
    var homeContainer = createContainer('');
    var loggedUserId = JSON.parse(sessionStorage.getItem('id'));
    
    var userLogged = data.findUserById(loggedUserId);

    if (!userLogged) {
        alert('Login or Register first')
        return createRegisterPage();
    }
    var loggedUserUsername = userLogged.username
    var welcomeText = createTextContainer('h1', `Welcome, \n${loggedUserUsername}`, '');
    var logoutButton = createButton('Logout', 'button', function() { sessionStorage.removeItem('id'); navigateToLogin(homeContainer)});

    appendChildren(homeContainer, welcomeText, logoutButton)
    return homeContainer;
}

function createLoginPage() {
    var loginContainer = createContainer('');
    var loginTitle = createTextContainer('h1', 'Login', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true};
    var objectPassword = {label: 'Password', inputType: 'password', inputPlaceholder: '********', inputId: 'password', isRequired: true};
    var loginForm = createForm([objectEmail, objectPassword], 'Login', loginUser);
    var toRegisterButton = createButton('Go to register', '', function() {navigateToRegister(loginContainer)});

    appendChildren(loginContainer, loginTitle, loginForm, toRegisterButton);
    return loginContainer;
}

function navigateToRegister(previousView) {
    var registerView = createRegisterPage();
    currentView = registerView;

    body.replaceChild(registerView, previousView);
}

function navigateToHome(previousView) {
    var homeView = createHomePage()
    currentView = homeView;

    body.replaceChild(homeView, previousView);
}

function navigateToLogin(previousView) {
    var loginContainer = createLoginPage();
    currentView = loginContainer;
    body.replaceChild(loginContainer, previousView);
}

function renderLanding() {
    var landingContainer = createContainer('');
    var landingTitle = createTextContainer('h1', 'Nest', 'title');
    var joinButton = createButton('JOIN IN!', 'button', function () { navigateToRegister(landingContainer) })

    currentView = landingContainer;

    landingContainer.appendChild(landingTitle);
    landingContainer.appendChild(joinButton);
    body.appendChild(landingContainer);
}
function renderHomePage() {
    var homePage = createHomePage();
    body.appendChild(homePage);
};