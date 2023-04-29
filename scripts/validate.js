function checkInputValidity(input) {
    const errElement = document.querySelector(`#err-${input.id}`)

    if (input.checkValidity()) {
        input.classList.remove('popup__input_invalidate')
        errElement.textContent = '';
    } else {
        input.classList.add('popup__input_invalidate')

        errElement.textContent = input.validationMessage;
        console.log(errElement)
    }
}

(function enableValidation() {
    const formEdit = document.querySelector('.popup__form')

    formEdit.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputsEdit = formEdit.querySelectorAll('.popup__input')
    const inputsArrayEdit = Array.from(inputsEdit)
    inputsArrayEdit.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input)
        });
    })
})()