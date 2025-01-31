const cardContainerSelector = ".places__item";
// @todo: Темплейт карточки

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(cardContainerSelector);

// @todo: DOM узлы

// @todo: Функция создания карточки

const addCard = (cardInfo, handlers) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImgElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImgElement.src = cardInfo.link;
  cardImgElement.alt = cardInfo.name;

  cardTitleElement.textContent = cardInfo.name;

  cardDeleteButton.addEventListener("click", () =>
    handlers.delete(cardElement)
  );
  cardLikeButton.addEventListener("click", () => handlers.like(cardElement));
  cardImgElement.addEventListener("click", () => handlers.imgPopup(cardInfo));

  return cardElement;
};

// Обработка Лайка
const handleLike = (cardElement) => {
  cardElement
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");
};

// Удаление карточки
const deleteCard = (cardElement) => cardElement.remove();

export { deleteCard, handleLike, addCard };
