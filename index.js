const editButtonLink = document.querySelector('.profile__edit-button-link');
const moreInfoPopup = document.querySelector('.popup_type_more-info');
const moreInfoPopupClose = moreInfoPopup.querySelector('.popup_close');
const nameInput = moreInfoPopup.querySelector('.popup__input_type_name');
const moreInfoPopupForm = moreInfoPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const detailInput = moreInfoPopup.querySelector('.popup__input_type_detail')
const profileDetail = document.querySelector('.profile__details')

editButtonLink.addEventListener('click', () => {
    moreInfoPopup.classList.add('popup_open')

    nameInput.value = profileName.textContent;
    detailInput.value = profileDetail.textContent;
    })

moreInfoPopupClose.addEventListener('click', () => {
    moreInfoPopup.classList.remove('popup_open')
})

moreInfoPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDetail.textContent = detailInput.value;
    moreInfoPopup.classList.remove('popup_open')
})
