// @todo: Темплейт карточки

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// @todo: DOM узлы

const listElem = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(cardTitle, cardImgSrc, deleteFunction) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImgElem = cardElement.querySelector(".card__image");
  const cardTitleElem = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImgElem.src = cardImgSrc;
  cardImgElem.alt = "Альтернативный текст для изображения";

  cardTitleElem.textContent = cardTitle;

  cardDeleteButton.addEventListener("click", deleteFunction);
  return cardElement;
}
// @todo: Функция удаления карточки

const deleteCard = (evt) => evt.target.parentElement.remove();

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  listElem.append(addCard(item.name, item.link, deleteCard));
});
