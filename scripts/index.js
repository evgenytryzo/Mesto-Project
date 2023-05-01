const editButtonLink = document.querySelector('.profile__edit-button-link');
const moreInfoPopup = document.querySelector('.popup_type_edit');

const nameInput = moreInfoPopup.querySelector('.popup__input_type_name');
const moreInfoPopupForm = moreInfoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const detailInput = moreInfoPopup.querySelector('.popup__input_type_detail');
const profileDetail = document.querySelector('.profile__details');

const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');

const popupAddForm = document.querySelector('.popup__form_add');

const popupImage = document.querySelector('.popup_type_image');

const popupImageContainer = popupImage.querySelector('.popup__image');
const popupName = popupImage.querySelector('.popup__image-name');

const inputs = Array.from(document.querySelectorAll(config.inputSelector));
const popups = document.querySelectorAll(".popup");

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');

    inputs.forEach((input) => {
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
        openPopup(popupImage);
        popupImageContainer.src = elementData.link;
        popupImageContainer.alt = elementData.name;
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

    const form = document.querySelector('.popup__form_edit')

    toggleButtonValidity(form, config)

})

moreInfoPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDetail.textContent = detailInput.value;
    closePopup(moreInfoPopup);
})

buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);

    const form = document.querySelector('.popup__form_add')
    toggleButtonValidity(form, config)

    popupAddForm.reset()
})


const popupAddSubmit = (event) => {
    event.preventDefault();

    const nameInput = popupAddForm.querySelector('.popup__input_type_name');
    const linkInput = popupAddForm.querySelector('.popup__input_type_link');

    const name = nameInput.value;
    const link = linkInput.value;

    const elementData = {
        name,
        link,
    }

    renderElement(createElement((elementData)))

    closePopup(popupAdd)

}
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");

    function closePopupByClickOverlay(evt) {
        if (evt.target === evt.currentTarget) closePopup(popup);
    }

    closeButton.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("click", closePopupByClickOverlay);

});

popupAddForm.addEventListener('submit', popupAddSubmit)