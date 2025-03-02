//EL ARCHIVO LIB CONTIENE LAS FUNCIONES QUE PERMITEN CREAR ELEMENTOS PARA EL DOM

// funcion para añadir multiples hijos

function appendChildren() {
    var parent = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        parent.appendChild(arguments[i]);
    }
    return parent;
};


function createTextContainer(tag, text, style) {
    var element = document.createElement(tag);
    element.textContent = text;
    element.className = style;
    return element;
};


function createButton(text, style, callback) {
    var button = document.createElement('button');
    button.className = style;
    button.textContent = text;
    button.addEventListener('click', callback) //Se activa la función que hemos pasado como parametro al hacer click
    return button;
};

function createContainer(style) {
    var container = document.createElement('div');
    container.className = style;
    return container;
};



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
 
        appendChildren(formContainer, label, inputElement);
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

            formData[fieldName] = value;

        }

        callback(formData);

    })

    return formContainer;

};

