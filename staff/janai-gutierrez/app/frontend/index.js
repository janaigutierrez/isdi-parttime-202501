var body = document.body;
//funcion para añadir multiples hijos
function appendChildren() {
    var parent = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        parent.appendChild(arguments[i]);
    }
    return parent
}
function createTextContainer(tag, text, style) {
    var element = document.createElement(tag);
    element.textContent = text;
    element.className = style;
    return element;
}
function createButton(text, style, callback) {
    var button = document.createElement('button');
    button.className = style;
    button.textContent = text;
    button.addEventListener('click', callback) //Se activa la función que hemos pasado como parametro al hacer click
    return button
}
function createContainer(style) {
    var container = document.createElement('div');
    container.className = style;
    return container;
}
function navigateToRegister(previousView) {
    var registerContainer = createContainer('');
    var registerTitle = createTextContainer('h1', 'Register', 'title');
    var registerButton = createButton('Register', 'button', function () { console.log('click') })
    var toLoginButton = createButton('Go to login', 'button', function () { navigateToLogin(registerView) })

    var registerView = appendChildren(registerContainer, registerTitle, registerButton, toLoginButton);
    body.replaceChild(registerView, previousView)
}
function navigateToLogin(previousView) {
    var loginContainer = createContainer('');
    var loginTitle = createTextContainer('h1', 'Login', 'title');
    var loginButton = createButton('Login', 'button', function () { console.log('click') })
    var toRegisterButton = createButton('Go to register', 'button', function () { navigateToRegister(loginView) })

    var loginView = appendChildren(loginContainer, loginTitle, loginButton, toRegisterButton)
    body.replaceChild(loginView, previousView)
}
function renderLanding() {
    var landingContainer = createContainer('');
    var landingTitle = createTextContainer('h1', 'APP', 'title');
    var joinButton = createButton('JOIN IN!', 'button', function () { navigateToRegister(landingContainer) })

    landingContainer.appendChild(landingTitle);
    landingContainer.appendChild(joinButton);
    body.appendChild(landingContainer);
}
renderLanding();