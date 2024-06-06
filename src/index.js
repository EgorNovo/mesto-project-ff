import { createCard } from './script/card.js'
import { enableValidation } from './script/validation.js'
import { openModal, closeModal } from './script/modal.js'
import { getInitialCards, getUserInfo, updateUserInfo, addNewCard, deleteCard, likeCardAdd, updateProfileImg } from './script/api.js'

import { initialCards } from './script/cards.js'
import './index.css'

let userID = '';

/* DOC элементы для работы с card*/
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

/* DOC элементы для работы с формами*/
/* Форма профиля*/
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
/* Форма карточки*/
const formElementCard = document.forms['new-place'];
const nameInputCard = formElementCard.elements['place-name'];
const linkInputCard = formElementCard.elements.link;
/* Форма аватара*/
const formElementAvatar = document.forms['new-image'];
const linkAvatarCard = formElementAvatar.elements.link;

const title = document.querySelector('.profile__title');
const descripion = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

/* Работа с popup элементами */
//Радактирование картинки пользователя
const popupImageProfile = document.querySelector('.popup_type_new_image_profile');
popupImageProfile.classList.add('popup_is-animated');
const popupImageProfileCloseButton = popupImageProfile.querySelector('.popup__close');
const popupImageProfileOpenButton = document.querySelector('.profile__image');

//Редкатирование профиля
const popupProfile = document.querySelector('.popup_type_edit');
popupProfile.classList.add('popup_is-animated');

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');

//Добавление карточки
const popupCard = document.querySelector('.popup_type_new-card');
popupCard.classList.add('popup_is-animated');

const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close');

//Popup картинки 
const popupImage = document.querySelector('.popup_type_image');
popupImage.classList.add('popup_is-animated');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

//Popup delete
const popupDelete = document.querySelector('.popup_type_delete');
popupDelete.classList.add('popup_is-animated');
const popupDeleteCloseButton = popupDelete.querySelector('.popup__close');
const popupDeleteButton = popupDelete.querySelector('.popup__button');


/*Валидация форм */
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

const clearValidation = (form, validationConfig) => {
  const inputElement = form.querySelectorAll(validationConfig.inputSelector);

  inputElement.forEach( element => {
    const errorElement = form.querySelector(`.${element.name}-error`);

    errorElement.classList.remove(validationConfig.errorClass);
    element.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
  })
}

//Обработка форм, событие submit
const Loading = (button, state) => {
  state ? button.textContent = "Сохранение..." : button.textContent = "Сохранение";
}
//Profile submit
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  Loading(formElement.querySelector('.popup__button'), true);

  updateUserInfo(nameInput.value,jobInput.value).then( () => {
    Loading(formElement.querySelector('.popup__button'), false)
  });

  title.textContent = nameInput.value;
  descripion.textContent = jobInput.value;

  nameInput.value = '';
  jobInput.value = '';

  clearValidation(popupProfile, validationConfig);
  closeModal(popupProfile);
}

formElement.addEventListener('submit', handleFormProfileSubmit)

//Card submit
function handleFormCardSubmitCard(evt) {
  evt.preventDefault();
  Loading(formElement.querySelector('.popup__button'), true);

  addNewCard(nameInputCard.value, linkInputCard.value).then( card => {
    cardList.prepend(createCard(card, handleDelete, cardTemplate, openCard, handlelikeCardAdd, userID));
    Loading(formElement.querySelector('.popup__button'), false);
  });

  nameInputCard.value = '';
  linkInputCard.value = '';

  clearValidation(popupCard, validationConfig);
  closeModal(popupCard);
}

formElementCard.addEventListener('submit', handleFormCardSubmitCard);

//Avatar submit
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  Loading(formElement.querySelector('.popup__button'), true);

  updateProfileImg(linkAvatarCard.value).then( data => {
    profileImage.style['background-image'] = `url(${data.avatar})`;
    Loading(formElement.querySelector('.popup__button'), false);
  });
  linkAvatarCard.value = '';

  clearValidation(popupImageProfile, validationConfig);
  closeModal(popupImageProfile);
}

formElementAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Popup взаимодействие
const handlePopup = (popupElement, openButton, closeButton) => {
  popupElement.addEventListener('click', event => {
    if (popupElement === popupProfile) clearValidation(popupElement, validationConfig);
    if (event.target.classList.contains('popup')) closeModal(popupElement); 
  })

  openButton.addEventListener('click', () => {
    if (openButton === popupProfileOpenButton) {
      nameInput.value = title.textContent;
      jobInput.value = descripion.textContent;
    }

    openModal(popupElement);
  })

  closeButton.addEventListener('click', () => {
    if (closeButton === popupProfileCloseButton) clearValidation(popupElement, validationConfig);

    closeModal(popupElement);
  })
}

//popup profile
handlePopup(popupProfile, popupProfileOpenButton, popupProfileCloseButton);
//popup card
handlePopup(popupCard, popupCardOpenButton, popupCardCloseButton);
//popup avatar
handlePopup(popupImageProfile, popupImageProfileOpenButton, popupImageProfileCloseButton);

document.addEventListener('keydown', event => {
    if (event.key === "+") openModal(popupCard);
  }
);

popupImageCloseButton.addEventListener('click', () => {
  closeModal(popupImage);
});

popupImage.addEventListener('click', event => {
  if (event.target.classList.contains('popup')) closeModal(popupImage);
});

// Работа с API
const openCard = (src, alt) => {
  popupImageSrc.src = src;
  popupImageSrc.alt = alt;
  popupImageCaption.textContent = alt;

  openModal(popupImage);
};

/* Карточки заглушки*/
initialCards.forEach( card => {    
  cardList.prepend(createCard(card, handleDelete, cardTemplate, openCard, handlelikeCardAdd, userID));
})

const handleCards = arrayCards => {
  /*Убираем карточки заглушки*/
  cardList.innerHTML="";

  arrayCards.forEach( card => {    
    cardList.prepend(createCard(card, handleDelete, cardTemplate, openCard, handlelikeCardAdd, userID));
  })
};

const handleProfileInfo = user => {
  userID = user._id;

  title.textContent = user.name;
  descripion.textContent = user.about;
  profileImage.style['background-image'] = `url(${user.avatar})`;
};

const handleDelete = (card, id) => {
  openModal(popupDelete);

  popupDeleteButton.addEventListener('click', () => {
    deleteCard(id).then(() => {
      card.remove();
      closeModal(popupDelete);
    });
  });

  popupDeleteCloseButton.addEventListener('click', () => closeModal(popupDelete));
  popupDelete.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(popupDelete); 
  }) 
};

const handlelikeCardAdd = (id, likeButton, counter) => {
  if( likeButton.classList.contains('card__like-button_is-active') ) {
    likeCardAdd(id,'DELETE').then( data => counter.textContent = data.likes.length);
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeCardAdd(id,'PUT').then( data => counter.textContent = data.likes.length)
    likeButton.classList.add('card__like-button_is-active');
  }
}

Promise.all([getUserInfo(), getInitialCards()])
  .then( ([user, arrayCards])  => {
    handleProfileInfo(user);
    handleCards(arrayCards);
  })
  .catch( err => console.log(err));
