const editButtonLink = document.querySelector('.profile__edit-button-link');
const moreInfoPopup = document.querySelector('.popup_edit');
const moreInfoPopupClose = moreInfoPopup.querySelector('.popup__close');
const nameInput = moreInfoPopup.querySelector('.popup__input_type_name');
const moreInfoPopupForm = moreInfoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const detailInput = moreInfoPopup.querySelector('.popup__input_type_detail');
const profileDetail = document.querySelector('.profile__details');

const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');

const handlePopupAdd = document.querySelector('.popup__form_add');
const closePopupSubmit = popupAdd.querySelector('.popup__submit')

console.log(handlePopupAdd);

const elements = document.querySelector('.elements')
const elementsTemplate = document.querySelector('.elements-template')

const createElement = (elementData) => {
    const element = elementsTemplate.content
        .querySelector('.element')
        .cloneNode(true);

    const elementName = element.querySelector('.element__name');
    const elementPhoto = element.querySelector('.element__photo');

    elementName.textContent = elementData.name;
    elementPhoto.src = elementData.link;
    elementPhoto.alt = elementData.name;

    const likeElement = element.querySelector('.element__like-button')
    const deleteElement = element.querySelector('.element__delete')

    const handleLike = () => {
        likeElement.classList
            .toggle('element__like-button_active')
    }

    const handleDelete = () => {
        element.remove();
    }

    likeElement.addEventListener('click', handleLike);
    deleteElement.addEventListener('click', handleDelete);

    return element
}

const renderElement = (element) => {
    elements.prepend(element)
}

initialCards.forEach(element => {
    renderElement(createElement(element))
})

const closePopup = () => {
    moreInfoPopup.classList.remove('popup_opened');
}

editButtonLink.addEventListener('click', () => {
    moreInfoPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    detailInput.value = profileDetail.textContent;
})

moreInfoPopupClose.addEventListener('click', () => {
    closePopup();
})

moreInfoPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDetail.textContent = detailInput.value;
    closePopup();
})



buttonAdd.addEventListener('click', () => {
    popupAdd.classList.add('popup_opened');
})

closePopupSubmit.addEventListener('click', () => {
    popupAdd.classList.remove('popup_opened')
})



const popupAddClose = popupAdd.querySelector('.popup__close')

popupAddClose.addEventListener('click', () => {
    popupAdd.classList.remove('popup_opened')


})



const PopupAddSubmit = (event) => {
    event.preventDefault();

    const nameInput = handlePopupAdd.querySelector('.popup__input_type_name')
    const linkInput = handlePopupAdd.querySelector('.popup__input_type_link')

    const name = nameInput.value;
    const link = linkInput.value;

    console.log(name, link)

    const elementData = {
        name,
        link,
    }
    renderElement(createElement((elementData)))

    nameInput.value = ""
    linkInput.value = ""
}

handlePopupAdd.addEventListener('submit', PopupAddSubmit)