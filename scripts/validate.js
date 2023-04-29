const setInputValidState = (input, errElement) => {
    input.classList.add('popup__input_type_error')
    errElement.classList.add('popup__error_visible')
    errElement.textContent = input.validationMessage;

}

const setInputInvalidState = (input, errElement) => {
    input.classList.remove('popup__input_type_error')
    errElement.classList.remove('popup__error_visible')
    errElement.textContent = '';
}

function checkInputValidity(input) {

    const errElement = document.querySelector(`#err-${input.id}`)

    if (input.checkValidity()) {
        setInputInvalidState(input, errElement)
    } else {
        setInputValidState(input, errElement)
    }
}

const disableButton = (button) => {
    button.setAttribute('disabled', '')
    button.classList.add('popup__submit-btn_disabled')
}

const enableButton = (button) => {
    button.removeAttribute('disabled');
    button.classList.remove('popup__submit-btn_disabled')
}


const toggleButtonValidity = (formEdit) => {
    const submitButton = formEdit.querySelector('.popup__submit-btn');

    if (formEdit.checkValidity()) {
        enableButton(submitButton)
    } else {
        disableButton(submitButton)
    }
}

const setSubmitListener = (formEdit) => {
    formEdit.addEventListener('submit', (event) => {
        event.preventDefault();
        toggleButtonValidity(formEdit)
    });
}

function enableValidation() {
    const formEdit = document.querySelector('.popup__form_edit');
    console.log(formEdit)
    setSubmitListener(formEdit);

    const inputsEdit = document.querySelectorAll('.popup__input');
    const inputsArrayEdit = Array.from(inputsEdit);
    const checkValidityButton = document.querySelector('.profile__edit-button');

    inputsArrayEdit.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input)
            toggleButtonValidity(formEdit)
            checkValidityButton.addEventListener('click', () => {
                toggleButtonValidity(formEdit)
                checkInputValidity(input)
            })
        })
    })

}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});