import "./pages/index.css";

import { addCard, deleteCard, handleLike } from "./components/cards.js";

import {
  openModal,
  closeModal,
  closePopupOverlay,
} from "./components/modal.js";

import { clearValidation, enableValidation } from "./components/validation.js";

import {
  changeAvatarAPI,
  createCardAPI,
  getCardsAPI,
  getUserDataAPI,
  updateProfileAPI,
} from "./components/api.js";

const listElement = document.querySelector(".places__list");

// Попапы
const popups = {
  editProfile: document.querySelector(".popup_type_edit"),
  image: document.querySelector(".popup_type_image"),
  addNewCard: document.querySelector(".popup_type_new-card"),
  changeAvatar: document.querySelector(".popup_type_change-avatar"),
};

// Кнопки
const buttons = {
  editProfile: document.querySelector(".profile__edit-button"),
  addNewCard: document.querySelector(".profile__add-button"),
};

// Формы
const forms = {
  editProfile: document.forms["edit-profile"],
  addNewCard: document.forms["new-place"],
  changeAvatar: document.forms["change-avatar"],
};

//Объекты для профиля
const profileElement = {
  name: document.querySelector(".profile__title"),
  job: document.querySelector(".profile__description"),
  avatar: document.querySelector(".profile__image"),
};

//Объекты для попапа с картинкой
const popupImageElements = {
  url: popups.image.querySelector(".popup__image"),
  caption: popups.image.querySelector(".popup__caption"),
};

//конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//функция для отображения карточек и данных пользователя
const initData = () => {
  const initPromises = [getUserDataAPI(), getCardsAPI()];
  Promise.all(initPromises).then((results) => {
    const userData = results[0];
    const cardsData = results[1];
    profileElement.name.textContent = userData.name;
    profileElement.job.textContent = userData.about;
    profileElement.avatar.style.backgroundImage = `url('${userData.avatar}')`;
    cardsData.forEach((item) => {
      item.owner._id === userData._id
        ? (item.deleteAvailable = true)
        : (item.deleteAvailable = false);
      item.liked = item.likes.some((elem) => elem._id === userData._id);
      renderCard(item);
    });
  });
};

//восстановление текста на кнопке
const restoreButtonText = (button, buttonOriginalText) => {
  return (button.textContent = buttonOriginalText);
};

//текст кнопки на время сохранения изменений
const changeButtonTextToSave = (evt) => {
  const button = evt.target.querySelector(".popup__button");
  const buttonOriginalText = button.textContent;
  button.textContent = "Сохранение...";
  return { button, buttonOriginalText };
};

// Обработка попапа для картинки
const handleImgPopup = (cardInfo) => {
  popupImageElements.url.src = cardInfo.link;
  popupImageElements.url.alt = cardInfo.name;
  popupImageElements.caption.textContent = cardInfo.name;

  openModal(popups.image);
};

// Набор обработчиков для карточки
const callbacks = {
  delete: deleteCard,
  like: handleLike,
  imgPopup: handleImgPopup,
};

// Функция обрабатывающая сохранение изменений в профиле
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const { button, buttonOriginalText } = changeButtonTextToSave(evt);
  updateProfileAPI(
    forms.editProfile.name.value,
    forms.editProfile.description.value
  )
    .then((result) => {
      profileElement.name.textContent = result.name;
      profileElement.job.textContent = result.about;
      closeModal(popups.editProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => restoreButtonText(button, buttonOriginalText));
};

// Функция обрабатывающая добавление новой карточки
const handleAddNewCardSubmit = (evt) => {
  evt.preventDefault();
  const { button, buttonOriginalText } = changeButtonTextToSave(evt);
  const card = {
    name: forms.addNewCard["place-name"].value,
    link: forms.addNewCard.link.value,
  };

  createCardAPI(card)
    .then((result) => {
      result.deleteAvailable = true;
      renderCard(result, "prepend");
      evt.target.reset(); // очищаем форму
      clearValidation(forms.addNewCard, validationConfig);
      closeModal(popups.addNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => restoreButtonText(button, buttonOriginalText));
};

// Функция обрабатывающая добавление новой карточки
const handleChangeAvatarSubmit = (evt) => {
  evt.preventDefault();
  const { button, buttonOriginalText } = changeButtonTextToSave(evt);
  changeAvatarAPI(forms.changeAvatar["link-avatar"].value)
    .then((result) => {
      profileElement.avatar.style.backgroundImage = `url('${forms.changeAvatar["link-avatar"].value}')`;
      evt.target.reset(); // очищаем форму
      clearValidation(forms.changeAvatar, validationConfig);
      closeModal(popups.changeAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => restoreButtonText(button, buttonOriginalText));
};

// Функция добавления карточки с выбором места
const renderCard = (item, method = "append") => {
  // создаем карточку, передавая обработчики в виде объекта `handlers`
  const cardElement = addCard(item, callbacks);
  // вставляем карточку, используя метод (вставится `prepend` или `append`)
  listElement[method](cardElement);
};

// Вешаем обработчик на всех кнопки закрыть popup
document.querySelectorAll(".popup__close").forEach((elem) => {
  elem.addEventListener("click", () => {
    closeModal(elem.closest(".popup"));
  });
});

// Вешаем обработчик на все popup для закрытия по оверлею
document.querySelectorAll(".popup").forEach((elem) => {
  elem.addEventListener("mousedown", (evt) => closePopupOverlay(evt, elem));
});

// Вешаем обработчики на формы для отправки
forms.addNewCard.addEventListener("submit", handleAddNewCardSubmit);
forms.editProfile.addEventListener("submit", handleProfileFormSubmit);
forms.changeAvatar.addEventListener("submit", handleChangeAvatarSubmit);
// Вешаем обработчик на кнопку добавить новую карточку
buttons.addNewCard.addEventListener("click", (evt) => {
  openModal(popups.addNewCard);
});
// Вешаем обработчик на кнопку редактирование профиля
buttons.editProfile.addEventListener("click", (evt) => {
  forms.editProfile.name.value = profileElement.name.textContent;
  forms.editProfile.description.value = profileElement.job.textContent;
  clearValidation(forms.editProfile, validationConfig);
  openModal(popups.editProfile);
});

//Вешаем обработчик на "кнопку" редактирование аватара
profileElement.avatar.addEventListener("click", (evt) => {
  clearValidation(forms.changeAvatar, validationConfig);
  openModal(popups.changeAvatar);
});

//включаем валидацию
enableValidation(validationConfig);
//инициализируем карточки и данные пользователя
initData();
