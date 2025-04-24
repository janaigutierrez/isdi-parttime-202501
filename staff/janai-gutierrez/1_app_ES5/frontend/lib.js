//EL ARCHIVO LIB CONTIENE LAS FUNCIONES QUE PERMITEN CREAR ELEMENTOS PARA EL DOM

// funcion para añadir multiples hijos
function appendChildren() {
    var parent = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        parent.appendChild(arguments[i]);
    }
    return parent;
};
//funcio per crear contenidors de text
function createTextContainer(tag, text, style) {
    var element = document.createElement(tag);
    element.textContent = text;
    element.className = style;
    return element;
};
//funció per crear botons
function createButton(text, style, callback) {
    var button = document.createElement('button');
    button.className = style;
    button.textContent = text;
    button.addEventListener('click', callback) //Se activa la función que hemos pasado como parametro al hacer click
    return button;
};
//funció per crear contenidors
function createContainer(style) {
    var container = document.createElement('div');
    container.className = style;
    return container;
};
//crea el logo (té dos estats segons la pantalla on el renderitzo amb true o false)
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
};
//funció per crear formularis
function createForm(inputsArray, submitButtonText, callback) {
    var formContainer = document.createElement('form');
    formContainer.className = 'form';
    for(var i = 0; i < inputsArray.length; i++) {
        var input = inputsArray[i];
        var label = document.createElement('label');
        label.htmlFor = input.inputId;
        label.textContent = input.label;
        var inputElement = document.createElement('input');
        inputElement.type = input.inputType;
        inputElement.id = input.inputId;
        inputElement.placeholder = input.inputPlaceholder;
        inputElement.required = input.isRequired;
        if (input.inputType === 'checkbox') {
            inputElement.value = input.inputValue;
            inputElement.required = input.isRequired;
            appendChildren(label, inputElement)
            appendChildren(formContainer, inputElement, label)
        } else {
            inputElement.placeholder = input.inputPlaceholder
            appendChildren(formContainer, label, inputElement)
        }
    }

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = submitButtonText;

    formContainer.appendChild(submitButton);

    formContainer.addEventListener('submit', function (event) {
        event.preventDefault();

        var form = event.target;
        var formData = {};

        for(var i = 0; i < inputsArray.length; i++) {

            var fieldName = inputsArray[i].inputId;
            var value = form[inputsArray[i].inputId].value;
            if (inputsArray[i].inputType === 'checkbox') {
                value = form[inputsArray[i].inputId].checked
            } else {
                value = form[inputsArray[i].inputId].value
            }


            formData[fieldName] = value; //formData = {'email': 'patata@mail.com'}
        }

        callback(formData)
    })

    return formContainer;

}
//funcio per guardar posts
function savePost(content) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var postData = { content: content, date: Date.now() };
    posts.push(postData);
    localStorage.setItem('posts', JSON.stringify(posts));
}

//funcio per carregar posts
function loadPosts() {
    var postsContainer = document.createElement('div');
    postsContainer.className = 'posted';
    var posts = JSON.parse(localStorage.getItem('posts')) || [];

    for (var i = 0; i < posts.length; i++) {
        var postElement = createPost(posts[i]);
        postsContainer.appendChild(postElement);
    }

    return postsContainer;
}

//funcio per crear posts
function createPost(postData) {
    var post = document.createElement('div');
    post.className = 'post';

    // Creem la imatge de la foto de perfil (assegura't que el fitxer existeix)
    var profilePic = document.createElement('img');
    profilePic.className = 'profilePicture';
    profilePic.src = 'sources/logoUser.png';
    profilePic.alt = 'Profile Picture';

    // Definim el contingut i la data del post
    var content = '';
    var postDate;
    if (typeof postData === 'object' && postData !== null) {
        content = postData.content || '';
        postDate = postData.date ? new Date(postData.date) : new Date();
    } else {
        content = postData;
        postDate = new Date();
    }

    // Element per al text del post
    var postText = document.createElement('p');
    postText.textContent = content;

    // Element per a la data del post
    var dateElement = document.createElement('span');
    dateElement.className = 'post-date';
    dateElement.textContent = postDate.toLocaleString();

    // Afegim tots els elements al post
    post.appendChild(profilePic);
    post.appendChild(postText);
    post.appendChild(dateElement);

    return post;
};