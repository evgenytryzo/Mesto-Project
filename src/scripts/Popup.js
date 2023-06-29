export default class Popup {
  constructor (selector) {
    this._popup = document.querySelector(selector)
    this._closeButton = this._popup.querySelector(".popup__close")
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open () {
    document.addEventListener("keydown", this._handleEscClose)
    this._popup.classList.add("popup_opened")
  }

  close () {
    document.removeEventListener("keydown", this._handleEscClose)
    this._popup.classList.remove("popup_opened")
  }

  _handleEscClose (event) {
    if ( event.key === "Escape" ) this.close()
  }

  setEventListeners () {
    this._closeButton.addEventListener("click", () => this.close())
    this._popup.addEventListener("mousedown", (event) => {
      if ( event.target === event.currentTarget ) {
        this.close()
      }
    })
  }
}
