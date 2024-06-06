const TOKEN   = "f02c1d95-9cbb-4367-a5c4-52452ad0a389";
const COHORT  = 'wff-cohort-15';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${COHORT}`,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
};

const handleResponse = res => {
  if (res.ok) return res.json();

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers}).then(handleResponse);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers}).then(handleResponse);
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(handleResponse);
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(handleResponse);
};

export const deleteCard = (cardsID) => {
  return fetch(`${config.baseUrl}/cards/${cardsID}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

export const likeCardAdd = (cardsID, state) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardsID}`, {
    method: state,
    headers: config.headers,
  }).then(handleResponse);
};

export const updateProfileImg = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, { 
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then(handleResponse);
};