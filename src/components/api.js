const apiConfig = {
  cohort: "wff-cohort-31",
  token: "057f6eed-c7f1-469e-924e-bcd46b6ce088",
  baseUri: "https://nomoreparties.co/v1",
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

//обновление данных пользователя
const updateProfileAPI = (name, job) => {
  return fetch(`${apiConfig.baseUri}/${apiConfig.cohort}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(checkResponse);
};

//удаление карточки
const deleteCardAPI = (cardId) => {
  return fetch(`${apiConfig.baseUri}/${apiConfig.cohort}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

//создание карточки
const createCardAPI = (cardData) => {
  return fetch(`${apiConfig.baseUri}/${apiConfig.cohort}/cards`, {
    method: "POST",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then(checkResponse);
};

//обновление аватара пользователя
const changeAvatarAPI = (avatarLink) => {
  return fetch(`${apiConfig.baseUri}/${apiConfig.cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse);
};

//отправка данных о нажатии кнопки like
const toggleLikeAPI = (cardId, likeActive) => {
  const likeMethod = likeActive ? "DELETE" : "PUT";
  return fetch(
    `${apiConfig.baseUri}/${apiConfig.cohort}/cards/likes/${cardId}`,
    {
      method: likeMethod,
      headers: {
        authorization: apiConfig.token,
      },
    }
  ).then(checkResponse);
};

//получаение данных о пользователе
const getUserDataAPI = () => {
  return fetch(`${apiConfig.baseUri}/${apiConfig.cohort}/users/me`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then(checkResponse);
};

//получение списка карточек с сервера
const getCardsAPI = () => {
  return fetch(`${apiConfig.baseUri}/${apiConfig.cohort}/cards`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then(checkResponse);
};

export {
  apiConfig,
  getCardsAPI,
  getUserDataAPI,
  toggleLikeAPI,
  changeAvatarAPI,
  createCardAPI,
  deleteCardAPI,
  updateProfileAPI,
};
