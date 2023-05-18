import { config } from './constants.js'

const setInputValidState = (input, errElement, config) => {
  input.classList.add( config.inputErrorClass )
  errElement.classList.add( config.errorClass )
  errElement.textContent = input.validationMessage;
}

const setInputInvalidState = (input, errElement, config) => {
  input.classList.remove( config.inputErrorClass )
  errElement.classList.remove( config.errorClass )
  errElement.textContent = ''
}

function checkInputValidity(input, config) {
  const errElement = document.querySelector( `#err-${ input.id }` )

  if ( input.checkValidity() ) {
    setInputInvalidState( input, errElement, config )
  } else {
    setInputValidState( input, errElement, config )
  }
}

const disableButton = (button, config) => {
  button.setAttribute( 'disabled', '' )
  button.classList.add( config.inactiveButtonClass )
}

const enableButton = (button, config) => {
  button.removeAttribute( 'disabled' );
  button.classList.remove( config.inactiveButtonClass )
}


const toggleButtonValidity = (form, config) => {
  const submitButton = form.querySelector( config.submitButtonSelector );

  if ( form.checkValidity() ) {
    enableButton( submitButton, config )
  } else {
    disableButton( submitButton, config )
  }
}

const setSubmitListener = (form, config) => {
  form.addEventListener( 'submit', (event) => {
    event.preventDefault();
    toggleButtonValidity( form, config )
  } );
}

function setEventListeners(form, config) {
  setSubmitListener( form, config );
  toggleButtonValidity( form, config );

  const inputs = form.querySelectorAll( config.inputSelector );

  inputs.forEach( (input) => {
    input.addEventListener( 'input', () => {
      checkInputValidity( input, config );
      toggleButtonValidity( form, config );
    } )
  } )
}

function enableValidation(config) {
  const forms = document.querySelectorAll( config.formSelector );

  forms.forEach( (form) => {
    setEventListeners( form, config );
  } );
}

enableValidation( config );
