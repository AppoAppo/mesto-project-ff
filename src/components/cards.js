import { deleteCardAPI, toggleLikeAPI } from "./api";

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
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardImgElement.src = cardInfo.link;
  cardImgElement.alt = cardInfo.name;

  cardTitleElement.textContent = cardInfo.name;

  //Скрываем кнопку удалить карточку у чужих карточек
  if (cardInfo.deleteAvailable) {
    cardDeleteButton.addEventListener("click", () =>
      handlers.delete(cardElement, cardInfo._id)
    );
  } else {
    cardDeleteButton.style.visibility = "hidden";
  }

  cardLikeButton.addEventListener("click", () =>
    handlers.like(cardElement, cardInfo._id)
  );

  //проставляем лайк от нашего пользователя
  if (cardInfo.liked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardImgElement.addEventListener("click", () => handlers.imgPopup(cardInfo));

  cardLikeCount.textContent = cardInfo.likes.length;
  return cardElement;
};

// Удаление карточки
const deleteCard = (cardElement, cardId) => {
  deleteCardAPI(cardId)
    .then(() => cardElement.remove())
    .catch((err) => {
      console.log(err);
    });
};

// Обработка Лайка
const handleLike = (cardElement, cardId) => {
  const likeClass = "card__like-button_is-active";
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  toggleLikeAPI(cardId, cardLikeButton.classList.contains(likeClass))
    .then((result) => {
      cardElement
        .querySelector(".card__like-button")
        .classList.toggle(likeClass);
      cardLikeCount.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addCard, deleteCard, handleLike };
