import { initialCards, config } from "./constants.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const editButtonLink = document.querySelector('.profile__edit-button-link')
const moreInfoPopup = document.querySelector('.popup_type_edit')
const moreInfoPopupForm = moreInfoPopup.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name')
const detailInput = moreInfoPopup.querySelector('.popup__input_type_detail')
const buttonAdd = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const popupAddForm = document.querySelector('.popup__form_add')
const popupEddForm = document.querySelector('.popup__form_edit')
const popups = document.querySelectorAll(".popup")
const elements = document.querySelector('.elements')
const elementTemplate = document.querySelector('.elements-template')

const nameInputAdd = popupAddForm.querySelector('.popup__input_type_name')
const linkInputAdd = popupAddForm.querySelector('.popup__input_type_link')
const nameInputEdd = popupEddForm.querySelector('.popup__input_type_name')
const profileDetail = document.querySelector('.profile__details')

const createNewCard = (element, openPopup, template) => {
  const card = new Card(element, openPopup, template)
  return card.generate()
}

const cardFormValidator = new FormValidator(config, popupAddForm)
const profileFormValidator = new FormValidator(config, popupEddForm)

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}

const closePopupEsc = (event) => {
  if ( event.key === "Escape" ) {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened')
  document.removeEventListener("keydown", closePopupEsc)
}

const closePopupByClickOverlay = (evt) => {
  if ( evt.target === evt.currentTarget ) closePopup(evt.currentTarget)
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close")
  closeButton.addEventListener("click", () => closePopup(popup))
  popup.addEventListener("click", closePopupByClickOverlay)
})

const renderElement = (element) => {
  elements.prepend(element)
}

const renderElementAdd = (element) => {
  elements.append(element)
}

initialCards.forEach(element => {
  renderElementAdd(createNewCard(element, openPopup, elementTemplate))
})

editButtonLink.addEventListener('click', () => {
  openPopup(moreInfoPopup)
  nameInputEdd.value = profileName.textContent
  detailInput.value = profileDetail.textContent
  profileFormValidator.enableValidation()
})

buttonAdd.addEventListener('click', () => {
  popupAddForm.reset()
  openPopup(popupAdd)
  cardFormValidator.enableValidation()
})

const popupAddSubmit = (event) => {
  event.preventDefault()

  const name = nameInputAdd.value
  const link = linkInputAdd.value
  const elementData = {
    name,
    link,
  }

  renderElement(createNewCard(elementData, openPopup, elementTemplate))
  closePopup(popupAdd)
}

moreInfoPopupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = nameInputEdd.value
  profileDetail.textContent = detailInput.value
  closePopup(moreInfoPopup)
})

popupAddForm.addEventListener('submit', popupAddSubmit)