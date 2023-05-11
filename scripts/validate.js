import {config} from './constants.js'

class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = form
    this._config = config
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._button = this._form.querySelector(this._submitButtonSelector)
  }

  _enableValidation() {
    const forms = document.querySelectorAll(this._formSelector);

    forms.forEach((form) => {
      this._setEventListeners(form);
    });
  }

  _setEventListeners(form) {
    this._setSubmitListener(form);
    this._toggleButtonValidity(form);

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonValidity(form);
      })
    })
  }

  _checkInputValidity(input) {
    const errElement = document.querySelector(`#err-${input.id}`)

    if (input.checkValidity()) {
      setInputInvalidState(input, errElement)
    } else {
      this._setInputValidState(input, errElement)
    }
  }

  _setSubmitListener(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._toggleButtonValidity(form)
    });
  }

  _toggleButtonValidity = (form) => {
    const submitButton = form.querySelector(this._submitButtonSelector);
    if (form.checkValidity()) {
      enableButton(submitButton)
    } else {
      disableButton(submitButton)
    }
  }

  _setInputValidState = (input, errElement) => {
    input.classList.add(this._inputErrorClass)
    errElement.classList.add(this._errorClass)
    errElement.textContent = input.validationMessage;
  }
}

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

function setEventListeners(form, config) {

  setSubmitListener(form, config);
  toggleButtonValidity(form, config);

  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, config);
      toggleButtonValidity(form, config);
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation(config);

export {setInputInvalidState, toggleButtonValidity}