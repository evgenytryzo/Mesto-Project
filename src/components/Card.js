export default class Card {
  constructor (element, template, handleCardClick, handleCardDelete, currentUserId, handleLike) {
    this._template = template
    this._handleLike = handleLike
    this._cardId = element._id
    this._handleCardClick = handleCardClick
    this._element = element
    this._ownerId = element.owner._id
    this._likes = element.likes
    this._card = document
    .querySelector(this._template)
    .content.cloneNode(true)
    .querySelector(".element")
    this._elementName = this._card.querySelector(".element__name")
    this._elementPhoto = this._card.querySelector(".element__photo")
    this._likeElement = this._card.querySelector(".element__like-button")
    this._likeContainer = this._card.querySelector(".element__like-count")
    this._deleteElement = this._card.querySelector(".element__delete")
    this._currentUserId = currentUserId
    this._handleDelete = handleCardDelete
  }

  isLike () {
    return this._likes.some((element) => element._id === this._currentUserId)
  }

  updateLikes (likes) {
    this._likes = likes
    this._likeContainer.textContent = likes.length
  }

  _checkDeleteButtonVisibility () {
    if ( this._currentUserId === this._ownerId ) this._deleteElement.style.display = "block"
    else (this._deleteElement.style.display = "none")
  }

  removeCard () {
    this._card.remove()
    this._card = null
  }

  getCardId () {
    return this._cardId
  }

  generate () {
    this._elementName.textContent = this._element.name
    this._elementPhoto.src = this._element.link
    this._elementPhoto.alt = this._element.name

    this.updateLikes(this._element.likes)

    if ( this.isLike() ) {
      this._likeElement.classList.add("element__like-button_active")
    }
    this._setEventListeners()
    this._checkDeleteButtonVisibility()
    return this._card
  }

  _setEventListeners () {
    this._elementPhoto.addEventListener("click", () => this._handleCardClick(this._element))
    this._likeElement.addEventListener("click", () => this._handleLike(this))
    this._deleteElement.addEventListener("click", () => this._handleDelete(this))
  }

  handleLikeToggle () {
    this._likeElement.classList.toggle("element__like-button_active")
  }
}
