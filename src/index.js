import { createCard } from './script/card.js'
import { enableValidation, clearValidation } from './script/validation.js'
import { openModal, closeModal } from './script/modal.js'
import { getInitialCards, getUserInfo, updateUserInfo, addNewCard, deleteCard, likeCardAdd, updateProfileImg } from './script/api.js'

import './index.css'

let userID = '';
let cardDelete, idDelete;

/* DOC элементы для работы с card*/
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

/* DOC элементы для работы с формами*/
/* Форма профиля*/
const formElementProfile = document.forms['edit-profile'];
const fornElementProfileButton = formElementProfile.querySelector('.popup__button');
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.description;
/* Форма карточки*/
const formElementCard = document.forms['new-place'];
const formElementCardButton = formElementCard.querySelector('.popup__button')
const nameInputCard = formElementCard.elements['place-name'];
const linkInputCard = formElementCard.elements.link;
/* Форма аватара*/
const formElementAvatar = document.forms['new-image'];
const formElementAvatarButton = formElementAvatar.querySelector('.popup__button')
const linkAvatarCard = formElementAvatar.elements.link;

const title = document.querySelector('.profile__title');
const descripion = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

/* Работа с popup элементами */
//Радактирование картинки пользователя
const popupImageProfile = document.querySelector('.popup_type_new_image_profile');
popupImageProfile.classList.add('popup_is-animated');
const popupImageProfileCloseButton = popupImageProfile.querySelector('.popup__close');

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

//Обработка форм, событие submit
const setLoading = (button, state) => {
  state ? button.textContent = "Сохранение..." : button.textContent = "Сохранение";
}

const addInactiveButtonClass = (button) => {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
}

//Profile submit
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  setLoading(fornElementProfileButton, true);

  updateUserInfo(nameInput.value,jobInput.value)
    .then(() => {
      title.textContent = nameInput.value;
      descripion.textContent = jobInput.value;

      closeModal(popupProfile);
      addInactiveButtonClass(fornElementProfileButton);
    })
    .catch( err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally( () => {
      setLoading(fornElementProfileButton, false);
    });
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit)

//Card submit
function handleFormCardSubmitCard(evt) {
  evt.preventDefault();
  setLoading(formElementCardButton, true);

  addNewCard(nameInputCard.value, linkInputCard.value)
    .then( card => {
      cardList.prepend(createCard(card, handleDelete, cardTemplate, openCard, handlelikeCardAdd, userID));
      formElementCard.reset();
    
      closeModal(popupCard);
      addInactiveButtonClass(formElementCardButton);
    })
    .catch( err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(()=>{
      setLoading(formElementCardButton, false);
    });
}

formElementCard.addEventListener('submit', handleFormCardSubmitCard);

//Avatar submit
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  setLoading(formElementAvatarButton, true);

  updateProfileImg(linkAvatarCard.value)
    .then( data => {
      profileImage.style['background-image'] = `url(${data.avatar})`;
      formElementAvatar.reset();

      closeModal(popupImageProfile);
      addInactiveButtonClass(formElementAvatarButton);
    })
    .catch( err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(()=>{
      setLoading(formElementAvatarButton, false);
    });
}

formElementAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Popup взаимодействие
const handlePopup = (popupElement, openButton, closeButton, form, submitButton) => {
  popupElement.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) closeModal(popupElement); 
  })

  openButton.addEventListener('click', () => {
    clearValidation(form, validationConfig);
    addInactiveButtonClass(submitButton);
    form.reset();

    if (openButton === popupProfileOpenButton) {
      nameInput.value = title.textContent;
      jobInput.value = descripion.textContent;
    }
    
    openModal(popupElement);
  })

  closeButton.addEventListener('click', () => {
    
    closeModal(popupElement);
  })
}

//popup profile
handlePopup(popupProfile, popupProfileOpenButton, popupProfileCloseButton, formElementProfile, fornElementProfileButton);
//popup card
handlePopup(popupCard, popupCardOpenButton, popupCardCloseButton, formElementCard, formElementCardButton);
//popup avatar
handlePopup(popupImageProfile, profileImage, popupImageProfileCloseButton, formElementAvatar, formElementAvatarButton);

//popup картинки
popupImageCloseButton.addEventListener('click', () => {
  closeModal(popupImage);
});
popupImage.addEventListener('click', event => {
  if (event.target.classList.contains('popup')) closeModal(popupImage);
});
//popup окна удаления
popupDeleteCloseButton.addEventListener('click', () => closeModal(popupDelete));
popupDelete.addEventListener('click', event => {
  if (event.target.classList.contains('popup')) closeModal(popupDelete); 
}); 
popupDeleteButton.addEventListener('click', () => {
  deleteCard(idDelete)
  .then( () => {
    cardDelete.remove();
    closeModal(popupDelete);
  })
  .catch( err => {
    console.log(`Ошибка: ${err}`);
  });
});

// Работа с API
const openCard = (src, alt) => {
  popupImageSrc.src = src;
  popupImageSrc.alt = alt;
  popupImageCaption.textContent = alt;

  openModal(popupImage);
};

const handleCards = arrayCards => {
  arrayCards.forEach( card => {    
    cardList.prepend(createCard(card, handleDelete, cardTemplate, openCard, handlelikeCardAdd, userID));
  });
};

const handleProfileInfo = user => {
  userID = user._id;

  title.textContent = user.name;
  descripion.textContent = user.about;
  profileImage.style['background-image'] = `url(${user.avatar})`;
};

const handleDelete = (card, id) => {
  cardDelete = card;
  idDelete = id;
  openModal(popupDelete);
};

const handlelikeCardAdd = (id, likeButton, counter) => {
  if( likeButton.classList.contains('card__like-button_is-active') ) {
    likeCardAdd(id,'DELETE').then( data => counter.textContent = data.likes.length)
      .then( () => {
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch( err => {
        console.log(err)
      });
  } else {
    likeCardAdd(id,'PUT').then( data => counter.textContent = data.likes.length)
      .then( () => {
        likeButton.classList.add('card__like-button_is-active')
      })
      .catch( err => {
        console.log(err)
      });
  }
}

Promise.all([getUserInfo(), getInitialCards()])
  .then( ([user, arrayCards])  => {
    handleProfileInfo(user);
    handleCards(arrayCards);
  })
  .catch( err => console.log(err));
