export default class FormValidator {
  constructor (validationConfig, form) {
    this._form = form
    this._submitButtonSelector = validationConfig.submitButtonSelector
    this._inactiveButtonClass = validationConfig.inactiveButtonClass
    this._inputErrorClass = validationConfig.inputErrorClass
    this._errorClass = validationConfig.errorClass
    this._inputSelector = this._form.querySelectorAll(validationConfig.inputSelector)
    this._inputs = Array.from(this._inputSelector)
    this._submitButton = this._form.querySelector(this._submitButtonSelector)
  }

  enableValidation () {
    this._setEventListeners()
  }

  resetValidation () {
    this._toggleButtonValidity(this._form)

    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  _hideInputError (input) {
    const errElement = document.querySelector(`#err-${ input.id }`)
    this._setInputValidState(input, errElement)
  }

  _setEventListeners () {
    this._setSubmitListener(this._form)
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input)
        this._toggleButtonValidity(this._form)
      })
    })
  }

  _checkInputValidity (input) {
    const errElement = document.querySelector(`#err-${ input.id }`)

    if ( input.checkValidity() ) {
      this._setInputValidState(input, errElement)
    } else {
      this._setInputInvalidState(input, errElement)
    }
  }

  _setSubmitListener () {
    this._form.addEventListener("submit", () => this._toggleButtonValidity(this._form)
    )
  }

  _toggleButtonValidity = () => {
    if ( this._form.checkValidity() ) {
      this._enableButton(this._submitButton)
    } else {
      this._disableButton(this._submitButton)
    }
  }

  _setInputInvalidState = (input, errElement) => {
    input.classList.add(this._inputErrorClass)
    errElement.classList.add(this._errorClass)
    errElement.textContent = input.validationMessage
  }

  _setInputValidState = (input, errElement) => {
    input.classList.remove(this._inputErrorClass)
    errElement.classList.remove(this._errorClass)
    errElement.textContent = ""
  }

  _disableButton = () => {
    this._submitButton.setAttribute("disabled", "")
    this._submitButton.classList.add(this._inactiveButtonClass)
  }

  _enableButton = () => {
    this._submitButton.removeAttribute("disabled", "")
    this._submitButton.classList.remove(this._inactiveButtonClass)
  }
}
