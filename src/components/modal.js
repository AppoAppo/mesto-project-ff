const popupCloseKey = "Escape";
const popupCssClass = "popup_is-opened";

const openModal = (popup) => {
  popup.classList.add(popupCssClass);
  document.addEventListener("keydown", closePopupKey);
};

const closeModal = (popup) => {
  popup.classList.remove(popupCssClass);
  document.removeEventListener("keydown", closePopupKey);
};

const closePopupKey = (evt) => {
  if (evt.key === popupCloseKey) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};
const closePopupOverlay = (evt, popup) => {
  if (evt.target === popup) {
    closeModal(popup);
  }
};

export { openModal, closeModal, closePopupOverlay };
