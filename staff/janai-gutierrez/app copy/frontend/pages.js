var body = document.body;
var currentView;

//diferentes vistas de la app
function createRegisterPage() {
    var registerContainer = createContainer('');
    var logo = createLogo();
    logo.addEventListener('click', function() {
        renderLanding();
    });
    var registerTitle = createTextContainer('h1', 'Register', 'formRegister');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true }
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true }
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //usamos una función que nos permite registrar el usuario y cambiar de vista

    var toLoginButton = createButton('Go to login', 'gotobutton', function () { navigateToLogin(view) })
    var view = appendChildren(registerContainer, logo, registerTitle, registerForm, toLoginButton)

    return view;
};
function createHomePage() {
    var homeContainer = createContainer('homeContainer');
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
//per crear els elements del menu
    function createHeaderMenu() {
        var menuContainer = document.createElement('div');
        menuContainer.className = 'header-menu';
        menuContainer.id = 'headerMenu';
        menuContainer.style.display = 'none'; //inicialment amagat

        var profileLink = createNavItem('Profile', function() { navigateToProfile(); });
        var settingsLink = createNavItem('Settings', function() { navigateToSettings(); });

        menuContainer.appendChild(profileLink);
        menuContainer.appendChild(settingsLink);

        body.appendChild(menuContainer);
    };


    function createNavItem(text, onClick) {
        var item = document.createElement('div');
        item.className = 'menu-item';
        item.textContent = text;
        item.addEventListener('click', onClick);
        return item;
    };


//funcio per mostrar o amagar en clicar el logo

    function toggleMenu() {
        var menu = document.getElementById('headerMenu');
        if(menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }

    //afegir el menu en carregar la pagina

    document.addEventListener('DOMContentLoaded', function () {
        createHeaderMenu();
    });

    var loggedUserUsername = userLogged.username
    var logo = createLogo();
    logo.addEventListener('click', function() {
        toggleMenu();
    });
    var welcomeText = createTextContainer('h1', `Welcome, \n${loggedUserUsername}`, 'homeWelcomeText');
    var logoutButton = createButton('Logout', 'logout', function() { sessionStorage.removeItem('id'); navigateToLogin(homeContainer)});

    var postForm = createForm([
        { label: 'What am i thinking about...', inputType: 'text', inputPlaceholder: 'Write here...', inputId: 'postContent', isRequired: true }
    ], 'Post', function(data) {
        savePost(data.postContent);
        createPost(data.postContent);
    });

    appendChildren(homeContainer, logo, welcomeText, postForm, logoutButton)
    loadPosts();
    return homeContainer;
};
function createLoginPage() {
    var loginContainer = createContainer('login');
    var logo = createLogo();
    logo.addEventListener('click', function() {
        renderLanding();
    });
    var toRegisterText = createTextContainer('span', 'Are you new here?', 'login__register-text');
    var toRegisterContainer = createContainer('login__register');
    var loginTitle = createTextContainer('h1', 'Login', 'formLogin');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true};
    var objectPassword = {label: 'Password', inputType: 'password', inputPlaceholder: '********', inputId: 'password', isRequired: true};
    var objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'rememberMe', isRequired: false }
    var loginForm = createForm([objectEmail, objectPassword, objectRemember], 'Login', loginUser);
    var toRegisterButton = createButton('Go to register', 'gotobutton', function() {navigateToRegister(loginContainer)});

    appendChildren(toRegisterContainer, toRegisterText, toRegisterButton);

    appendChildren(loginContainer, logo, loginTitle, loginForm, toRegisterButton);

    return loginContainer;
}
//NAVIGATION
function navigateToRegister(previousView) {
    var registerView = createRegisterPage();
    currentView = registerView;

    body.replaceChild(registerView, previousView);
};
function navigateToHome(previousView) {
    var homeView = createHomePage()
    currentView = homeView;

    body.replaceChild(homeView, previousView);
};
function navigateToLogin(previousView) {
    var loginContainer = createLoginPage();
    currentView = loginContainer;
    body.replaceChild(loginContainer, previousView);
};
function navigateToLanding(previousview) {
    var landingContainer = renderLanding();
    currentView = landingContainer;
    body.replaceChild(landingContainer, previousview);
}

//RENDERING

function renderLanding() {
    var landingContainer = createContainer('', '', 'landingContainer'); //como hacer que este div ocupe mas espacio para recolocar sus botones
    var logo = createLogo(true); //aixi es versio gran
    var landingTitle = createTextContainer('h1', 'Nest', 'title');
    var joinButton = createButton('JOIN IN!', 'joinButton', function () { navigateToRegister(landingContainer) });

    landingContainer.appendChild(logo);
    landingContainer.appendChild(landingTitle);
    landingContainer.appendChild(joinButton);

    // Substituir la vista actual en lloc d'afegir-la a sobre
    if (currentView) {
        body.replaceChild(landingContainer, currentView);
    } else {
        body.appendChild(landingContainer);
    }

    currentView = landingContainer; // Actualitzar la vista actual
};

function renderHomePage() {
    var homePage = createHomePage();
    body.appendChild(homePage);
};