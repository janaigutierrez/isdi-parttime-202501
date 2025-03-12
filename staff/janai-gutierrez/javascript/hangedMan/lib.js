function createTitle(content, style, tag) {
    var titleElement = document.createElement(tag);
    titleElement.innerHTML = content;
    titleElement.classList.add(style);
    body.appendChild(titleElement);
}

function renderLetterForm() {
    letterFormContainer = document.createElement('form');
    letterFormContainer.style.display = 'flex';
    letterFormContainer.style.flexDirection = 'row';
    letterFormContainer.style.width = '100%';
    letterFormContainer.style.gap = '0.5rem';
    letterFormContainer.style.justifyContent = 'center';

    var letterInput = document.createElement('input');
    letterInput.type = 'text';
    letterInput.minLength = 1;
    letterInput.maxLength = 1;
    letterInput.required = true;
    letterInput.id = 'letter';
    letterInput.style.width = '2rem'

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';

    letterFormContainer.appendChild(letterInput);
    letterFormContainer.appendChild(submitButton);

    body.appendChild(letterFormContainer)
}