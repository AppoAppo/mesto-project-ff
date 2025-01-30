import "./pages/index.css";

import {
  initialCards,
  addCard,
  handleLike,
  deleteCard,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const listElem = document.querySelector(".places__list");

// Попапы
const popups = {
  edit: document.querySelector(".popup_type_edit"),
  image: document.querySelector(".popup_type_image"),
  new_card: document.querySelector(".popup_type_new-card"),
};

// Кнопки
const buttons = {
  edit_profile: document.querySelector(".profile__edit-button"),
  add_card: document.querySelector(".profile__add-button"),
};

//Объекты для профиля
const profileInput = {
  name: document.querySelector(".popup__input_type_name"),
  job: document.querySelector(".popup__input_type_description"),
};
const profileElem = {
  name: document.querySelector(".profile__title"),
  job: document.querySelector(".profile__description"),
};

// Обработка попапа для картинки
const handleImgPopup = (cardInfo) => {
  const popupImgUrl = popups.image.querySelector(".popup__image");
  const popupImgCap = popups.image.querySelector(".popup__caption");

  openModal(popups.image);

  popupImgUrl.src = cardInfo.link;
  popupImgUrl.alt = cardInfo.name;
  popupImgCap.textContent = cardInfo.name;
};

// Функция обрабатывающая сохранение изменений в профиле
const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileElem.name.textContent = profileInput.name.value;
  profileElem.job.textContent = profileInput.job.value;

  closeModal(popups.edit);
};

// Функция обрабатывающая добавление новой карточки
const handleAddNewCardSubmit = (evt) => {
  evt.preventDefault();
  const cardName = document.querySelector(".popup__input_type_card-name");
  const imgUrl = document.querySelector(".popup__input_type_url");
  const card = {
    name: cardName.value,
    link: imgUrl.value,
  };

  listElem.prepend(addCard(card, deleteCard, handleLike, handleImgPopup));
  cardName.value = "";
  imgUrl.value = "";

  closeModal(popups.new_card);
};

// Создаем изначальные карточки
initialCards.forEach((item) => {
  listElem.append(addCard(item, deleteCard, handleLike, handleImgPopup));
});

// Вешаем обработчик на всех кнопки закрыть popup
document.querySelectorAll(".popup__close").forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    closeModal(elem.closest(".popup"));
  });
});

// Вешаем обработчик на кнопку добавить новую карточку
buttons.add_card.addEventListener("click", (evt) => {
  popups.new_card.addEventListener("submit", handleAddNewCardSubmit);
  openModal(popups.new_card);
});

// Вешаем обработчик на кнопку редактирование профиля
buttons.edit_profile.addEventListener("click", (evt) => {
  profileInput.name.value = profileElem.name.textContent;
  profileInput.job.value = profileElem.job.textContent;

  popups.edit.addEventListener("submit", handleFormSubmit);
  openModal(popups.edit);
});
