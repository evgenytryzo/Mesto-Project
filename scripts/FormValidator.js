export default class FormValidator {
  constructor (config) {
    this._formSelector = config.formSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._inputSelector = document.querySelectorAll(config.inputSelector)
    this._inputs = Array.from(this._inputSelector)
  }

  enableValidation () {
    const forms = document.querySelectorAll(this._formSelector)
    forms.forEach((form) => {
      this._setEventListeners(form)
    })
  }

  errorMassage () {
    this._inputs.forEach((input) => {
      const errElement = document.querySelector(`#err-${ input.id }`)
      this._setInputInvalidState(input, errElement)
    })
  }

  _setEventListeners (form) {
    this._setSubmitListener(form)
    this._toggleButtonValidity(form)

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
      form.reset()
    });
  }

  _toggleButtonValidity = (form) => {
    const submitButton = form.querySelector(this._submitButtonSelector)
    if ( form.checkValidity() ) {
      this._enableButton(submitButton)
    } else {
      this._disableButton(submitButton)
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