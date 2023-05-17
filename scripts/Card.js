class Card {
  constructor(element, openPopup) {
    this.openPopup = openPopup
    this.element = element
    this.name = element.name
    this.element.name = element.name
    this.elementsTemplate = document.querySelector( '.elements-template' )
    this._card = this.elementsTemplate.content
    .querySelector( '.element' )
    .cloneNode( true )
    this.elementName = this._card.querySelector( '.element__name' )
    this.elementPhoto = this._card.querySelector( '.element__photo' )
    this.likeElement = this._card.querySelector( '.element__like-button' )
    this.deleteElement = this._card.querySelector( '.element__delete' )
    this.popupImage = document.querySelector( '.popup_type_image' )
    this.popupImageContainer = this.popupImage.querySelector( '.popup__image' )
    this.popupName = this.popupImage.querySelector( '.popup__image-name' )
  }

  generate() {
    console.log(this._card)
    this.elementName.textContent = this.name
    this.elementPhoto.src = this.element.link
    this.elementPhoto.alt = this.element.name

    this.setEventListeners()

    return this._card
  }

  setEventListeners() {
    this.elementPhoto.addEventListener( 'click', () => {
      this.openPopup( this.popupImage )
      this.popupImageContainer.src = this.element.link
      this.popupImageContainer.alt = this.element.name
      this.popupName.textContent = this.element.name
    } )
    this.likeElement.addEventListener( 'click', this.handleLike )
    this.deleteElement.addEventListener( 'click', this.handleDelete )
  }

  handleLike() {
    this.likeElement.classList.toggle( 'element__like-button_active' )
  }

  handleDelete = () => {
    this.element.remove()
  }

}


export default Card


//_likeCard _deleteCard _setEventListeners generate