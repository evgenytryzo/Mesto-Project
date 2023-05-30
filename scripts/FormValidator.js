export default class FormValidator {
  constructor (config, form) {
    this._form = form
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._inputSelector = document.querySelectorAll(config.inputSelector)
    this._inputs = Array.from(this._inputSelector)
    this._submitButton = form.querySelector(this._submitButtonSelector)
  }

  enableValidation () {
    this._setEventListeners(this._form)
  }

  resetValidation (form) {
    this._toggleButtonValidity(form)

    this._inputs.forEach((inputElement) => {
      this._errorMassage(inputElement)
    })
  }

  _errorMassage (input) {
    const errElement = document.querySelector(`#err-${ input.id }`)
    this._setInputInvalidState(input, errElement)
  }

  _setEventListeners (form) {
    this._setSubmitListener(form)
    this.resetValidation(form)
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toggleButtonValidity(form)
      })
    })
  }

  _checkInputValidity (input) {
    const errElement = document.querySelector(`#err-${ input.id }`)

    if ( input.checkValidity() ) {
      this._setInputInvalidState(input, errElement)
    } else {
      this._setInputValidState(input, errElement)
    }
  }

  _setSubmitListener (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._toggleButtonValidity(form)
    });
  }

  _toggleButtonValidity = (form) => {
    if ( form.checkValidity() ) {
      this._enableButton(this._submitButton)
    } else {
      this._disableButton(this._submitButton)
    }
  }

  _setInputValidState = (input, errElement) => {
    input.classList.add(this._inputErrorClass)
    errElement.classList.add(this._errorClass)
    errElement.textContent = input.validationMessage;
  }

  _setInputInvalidState = (input, errElement) => {
    input.classList.remove(this._inputErrorClass)
    errElement.classList.remove(this._errorClass)
    errElement.textContent = ''
  }

  _disableButton = (button) => {
    button.setAttribute('disabled', '')
    button.classList.add(this._inactiveButtonClass)
  }

  _enableButton = (button) => {
    button.removeAttribute('disabled');
    button.classList.remove(this._inactiveButtonClass)
  }
}