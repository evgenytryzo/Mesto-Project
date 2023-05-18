import { initialCards, config } from "./constants.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";

const editButtonLink = document.querySelector('.profile__edit-button-link')
const moreInfoPopup = document.querySelector('.popup_type_edit')
const nameInput = moreInfoPopup.querySelector('.popup__input_type_name')
const moreInfoPopupForm = moreInfoPopup.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name')
const detailInput = moreInfoPopup.querySelector('.popup__input_type_detail')
const profileDetail = document.querySelector('.profile__details')
const buttonAdd = document.querySelector('.profile__add-button')
const popupAdd = document.querySelector('.popup_type_add')
const popupAddForm = document.querySelector('.popup__form_add')
const popups = document.querySelectorAll(".popup")
const elements = document.querySelector('.elements')

const cardFormValidation = (config, form) => {
  const validator = new FormValidator(config, form)
  validator.enableValidation()
}

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)

  const errorMassage = new FormValidator(config, popupElement)
  errorMassage.errorMassage()
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened')
  document.removeEventListener("keydown", closePopupEsc)
}

const closePopupEsc = (event) => {
  const popup = document.querySelector('.popup_opened')
  if ( event.key === "Escape" ) {
    closePopup(popup)
  }
}

const closePopupByClickOverlay = (evt) => {
  if ( evt.target === evt.currentTarget ) closePopup(evt.currentTarget)
}


const renderElement = (element) => {
  elements.prepend(element)
}

const renderElementAdd = (element) => {
  elements.append(element)
}

const createNewCard = (element, openPopup) => {
  const card = new Card(element, openPopup);
  return card.generate();
}

initialCards.forEach(element => {
  renderElementAdd(createNewCard(element, openPopup))
})

editButtonLink.addEventListener('click', () => {
  const formEdit = document.querySelector('.popup__form_edit')

  openPopup(moreInfoPopup)
  nameInput.value = profileName.textContent
  detailInput.value = profileDetail.textContent
  cardFormValidation(config, formEdit)
})

moreInfoPopupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileDetail.textContent = detailInput.value
  closePopup(moreInfoPopup)
})


buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd)
  cardFormValidation(config, popupAddForm)
  popupAddForm.reset()
})

const popupAddSubmit = (event) => {
  event.preventDefault()

  const nameInput = popupAddForm.querySelector('.popup__input_type_name')
  const linkInput = popupAddForm.querySelector('.popup__input_type_link')
  const name = nameInput.value
  const link = linkInput.value
  const elementData = {
    name,
    link,
  }

  renderElement(createNewCard(elementData, openPopup))
  closePopup(popupAdd)
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close")
  closeButton.addEventListener("click", () => closePopup(popup))
  popup.addEventListener("click", closePopupByClickOverlay)

})

popupAddForm.addEventListener('submit', popupAddSubmit)

