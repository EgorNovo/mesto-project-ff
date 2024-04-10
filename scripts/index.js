// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, deleteFunc) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteFunc(card)); 

  cardImage.src = link;
  cardImage.alt = `Фотография путишествия. Локация: ${name}`;
  card.querySelector('.card__title').textContent = name;

  return card
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function addCard(name, link) {
  cardList.append(createCard(name, link, deleteCard))
}

// @todo: Вывести карточки на страницу
initialCards.forEach( card => addCard(card.name, card.link))
