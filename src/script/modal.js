// input: DOM-element
export function openModal (DOMelement)  {
  DOMelement.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeEvent);
}

export function closeModal (DOMelement)  {
  DOMelement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeEvent);
}

export function initBlock (type, buttonOpen, buttonClose = '.popup__close') {
  //Находим скрытый блок 
  const popupType = document.querySelector(type);
  popupType.classList.add('popup_is-animated');
  //Находим нужную кнопку для открытия блока
  const popupOpenButton = document.querySelector(buttonOpen);
  //Находим нужную кнопку для закрытия блока
  const popupCloseButton = popupType.querySelector(buttonClose);

  return [popupType, popupOpenButton, popupCloseButton]
}

// Функция для закрытия popup через кнопку Escape
function escapeEvent(event) {
  const openPopup = document.querySelector('.popup_is-opened') || '';

  if (event.key === 'Escape') {
    closeModal(openPopup);
  }
};
