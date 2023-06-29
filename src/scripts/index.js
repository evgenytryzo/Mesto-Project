import "../pages/index.css"
import { config, initialCards } from "./constants.js"
import FormValidator from "./FormValidator.js"
import UserInfo from "./UserInfo"
import PopupWithImage from "./PopupWithImage"
import Section from "./Section"
import createCard from "./createCard"
import PopupWithForm from "./PopupWithForm"

const editButtonLink = document.querySelector(".profile__edit-button-link")
const profileName = document.querySelector(".profile__name")
const buttonAdd = document.querySelector(".profile__add-button")
const popupAddForm = document.querySelector(".popup__form_add")
const popupEddForm = document.querySelector(".popup__form_edit")
const profileAbout = document.querySelector(".profile__about")
const templateSelector = ".elements-template"
const containerSelector = ".elements"
const imageSelector = ".popup_type_image"
const profileSelector = ".popup_type_edit"
const cardSelector = ".popup_type_add"

const userInfo = new UserInfo(profileName, profileAbout)

const imagePopup = new PopupWithImage(imageSelector)
imagePopup.setEventListeners()

const cardFormValidator = new FormValidator(config, popupAddForm)
cardFormValidator.enableValidation()

const profileFormValidator = new FormValidator(config, popupEddForm)
profileFormValidator.enableValidation()

const cardList = new Section({
    data: initialCards, renderer: (item) => {
      const newCard = createCard(item, templateSelector, imagePopup.open)
      cardList.addItem(newCard)
    }
  },
  containerSelector
)
cardList.renderItems()


const profilePopup = new PopupWithForm(profileSelector, (data) => {
  userInfo.setUserInfo(data)
  profilePopup.close()
})
profilePopup.setEventListeners()
editButtonLink.addEventListener("click", () => {
  profilePopup.setInputValue(userInfo.getUserInfo())
  profilePopup.open()
})

const cardPopup = new PopupWithForm(cardSelector, (data) => {
  const newCard = createCard(data, templateSelector, imagePopup.open)
  cardList.addItem(newCard)
  cardPopup.close()
})
cardPopup.setEventListeners()

buttonAdd.addEventListener("click", () => {
  cardFormValidator.resetValidation(popupAddForm)
  cardPopup.open()
})
