const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

const editButtonLink = document.querySelector(".profile__edit-button-link")
const profileName = document.querySelector(".profile__name")
const profileImage = document.querySelector(".profile__avatar")
const buttonAdd = document.querySelector(".profile__add-button")
const popupAddForm = document.querySelector(".popup__form_add")
const popupEddForm = document.querySelector(".popup__form_edit")
const popupAvatarForm = document.querySelector(".popup__form_avatar")
const profileAbout = document.querySelector(".profile__about")
const templateSelector = ".elements-template"
const containerSelector = ".elements"
const imageSelector = ".popup_type_image"
const profileSelector = ".popup_type_edit"
const cardSelector = ".popup_type_add"
const apiToken = "127e6ee6-14ff-4018-97b4-2e2fb3bc579c"
const groupId = "cohort-68"
const apiURL = "https://mesto.nomoreparties.co/v1/"
const itemDeleteSelector = ".popup_type_delete"
const popupAvatarSelector = ".popup_type_avatar"
const buttonAvatar = document.querySelector(".profile__avatar-edd")

export {
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
  groupId,
  apiURL,
  itemDeleteSelector,
  popupAvatarSelector,
  buttonAvatar,
  popupAvatarForm,
  profileImage
}
