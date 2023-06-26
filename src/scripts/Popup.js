export default class Popup {
  constructor (selector) {
    this._selector = document.querySelector(selector)
    this._closeButton = this._selector.querySelector(".popup__close")
    this._popup = document.querySelector(selector)
  }

  open () {
    this._popup.classList.add("popup_opened")
    document.addEventListener("keydown", this._handleEscClose)
  }

  close () {
    console.log(this._popup)
    document.removeEventListener("keydown", this._handleEscClose)
    this._popup.classList.remove("popup_opened")
  }

  _handleEscClose (event) {
    if (event.key === 'Escape') this.close()
  }

  setEventListeners () {
    this._closeButton.addEventListener("click", () => this.close())
    this._selector.addEventListener("mousedown", (event) => {
      if ( event.target === event.currentTarget ) this.close()
    })
  }
}
