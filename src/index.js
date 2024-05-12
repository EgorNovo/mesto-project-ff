import { addCard, createCard, deleteCard } from './script/card.js'
import initialCards from './script/cards.js'

import { openModal, closeModal , initBlock } from './script/modal.js'

import './index.css'

/* Работа с card элементами */
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Вывести карточки на страницу
initialCards.forEach( card => addCard(card.name, card.link, deleteCard, createCard, cardTemplate, cardList));

/* Работа с popup элементами */

//Редкатирование профиля
const profileDOM = initBlock('.popup_type_edit','.profile__edit-button') 
//output: [div.popup.popup_type_edit, button.profile__edit-button, button.popup__close]

//Закрываем popup по нажатию на оверлей
profileDOM[0].addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(profileDOM[0])
  }
);

//Открываем popup на кнопку редактирования
profileDOM[1].addEventListener('click', event => openModal(profileDOM[0]));
//Закрываем при нажатии крестика
profileDOM[2].addEventListener('click', event => closeModal(profileDOM[0]));

//Добавление карточки
const addCardDOM = initBlock('.popup_type_new-card','.profile__add-button')

//Закрываем popup по нажатию на оверлей
addCardDOM[0].addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(addCardDOM[0])
  }
);

//Открываем popup на кнопку редактирования
addCardDOM[1].addEventListener('click', event => openModal(addCardDOM[0]));
//Закрываем при нажатии крестика
addCardDOM[2].addEventListener('click', event => closeModal(addCardDOM[0]));

//Открываем popup на кнопку '+'
document.addEventListener('keydown', event => {
    if (event.key === "+") {
      openModal(addCardDOM[0]);
    }
  }
);

//Добавлене класса анимации к картинке 
document.querySelector('.popup_type_image').classList.add('popup_is-animated');

/* Работа с формами */
//Profile
const formElement = document.forms['edit-profile'];

const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const title = document.querySelector('.profile__title');
  title.textContent = nameInput.value;
  nameInput.value = '';

  const descripion = document.querySelector('.profile__description');
  descripion.textContent = jobInput.value;
  jobInput.value = '';

  closeModal(profileDOM[0]);
}

formElement.addEventListener('submit', handleFormSubmit)

//Card
const formElementCard = document.forms['new-place'];

const nameInputCard = formElementCard.elements['place-name'];
const linkInputCard = formElementCard.elements.link;

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  addCard(nameInputCard.value, linkInputCard.value, deleteCard, createCard, cardTemplate, cardList)

  nameInputCard.value = '';
  linkInputCard.value = '';

  closeModal(addCardDOM[0]);
}

formElementCard.addEventListener('submit', handleFormSubmitCard)

