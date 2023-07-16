import Card from "../components/Card"

const createCard = (item, selector, openImagePopup, popupDelete, myId, handleLike) => {
  const card = new Card(item, selector, openImagePopup, popupDelete, myId, handleLike)
  return card.generate()
}

export default createCard
