import Popup from "./Popup"

export default class PopupWithForm extends Popup {
  constructor (selector, handleFormSubmit) {
    super(selector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector(".popup__form")
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"))
    this._submitButton = this._form.querySelector(".popup__submit-btn")
  }

  _getInputValues () {
    this._values = this._inputs.reduce((obj, input) => {
      obj[ input.name ] = input.value
      return obj
    }, {})
    return this._values
  }

  setInputValue (data) {
    this._inputs.forEach((input) => (input.value = data[ input.name ]))
  }

  setEventListeners () {
    super.setEventListeners()
    this._form.addEventListener("submit", (event) => {
      event.preventDefault()
      this._submitButton.textContent = `${ this._submitButton.textContent }...`
      this._handleFormSubmit()
    })
  }

  close () {
    super.close()
    this._form.reset()
  }

}
