import { openModal } from "../components/modal.js";

const cardContainerSelector = ".places__item";
// @todo: Темплейт карточки

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(cardContainerSelector);

// @todo: DOM узлы

// @todo: Функция создания карточки

export const addCard = (
  cardInfo,
  deleteFunction,
  likeFunction,
  ImgPopupFunction
) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImgElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImgElement.src = cardInfo.link;
  cardImgElement.alt = cardInfo.name;

  cardTitleElement.textContent = cardInfo.name;

  cardDeleteButton.addEventListener("click", () => deleteFunction(cardElement));
  cardLikeButton.addEventListener("click", () => likeFunction(cardElement));
  cardImgElement.addEventListener("click", () => ImgPopupFunction(cardInfo));

  return cardElement;
};

// Обработка Лайка
export const handleLike = (cardElement) => {
  cardElement
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");
};

// Удаление карточки
export const deleteCard = (cardElement) => cardElement.remove();

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
// @todo: Вывести карточки на страницу
