import "./pages/index.css";

import { addCard, handleLike, deleteCard } from "./components/cards.js";
import { initialCards } from "./components/initialCards.js";
import {
  openModal,
  closeModal,
  closePopupOverlay,
} from "./components/modal.js";

const listElement = document.querySelector(".places__list");

// Попапы
const popups = {
  editProfile: document.querySelector(".popup_type_edit"),
  image: document.querySelector(".popup_type_image"),
  addNewCard: document.querySelector(".popup_type_new-card"),
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
};

//Объекты для профиля
const profileElement = {
  name: document.querySelector(".profile__title"),
  job: document.querySelector(".profile__description"),
};

const popupImageElements = {
  url: popups.image.querySelector(".popup__image"),
  caption: popups.image.querySelector(".popup__caption"),
};

// Обработка попапа для картинки
const handleImgPopup = (cardInfo) => {
  openModal(popups.image);

  popupImageElements.url.src = cardInfo.link;
  popupImageElements.url.alt = cardInfo.name;
  popupImageElements.caption.textContent = cardInfo.name;
};

// Функция обрабатывающая сохранение изменений в профиле
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileElement.name.textContent = forms.editProfile.name.value;
  profileElement.job.textContent = forms.editProfile.description.value;

  closeModal(popups.editProfile);
};

// Функция обрабатывающая добавление новой карточки
const handleAddNewCardSubmit = (evt) => {
  evt.preventDefault();

  const card = {
    name: forms.addNewCard["place-name"].value,
    link: forms.addNewCard.link.value,
  };
  renderCard(card, "prepend");
  evt.target.reset(); // очищаем форму

  closeModal(popups.addNewCard);
};

// Набор обработчиков для карточки
const callbacks = {
  delete: deleteCard,
  like: handleLike,
  imgPopup: handleImgPopup,
};

// Функция добавления карточки с выбором места
const renderCard = (item, method = "append") => {
  // создаем карточку, передавая обработчики в виде объекта `handlers`
  const cardElement = addCard(item, callbacks);
  // вставляем карточку, используя метод (вставится `prepend` или `append`)
  listElement[method](cardElement);
};

// Создаем изначальные карточки
initialCards.forEach((item) => {
  renderCard(item);
  // listElem.append(addCard(item, handlers));
});

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

// Вешаем обработчик на кнопку добавить новую карточку
buttons.addNewCard.addEventListener("click", (evt) => {
  openModal(popups.addNewCard);
});
// Вешаем обработчик на кнопку редактирование профиля
buttons.editProfile.addEventListener("click", (evt) => {
  forms.editProfile.name.value = profileElement.name.textContent;
  forms.editProfile.description.value = profileElement.job.textContent;

  openModal(popups.editProfile);
});
