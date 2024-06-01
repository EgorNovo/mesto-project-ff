import { createCard, deleteCard, likeCard } from './card.js'

const TOKEN = "f02c1d95-9cbb-4367-a5c4-52452ad0a389";
let _id = '';

const get = (url) => {
  return fetch(url, {
    headers: {
      authorization: TOKEN
    }
  })
  .then(response => response.json())
};

export const getProfileInfo = (url) => {
  return get(url).then( data => {
    const title = document.querySelector('.profile__title');
    const descripion = document.querySelector('.profile__description');

    _id = data._id;
    title.textContent = data.name;
    descripion.textContent = data.about;
  })
}

function openCard(src, alt) {
  popupImageSrc.src = src;
  popupImageSrc.alt = alt;
  popupImageCaption.textContent = alt;

  openModal(popupImage);
};

export const getCard = (url) => {
  get(url).then(arrayCards => {
    const cardList = document.querySelector(".places__list");
    const cardTemplate = document.querySelector("#card-template").content;

    arrayCards.forEach( card => 
    cardList.prepend(createCard(card.name, card.link, deleteCard, cardTemplate, openCard, likeCard))
    );
  });
}

/*
about: "Sailor, researcher"
avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
cohort: "wff-cohort-15"
name: "Jacques Cousteau"
_id: "25807f708675e9f48270277b"
*/

export const updateProfile = (url, data) => {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
  }); 
}