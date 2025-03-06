var body = document.body;
var currentView;

//diferentes vistas de la app

function createRegisterPage() {
    var registerContainer = createContainer('');
    var logo = createLogo()
    logo.addEventListener('click', navigateToLanding)
    var registerTitle = createTextContainer('h1', 'Register', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true }
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true }
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //usamos una función que nos permite registrar el usuario y cambiar de vista

    var toLoginButton = createButton('Go to login', 'button', function () { navigateToLogin(view) })
    var view = appendChildren(registerContainer, logo, registerTitle, registerForm, toLoginButton)

    return view;
}

function createHomePage() {
    var homeContainer = createContainer('container');
    var loggedUserId;
    if(sessionStorage.id){
        loggedUserId = JSON.parse(sessionStorage.getItem('id'))
    } else {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    }
    var userLogged = data.findUserById(loggedUserId);

    if (!userLogged) {
        alert('Login or Register first')
        return createRegisterPage();
    }
    var loggedUserUsername = userLogged.username
    var logo = createLogo();
    var welcomeText = createTextContainer('h1', `Welcome, \n${loggedUserUsername}`, '');
    var logoutButton = createButton('Logout', 'logout', function() { sessionStorage.removeItem('id'); navigateToLogin(homeContainer)});

    appendChildren(homeContainer, logo, welcomeText, logoutButton)
    return homeContainer;
}

function createLoginPage() {
    var loginContainer = createContainer('login');
    var logo = createLogo();
    var toRegisterText = createTextContainer('span', 'Are you new here?', 'login__register-text');
    var toRegisterContainer = createContainer('login__register');
    var loginTitle = createTextContainer('h1', 'Login', 'formLogin');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true};
    var objectPassword = {label: 'Password', inputType: 'password', inputPlaceholder: '********', inputId: 'password', isRequired: true};
    var objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'rememberMe', isRequired: false }
    var loginForm = createForm([objectEmail, objectPassword, objectRemember], 'Login', loginUser);
    var toRegisterButton = createButton('Go to register', 'button', function() {navigateToRegister(loginContainer)});

    appendChildren(toRegisterContainer, toRegisterText, toRegisterButton);

    appendChildren(loginContainer, logo, loginTitle, loginForm, toRegisterButton);

    return loginContainer;
}

function createLogo(isLanding = false) {
    var logo = document.createElement('img');
    logo.src = 'sources/logo.png';
    logo.alt = 'App logo';

    if(isLanding) {
        logo.className = 'logo-large';
    } else {
        logo.className = 'logo-small';
    }
    return logo;
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

function navigateToLanding(previousview) {
    var landingContainer = renderLanding();
    body.replaceChild(landingContainer, previousview);
}

function renderLanding() {
    var landingContainer = createContainer('');
    var logo = createLogo(true); //aixi es versio gran
    var landingTitle = createTextContainer('h1', 'Nest', 'title');
    var joinButton = createButton('JOIN IN!', 'button', function () { navigateToRegister(landingContainer) })

    currentView = landingContainer;
    
    landingContainer.appendChild(logo);
    landingContainer.appendChild(landingTitle);
    landingContainer.appendChild(joinButton);
    body.appendChild(landingContainer);
}
function renderHomePage() {
    var homePage = createHomePage();
    body.appendChild(homePage);
};