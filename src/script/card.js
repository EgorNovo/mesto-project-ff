import { openModal, closeModal} from './modal.js'

// @todo: Функция создания карточки
export function createCard(name, link, deleteFunc, tepmplate) {
  const card = tepmplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', event => openCard(event.srcElement.src, event.srcElement.alt));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteFunc(card)); 

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton)); 

  cardImage.src = link;
  cardImage.alt = `Фотография путишествия. Локация: ${name}`;
  card.querySelector('.card__title').textContent = name;

  return card
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция открытия карточки
function openCard(src, alt) {
  const popup = document.querySelector('.popup_type_image');
  openModal(popup);

  const popupImg = popup.querySelector('.popup__image');
  setTimeout(() => {popupImg.src = src}, 0);
  popupImg.src = alt;

  const popupCaption = popup.querySelector('.popup__caption');
  popupCaption.textContent = alt;

  //Находим нужную кнопку для закрытия блока
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', ()=> {
    closeModal(popup);
  })

  //Закрываем popup по нажатию на оверлей
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(popup);
  }
);
}

export function addCard(name, link, deleteFunc, createFunc, tepmplate, cardList) {
  cardList.prepend(createFunc(name, link, deleteFunc, tepmplate))
}
