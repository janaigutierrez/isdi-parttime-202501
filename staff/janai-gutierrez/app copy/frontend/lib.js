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
    var posts = JSON.parse(localStorage.getItem('posts')) || []; //obtenim posts anteriors
    posts.push(content); //afegim el nou post
    localStorage.setItem('posts', JSON.stringify(posts)); //desem a local storage
};
//funcio per carregar posts
function loadPosts() {
    var postsContainer = createContainer('posted'); // Crear el contenidor principal
    var posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(content => {
        var postElement = createPost(content); // Crear el post i obtenir l'element HTML
        postsContainer.appendChild(postElement); // Afegir-lo al contenidor
    });

    document.body.appendChild(postsContainer); // Afegir el contenidor al body
};
//funcio per crear posts
function createPost(content) {
    var post = document.createElement('div');
    post.classList.add('post');
    post.textContent = content; // Afegir el contingut al post
    return post; // Retornar l'element perquè pugui ser afegit a `postsContainer`
}