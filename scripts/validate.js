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
        console.log('try')
    } else {
        disableButton(submitButton)
        console.log('ne try')
    }
}

const setSubmitListener = (formEdit) => {
    formEdit.addEventListener('submit', (event) => {
        event.preventDefault();
        toggleButtonValidity(formEdit)
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

const checkValidityForm = () => {
    const forms = document.querySelectorAll('.popup__form')
    const formsArr = Array.from(forms)
    formsArr.forEach((input) => {
        toggleButtonValidity(input)
        setSubmitListener(input)
    })
}

function enableValidation() {

    const inputs = document.querySelectorAll('.popup__input');
    const inputsArray = Array.from(inputs);

    inputsArray.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input);
            checkValidityForm()
        })
        setSubmitListener(input)
    })

}

enableValidation();