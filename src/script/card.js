// @todo: Функция создания карточки
export function createCard(objCard, deleteFunc, tepmplate, openFunc, likeFunc, userID) {
  const card = tepmplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  const deleteButton = card.querySelector('.card__delete-button');
  // Дбовляем/убираем иконку удаления карточки
  userID === objCard.owner._id ? deleteButton.style.display = 'block' : deleteButton.style.display = 'none';
  deleteButton.addEventListener('click', () => deleteFunc(card, objCard._id)); 

  const likeButton = card.querySelector('.card__like-button');
  // Ставим лайк на карточку, если наш id есть в массиве likes
  if(objCard.likes.some( user => user._id === userID)) likeButton.classList.add('card__like-button_is-active');

  likeButton.addEventListener('click', () => likeFunc(objCard._id, likeButton, cardLike)); 

  const cardLike = card.querySelector('.card__like-counter');
  cardLike.textContent = objCard.likes.length;

  cardImage.src = objCard.link;
  cardImage.alt = `Фотография путишествия. Локация: ${objCard.name}`;

  cardImage.onload = () => {
    cardImage.addEventListener('click', event => openFunc(objCard.link, `Фотография путишествия. Локация: ${objCard.name}`));
  }

  card.querySelector('.card__title').textContent = objCard.name;

  return card
}