import "../pages/index.css"
import { initialCards, config } from "./constants.js"
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import UserInfo from "./UserInfo"
import PopupWithImage from "./PopupWithImage"
import Section from "./Section"
import createCard from "./createCard"
import PopupWithForm from "./PopupWithForm"

const editButtonLink = document.querySelector(".profile__edit-button-link")
const moreInfoPopup = document.querySelector(".popup_type_edit")
const moreInfoPopupForm = moreInfoPopup.querySelector(".popup__form")
const profileName = document.querySelector(".profile__name")
const aboutInput = moreInfoPopup.querySelector(".popup__input_type_about")
const buttonAdd = document.querySelector(".profile__add-button")
const popupAdd = document.querySelector(".popup_type_add")
const popupAddForm = document.querySelector(".popup__form_add")
const popupEddForm = document.querySelector(".popup__form_edit")
const popups = document.querySelectorAll(".popup")
const elements = document.querySelector(".elements")
const elementTemplate = document.querySelector(".elements-template")
const nameInputAdd = popupAddForm.querySelector(".popup__input_type_name")
const linkInputAdd = popupAddForm.querySelector(".popup__input_type_link")
const nameInputEdd = popupEddForm.querySelector(".popup__input_type_name")
const profileAbout = document.querySelector(".profile__about")
const imagePopupSelector = document.querySelector(".popup_type_image")
const templateSelector = ".elements-template"
const containerSelector = ".element__container"
const imageSelector = ".popup_type_image"
const profileSelector = ".popup_type_edit"
const cardSelector = ".popup_type_add"


const createNewCard = (element, openPopup, template) => {
  const card = new Card(element, openPopup, template)
  return card.generate()
}

const userInfo = new UserInfo(profileName, profileAbout)

const imagePopup = new PopupWithImage(imageSelector)
imagePopup.setEventListeners()

const cardFormValidator = new FormValidator(config, popupAddForm)
cardFormValidator.enableValidation()

const profileFormValidator = new FormValidator(config, popupEddForm)
profileFormValidator.enableValidation()

const cardList = new Section({
    data: initialCards, renderer: (item) => {
      const newCard = createCard(
        item, templateSelector, imagePopup.open
      )
      cardList.addItem(newCard)
    }
  },
  containerSelector
)
cardList.renderItems()


const profilePopup = new PopupWithForm(profileSelector, (event) => {
  event.preventDefault()
  userInfo.setUserInfo(profilePopup._getInputValues())
  profilePopup.close()
})
profilePopup.setEventListeners()

editButtonLink.addEventListener("click", () => {
  profileFormValidator.resetValidation(popupEddForm)
  profilePopup.setInputValue(userInfo.getUserInfo())
  profilePopup.open()
})

const cardPopup = new PopupWithForm(cardSelector, (event) => {
  event.preventDefault()
  const newCardInfo = cardPopup._getInputValues()
  const newCard = createCard(newCardInfo, templateSelector, imagePopup.open)
  cardList.addItem(newCard)
  cardPopup.close()
})
cardPopup.setEventListeners()

buttonAdd.addEventListener("click", () => {
  popupAddForm.reset()
  cardFormValidator.resetValidation(popupAddForm)
  cardPopup.open()
})
