import "../pages/index.css"
import {
  config,
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
  itemDelete,
  popupAvatar,
  buttonAvatar,
  popupAvatarForm,
  profileImage
} from "./constants.js"
import FormValidator from "./FormValidator.js"
import UserInfo from "./UserInfo"
import PopupWithImage from "./PopupWithImage"
import Section from "./Section"
import createCard from "./createCard"
import PopupWithForm from "./PopupWithForm"
import { Api } from "./Api"
import PopupDelete from "./PopupDelete"

let myId = ""
const api = new Api(apiToken, groupId, apiURL)


const userInfo = new UserInfo(profileName, profileAbout, profileImage)

const imagePopup = new PopupWithImage(imageSelector)
imagePopup.setEventListeners()

const cardFormValidator = new FormValidator(config, popupAddForm)
cardFormValidator.enableValidation()

const profileFormValidator = new FormValidator(config, popupEddForm)
profileFormValidator.enableValidation()

const avatarPopup = new PopupWithForm(popupAvatar, () => {
  api
  .updateUserAvatar(avatarPopup.getInputValues())
  .then((res) => {
    userInfo.setUserInfo(res)
    avatarPopup.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
  .finally(() => avatarPopup.setDefaultSubmitButtonText())
})
avatarPopup.setEventListeners()

const avatarFormValidation = new FormValidator(config, popupAvatarForm)
avatarFormValidation.enableValidation()

buttonAvatar.addEventListener("click", () => {
  avatarFormValidation.resetValidation(popupAvatarForm)
  avatarPopup.open()
})

const handleLike = (element) => {
  if ( element.isLike() ) {
    api
    .removeCardLike(element.getCardId())
    .then((res) => {
      element.likeContainer(res.likes)
      element.handleLikeToggle()
    })
    .catch((err) => console.error(`Ошибка: ${ err }`))
  } else
    api
    .likeCard(element.getCardId())
    .then((res) => {
      element.likeContainer(res.likes)
      element.handleLikeToggle()
    })
    .catch((err) => console.error(`Ошибка: ${ err }`))
}


const cardList = new Section(
  {
    renderer: (item) => {
      const newCard = createCard(
        item, templateSelector, imagePopup.open, popupDelete.open, myId, handleLike
      )
      cardList.addItem(newCard)
    }
  },
  containerSelector
)

const profilePopup = new PopupWithForm(profileSelector, () => {
  api
  .sendUser(profilePopup.getInputValues())
  .then((res) => {
    userInfo.setUserInfo(res)
    profilePopup.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
})
profilePopup.setEventListeners()


editButtonLink.addEventListener("click", () => {
  profilePopup.setInputValue(userInfo.getUserInfo())
  profilePopup.open()
})

const cardPopup = new PopupWithForm(cardSelector, () => {
  api
  .createCard(cardPopup.getInputValues())
  .then((cardData) => {
    cardList.addItem(
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
})
cardPopup.setEventListeners()

const popupDelete = new PopupDelete(itemDelete, (element) => {
  api
  .delete(element.getCardId())
  .then(() => {
    element.deleteCard()
    popupDelete.close()
  })
  .catch((err) => console.error(`Ошибка: ${ err }`))
  .finally(() => popupDelete.setDefaultSubmitButtonText())

})
popupDelete.setEventListeners()

buttonAdd.addEventListener("click", () => {
  cardFormValidator.resetValidation(popupAddForm)
  cardPopup.open()
})

api
.getAppInfo()
.then(([ cardsData, userData ]) => {
  userInfo.setUserInfo(userData)
  myId = userData._id
  cardList.renderItems(cardsData.reverse())
})

