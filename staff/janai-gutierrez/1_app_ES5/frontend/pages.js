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
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true };
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true };

    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser);

    // Afegim el botó directament dins del formulari
    var toLoginButton = createButton('Go to Login', 'gotobutton', function () { 
        navigateToLogin(registerContainer);
    });

    registerForm.appendChild(toLoginButton); // Ara està dins del formulari

    appendChildren(registerContainer, logo, registerTitle, registerForm);

    return registerContainer;
}

function createHomePage() {
    var homeContainer = createContainer('homeContainer');
    var loggedUserId;
    if (sessionStorage.id) {
        loggedUserId = JSON.parse(sessionStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    }
    var userLogged = data.findUserById(loggedUserId);

    if (!userLogged) {
        alert('Login or Register first');
        return createRegisterPage();
    }

    // Funció per crear el menú
    function createHeaderMenu() {
        var menuContainer = document.createElement('div');
        menuContainer.className = 'header-menu';
        menuContainer.id = 'headerMenu';
        menuContainer.style.display = 'none'; // inicialment amagat

        var profileLink = createNavItem('Profile', function() { navigateToProfile(); });
        var settingsLink = createNavItem('Settings', function() { navigateToSettings(); });
        var logoutButton = createButton('Logout', 'logout', function() {
            sessionStorage.removeItem('id');
            var menu = document.getElementById('headerMenu');
            if (menu) {
                menu.parentNode.removeChild(menu);
            }
            navigateToLogin(homeContainer);
        });

        menuContainer.appendChild(profileLink);
        menuContainer.appendChild(settingsLink);
        menuContainer.appendChild(logoutButton);

        body.appendChild(menuContainer);
    }

    function createNavItem(text, onClick) {
        var item = document.createElement('div');
        item.className = 'menu-item';
        item.textContent = text;
        item.addEventListener('click', onClick);
        return item;
    }

    // Funció per mostrar/amagar el menú al clicar el logo
    function toggleMenu() {
        var menu = document.getElementById('headerMenu');
        
        // Si el menú encara no s'ha creat, no intentem accedir-hi
        if (!menu) {
            console.warn("Header menu not found. Creating menu...");
            createHeaderMenu(); // Ens assegurem que el menú existeixi
            menu = document.getElementById('headerMenu'); // Tornem a buscar-lo
        }
    
        // Ara podem alternar la visibilitat sense errors
        menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    }
    

    // Afegir el menú en carregar la pàgina
    document.addEventListener('DOMContentLoaded', function () {
        createHeaderMenu();
    });

    var logo = createLogo();
    logo.addEventListener('click', function() {
        toggleMenu();
    });
    var welcomeText = createTextContainer('h1', 'Welcome, \n' + userLogged.username, 'homeWelcomeText');

    // Definim el contenidor de posts una sola vegada fora del callback
    var postsContainer = loadPosts();

    // Formulari per publicar un post
    var postForm = createForm([
        { label: 'What am i thinking about...', inputType: 'text', inputPlaceholder: 'Write here...', inputId: 'postContent', isRequired: true }
    ], 'Post', function(data) {
        savePost(data.postContent);
        var newPost = createPost({ content: data.postContent, date: Date.now() });
        // Afegim el nou post al contenidor ja creat
        postsContainer.appendChild(newPost);
    });
    postForm.classList.add('postForm');
    // Afegim tots els elements a homeContainer
    appendChildren(homeContainer, logo, welcomeText, postForm, postsContainer);

    return homeContainer;
}

function createLoginPage() {
    var loginContainer = createContainer('login');
    var logo = createLogo();
    logo.addEventListener('click', function() {
        renderLanding();
    });

    var loginTitle = createTextContainer('h1', 'Login', 'formLogin');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '********', inputId: 'password', isRequired: true };
    var objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'rememberMe', isRequired: false };

    var loginForm = createForm([objectEmail, objectPassword, objectRemember], 'Login', loginUser);

    // Afegim el botó directament dins del formulari
    var toRegisterButton = createButton('Go to Register', 'gotobutton', function() { 
        navigateToRegister(loginContainer);
    });

    loginForm.appendChild(toRegisterButton); // Ara està dins del formulari

    appendChildren(loginContainer, logo, loginTitle, loginForm);

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
    var landingContainer = createContainer('landingContainer'); //como hacer que este div ocupe mas espacio para recolocar sus botones
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