export const enableValidation = (configuration) => {

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.add(configuration.errorClass);
    inputElement.classList.add(configuration.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.remove(configuration.errorClass);
    inputElement.classList.remove(configuration.inputErrorClass);
    errorElement.textContent = '';
  }

  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some(a => !a.validity.valid);
  }
  
  const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(configuration.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(configuration.inactiveButtonClass);
    }
  }

  const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(configuration.inputSelector));
    const buttonElement = formElement.querySelector(configuration.submitButtonSelector);
  
    toggleButtonState(inputList,buttonElement);
  
    inputList.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      })
    })
  }

  const formList = Array.from(document.querySelectorAll(configuration.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', event => {
      event.preventDefault();
    })

    setEventListener(formElement);
  })
}