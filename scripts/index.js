const editButtonLink = document.querySelector('.profile__edit-button-link');
const moreInfoPopup = document.querySelector('.popup_edit');

const nameInput = moreInfoPopup.querySelector('.popup__input_type_name');
const moreInfoPopupForm = moreInfoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const detailInput = moreInfoPopup.querySelector('.popup__input_type_detail');
const profileDetail = document.querySelector('.profile__details');

const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');

const handlePopupAdd = document.querySelector('.popup__form_add');

const handlePopupImage = document.querySelector('.popup_image');

const popupImage = handlePopupImage.querySelector('.popup__image');
const popupName = handlePopupImage.querySelector('.popup__image-name');

const inputsProfileForm = Array.from(document.querySelectorAll(config.inputSelector));
const forms = document.querySelectorAll(config.formSelector)
const formsArr = Array.from(forms)

const popups = document.querySelectorAll(".popup");

function openPopup(popupElement) {

    popupElement.classList.add('popup_opened');

    inputsProfileForm.forEach((input) => {
        const errElement = document.querySelector(`#err-${input.id}`)
        setInputInvalidState(input, errElement, config)
    })

    document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')

    document.removeEventListener("keydown", closePopupEsc);
}


const closePopupEsc = (event) => {
    const popup = document.querySelector('.popup_opened');
    if (event.key === "Escape") {
        closePopup(popup);
    }
}

function removePopupAdd() {
    const inputName = handlePopupAdd.querySelector('.popup__input_type_name')
    const inputLink = handlePopupAdd.querySelector('.popup__input_type_link')
    inputName.value = ""
    inputLink.value = ""
}


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

    elementPhoto.addEventListener('click', () => {
        openPopup(handlePopupImage);
        popupImage.src = elementData.link;
        popupImage.alt = elementData.name;
        popupName.textContent = elementData.name;
    })

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

const renderElementAdd = (element) => {
    elements.append(element)
}

initialCards.forEach(element => {
    renderElementAdd(createElement(element))
})

editButtonLink.addEventListener('click', () => {
    openPopup(moreInfoPopup);
    nameInput.value = profileName.textContent;
    detailInput.value = profileDetail.textContent;

    formsArr.forEach((input) => {
        toggleButtonValidity(input, config)
    })

})


moreInfoPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDetail.textContent = detailInput.value;

})

buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);

    formsArr.forEach((input) => {
        toggleButtonValidity(input, config)
    })

    removePopupAdd()
})


const popupAddClose = popupAdd.querySelector('.popup__close');

popupAddClose.addEventListener('click', () => {


})

const popupAddSubmit = (event) => {
    event.preventDefault();

    const nameInput = handlePopupAdd.querySelector('.popup__input_type_name');
    const linkInput = handlePopupAdd.querySelector('.popup__input_type_link');

    const name = nameInput.value;
    const link = linkInput.value;

    const elementData = {
        name,
        link,
    }

    renderElement(createElement((elementData)))

}
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");

    function closePopupByClickOverlay(evt) {
        if (evt.target === evt.currentTarget) closePopup(popup);
    }

    closeButton.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("click", closePopupByClickOverlay);
});

handlePopupAdd.addEventListener('submit', popupAddSubmit)
