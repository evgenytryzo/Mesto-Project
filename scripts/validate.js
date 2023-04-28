function checkInputValidity(input) {
    console.log(input.checkValidity())

    if (input.checkValidity()) {

    } else {

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