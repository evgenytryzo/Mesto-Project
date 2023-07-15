export default class Card {
  constructor (element, template, handleCardClick, popupDelete, myId, handleLike) {
    this._template = template
    this._handleLike = handleLike
    this._cardId = element._id
    this._handleCardClick = handleCardClick
    this._element = element
    this._ownerId = element.owner._id
    this._like = element.likes
    this._card = document
    .querySelector(this._template)
    .content.cloneNode(true)
    .querySelector(".element")
    this._elementName = this._card.querySelector(".element__name")
    this._elementPhoto = this._card.querySelector(".element__photo")
    this._likeElement = this._card.querySelector(".element__like-button")
    this._likeContainer = this._card.querySelector(".element__like-count")
    this._deleteElement = this._card.querySelector(".element__delete")
    this._myId = myId
    this._delete = popupDelete
  }

  isLike () {
    return this._like.some((element) => element._id === this._myId)
  }

  likeContainer (like) {
    this._like = like
    this._likeContainer.textContent = like.length
  }

  _deleteMyCard () {
    if ( this._myId === this._ownerId ) this._deleteElement.style.display = "block"
    else (this._deleteElement.style.display = "none")
  }

  deleteCard () {
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

    this.likeContainer(this._element.likes)

    if ( this.isLike() ) {
      this._likeElement.classList.add("element__like-button_active")
    }
    this._setEventListeners()
    this._deleteMyCard()
    return this._card
  }

  _setEventListeners () {
    this._elementPhoto.addEventListener("click", () => this._handleCardClick(this._element))
    this._likeElement.addEventListener("click", () => this._handleLike(this))
    this._deleteElement.addEventListener("click", () => this._delete(this))
  }

  handleLikeToggle () {
    this._likeElement.classList.toggle("element__like-button_active")
  }
}
