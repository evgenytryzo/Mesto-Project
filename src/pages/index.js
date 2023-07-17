import "./index.css"
import {
  validationConfig,
  editButtonLink,
  profileName,
  buttonAdd,
  popupAddForm,
  popupEddForm,
  profileAbout,
  templateSelector,
  containerSelector,
  imageSelector,
  profileSelector,
  cardSelector,
  apiToken,
  apiURL,
  groupId,
  itemDeleteSelector,
  popupAvatarSelector,
  buttonAvatar,
  popupAvatarForm,
  profileImage
} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js"
import UserInfo from "../components/UserInfo"
import PopupWithImage from "../components/PopupWithImage"
import Section from "../components/Section"
import createCard from "../utils/createCard"
import PopupWithForm from "../components/PopupWithForm"
import { Api } from "../components/Api"
import PopupDelete from "../components/PopupDelete"

let myId = ""

const api = new Api(apiToken, groupId, apiURL)

const userInfo = new UserInfo(profileName, profileAbout, profileImage)

const imagePopup = new PopupWithImage(imageSelector)

const cardFormValidator = new FormValidator(validationConfig, popupAddForm)

const profileFormValidator = new FormValidator(validationConfig, popupEddForm)

const avatarPopup = new PopupWithForm(popupAvatarSelector, (formData) => {
  avatarPopup.setSubmitButtonText("Сохранить...")
  api
  .updateUserAvatar(formData)
  .then((res) => {
    userInfo.setUserInfo(res)
    avatarPopup.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
  .finally(() => avatarPopup.setDefaultSubmitButtonText())
})

const avatarFormValidation = new FormValidator(validationConfig, popupAvatarForm)

const profilePopup = new PopupWithForm(profileSelector, (formData) => {
  profilePopup.setSubmitButtonText("Сохранить...")
  api
  .updateUser(formData)
  .then((res) => {
    userInfo.setUserInfo(res)
    profilePopup.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
  .finally(() => profilePopup.setDefaultSubmitButtonText())
})

const cardPopup = new PopupWithForm(cardSelector, (formData) => {
  cardPopup.setSubmitButtonText("Создать...")
  api
  .createCard(formData)
  .then((cardData) => {
    cardsSection.addItem(
      createCard(
        cardData,
        templateSelector,
        imagePopup.open,
        popupDelete.open,
        myId,
        handleLike
      )
    )
    cardPopup.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
  .finally(() => cardPopup.setDefaultSubmitButtonText())
})

const popupDelete = new PopupDelete(itemDeleteSelector, (element) => {
  popupDelete.setSubmitButtonText("Да...")
  api
  .deleteCard(element.getCardId())
  .then(() => {
    element.removeCard()
    popupDelete.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
  .finally(() => popupDelete.setDefaultSubmitButtonText())
})

const cardsSection = new Section(
  {
    renderer: (item) => {
      const newCard = createCard(
        item, templateSelector, imagePopup.open, popupDelete.open, myId, handleLike
      )
      cardsSection.addItem(newCard)
    }
  },
  containerSelector
)

const handleLike = (element) => {
  if ( element.isLike() ) {
    api
    .removeCardLike(element.getCardId())
    .then((res) => {
      element.updateLikes(res.likes)
      element.handleLikeToggle()
    })
    .catch((err) => console.error(`Ошибка: ${ err }`))
  } else
    api
    .likeCard(element.getCardId())
    .then((res) => {
      element.updateLikes(res.likes)
      element.handleLikeToggle()
    })
    .catch((err) => console.error(`Ошибка: ${ err }`))
}

cardFormValidator.enableValidation()

profileFormValidator.enableValidation()

avatarFormValidation.enableValidation()

cardPopup.setEventListeners()

profilePopup.setEventListeners()

popupDelete.setEventListeners()

imagePopup.setEventListeners()

avatarPopup.setEventListeners()

api
.getAppInfo()
.then(([ cardsData, userData ]) => {
  userInfo.setUserInfo(userData)
  myId = userData._id
  cardsSection.renderItems(cardsData.reverse())
})

buttonAdd.addEventListener("click", () => {
  cardFormValidator.resetValidation()
  cardPopup.open()
})

buttonAvatar.addEventListener("click", () => {
  avatarFormValidation.resetValidation()
  avatarPopup.open()
})

editButtonLink.addEventListener("click", () => {
  profilePopup.setInputValue(userInfo.getUserInfo())
  profilePopup.open()
})


