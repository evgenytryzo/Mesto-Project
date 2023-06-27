export default class Card {
  constructor (element, template, handleCardClick) {
    this._template = template
    this._handleCardClick = handleCardClick
    this._element = element
    this._card = document
    .querySelector(this._template)
    .content.cloneNode(true)
    .querySelector(".element")
    this._elementName = this._card.querySelector(".element__name")
    this._elementPhoto = this._card.querySelector(".element__photo")
    this._likeElement = this._card.querySelector(".element__like-button")
    this._deleteElement = this._card.querySelector(".element__delete")
  }

  generate () {
    this._elementName.textContent = this._element.name
    this._elementPhoto.src = this._element.link
    this._elementPhoto.alt = this._element.name
    this._setEventListeners()
    return this._card
  }

  _setEventListeners () {
    this._elementPhoto.addEventListener("click", () => this._handleCardClick(this._element))
    this._likeElement.addEventListener("click", () => this._handleLike())
    this._deleteElement.addEventListener("click", () => this._handleDelete())
  }

  _handleLike () {
    this._likeElement.classList.toggle("element__like-button_active")
  }

  _handleDelete () {
    this._card.remove()
  }
}
