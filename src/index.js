import { createCard, deleteCard, likeCard } from './script/card.js'
import initialCards from './script/cards.js'

import { openModal, closeModal } from './script/modal.js'

import './index.css'

/* Работа с card элементами */
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initialCards.forEach( card => 
  cardList.prepend(createCard(card.name, card.link, deleteCard, cardTemplate, openCard, likeCard))
);

/* Работа с формами */
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const title = document.querySelector('.profile__title');
const profileImg = document.querySelector('.profile__image');
      profileImg.style['flex-shrink'] = '0';

const descripion = document.querySelector('.profile__description');

//Profile
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  title.textContent = nameInput.value;
  nameInput.value = '';

  descripion.textContent = jobInput.value;
  jobInput.value = '';

  closeModal(popupProfile);
}

formElement.addEventListener('submit', handleFormProfileSubmit)

//Card
const formElementCard = document.forms['new-place'];

const nameInputCard = formElementCard.elements['place-name'];
const linkInputCard = formElementCard.elements.link;

function handleFormCardSubmitCard(evt) {
  evt.preventDefault();

  cardList.prepend(createCard(nameInputCard.value, linkInputCard.value, deleteCard, cardTemplate, openCard, likeCard))

  nameInputCard.value = '';
  linkInputCard.value = '';

  closeModal(popupCard);
}

formElementCard.addEventListener('submit', handleFormCardSubmitCard)

/* Работа с popup элементами */
//Редкатирование профиля
const popupProfile = document.querySelector('.popup_type_edit');
popupProfile.classList.add('popup_is-animated');

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');

popupProfile.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(popupProfile)
  }
);

popupProfileOpenButton.addEventListener('click', event => {
  nameInput.value = title.textContent;
  jobInput.value = descripion.textContent;
  openModal(popupProfile);
});

popupProfileCloseButton.addEventListener('click', event => closeModal(popupProfile));

//Добавление карточки
const popupCard = document.querySelector('.popup_type_new-card');
popupCard.classList.add('popup_is-animated');

const popupCardOpenButton = document.querySelector('.profile__add-button');
      popupCardOpenButton.style['flex-shrink'] = '0';

const popupCardCloseButton = popupCard.querySelector('.popup__close');

popupCard.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(popupCard)
  }
);

popupCardOpenButton.addEventListener('click', event => openModal(popupCard));
popupCardCloseButton.addEventListener('click', event => closeModal(popupCard));

document.addEventListener('keydown', event => {
    if (event.key === "+") {
      openModal(popupCard);
    }
  }
);

//Popup картинки 
const popupImage = document.querySelector('.popup_type_image');
popupImage.classList.add('popup_is-animated');

const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

popupImageCloseButton.addEventListener('click', ()=> {
  closeModal(popupImage);
});

popupImage.addEventListener('click', event => {
  if (event.target.classList.contains('popup')) closeModal(popupImage);
});

function openCard(src, alt) {
  popupImageSrc.src = src;
  popupImageSrc.alt = alt;
  popupImageCaption.textContent = alt;

  openModal(popupImage);
};
