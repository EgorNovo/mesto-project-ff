// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(name, link, deleteFunc) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc); 

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__title').textContent = name;

  cardList.append(card)
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
  const closestCard = deleteButton.srcElement.closest('.card');
  closestCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach( card => addCard(card.name, card.link, deleteCard))
