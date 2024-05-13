// @todo: Функция создания карточки
export function createCard(name, link, deleteFunc, tepmplate, openFunc, likeFunc) {
  const card = tepmplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', event => openFunc(link, `Фотография путишествия. Локация: ${name}`));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteFunc(card)); 

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeFunc(likeButton)); 

  cardImage.src = link;
  cardImage.onerror = () => {
    cardImage.alt = `Фотография не найдена 😔`;

    cardImage.style.cssText += `
      display: block;
      visibility: hidden;
      pointer-events: none;
      `
  }

  cardImage.oneload = () => {
    cardImage.alt = `Фотография путишествия. Локация: ${name}`;
  }

  card.querySelector('.card__title').textContent = name;

  return card
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
