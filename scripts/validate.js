const setInputValidState = (input, errElement) => {
    input.classList.add('popup__input_invalidate')
    errElement.textContent = input.validationMessage;
}

const setInputInvalidState = (input, errElement) => {
    input.classList.remove('popup__input_invalidate')
    errElement.textContent = '';
}

function checkInputValidity(input) {
    console.log('th')
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
    const submitButton = formEdit.querySelector('.popup__submit');

    if (formEdit.checkValidity()){
        enableButton(submitButton)
    } else {
        disableButton(submitButton)
    }
}

function enableValidation() {
    console.log(121)
    const formEdit = document.querySelector('.popup__form')

    formEdit.addEventListener('submit', (event) => {
        event.preventDefault();
    });


    const inputsEdit = formEdit.querySelectorAll('.popup__input')
    const inputsArrayEdit = Array.from(inputsEdit)
    const checkValidityButton = document.querySelector('.profile__edit-button')

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



enableValidation()