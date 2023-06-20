import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector)
    this._popupImage = this._selector.querySelector(".popup__image")
    this._popupImageName = this._selector.querySelector(".popup__image-name")
  }

  open (name, link) {
    this._popupImageContainer.src = link
    this._popupImageContainer.alt = name
    this._popupImageName.textContent = name
    super.open()
  }
}
