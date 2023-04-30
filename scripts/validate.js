const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};


const setInputValidState = (input, errElement, config) => {
    input.classList.add(config.inputErrorClass)
    errElement.classList.add(config.errorClass)
    errElement.textContent = input.validationMessage;

}

const setInputInvalidState = (input, errElement, config) => {
    input.classList.remove(config.inputErrorClass)
    errElement.classList.remove(config.errorClass)
    errElement.textContent = '';
}

function checkInputValidity(input, config) {

    const errElement = document.querySelector(`#err-${input.id}`)

    if (input.checkValidity()) {
        setInputInvalidState(input, errElement, config)
    } else {
        setInputValidState(input, errElement, config)
    }
}

const disableButton = (button, config) => {
    button.setAttribute('disabled', '')
    button.classList.add(config.inactiveButtonClass)
}

const enableButton = (button, config) => {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass)
}


const toggleButtonValidity = (form, config) => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    if (form.checkValidity()) {
        enableButton(submitButton, config)
    } else {
        disableButton(submitButton, config)
    }
}

const setSubmitListener = (form, config) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        toggleButtonValidity(form, config)
    });
}

// const forms = () => {
//     const forms = document.querySelectorAll('.popup__form')
//     const formsArr = Array.from(forms)
//
//     formsArr.forEach((input) => {
//         enableValidation(input)
//         toggleButtonValidity(input)
//     })
// }

const checkValidityForm = (config) => {
    const forms = document.querySelectorAll(config.formSelector)
    const formsArr = Array.from(forms)
    formsArr.forEach((input) => {
        toggleButtonValidity(input, config)
        setSubmitListener(input, config)
    })
}

function enableValidation(config) {

    const inputs = document.querySelectorAll(config.inputSelector);
    const inputsArray = Array.from(inputs);

    inputsArray.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, config);
            checkValidityForm(config)
        })
        setSubmitListener(input, config)
    })

}

enableValidation(config);