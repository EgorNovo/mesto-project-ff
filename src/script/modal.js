// input: DOM-element
export function openModal (DOMelement)  {
  DOMelement.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeEvent);
}

export function closeModal (DOMelement)  {
  DOMelement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeEvent);
}

// Функция для закрытия popup через кнопку Escape
function escapeEvent(event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};
