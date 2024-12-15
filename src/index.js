import './pages/index.css';

import { initialCards } from './cards';

const cardContainerSelector = ".places__item";
// @todo: Темплейт карточки


const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(cardContainerSelector);

// @todo: DOM узлы

const listElem = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(cardInfo, deleteFunction) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImgElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImgElement.src = cardInfo.link;
  cardImgElement.alt = cardInfo.name;

  cardTitleElement.textContent = cardInfo.name;

  cardDeleteButton.addEventListener("click", () => deleteFunction(cardElement));

  return cardElement;
}
// @todo: Функция удаления карточки

// const deleteCard = (evt) => evt.target.closest(cardContainerSelector).remove();
const deleteCard = (cardElement) => cardElement.remove();

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  listElem.append(addCard(item, deleteCard));
});
