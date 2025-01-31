const popupCloseKey = "Escape";
const popupCssClass = "popup_is-opened";

function openModal(popup) {
  popup.classList.add(popupCssClass);
  document.addEventListener("keydown", closePopupKey);
}

function closeModal(popup) {
  popup.classList.remove(popupCssClass);
  document.removeEventListener("keydown", closePopupKey);
}

function closePopupKey(evt) {
  if (evt.key === popupCloseKey) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
function closePopupOverlay(evt, popup) {
  if (evt.target === popup) {
    closeModal(popup);
  }
}

export { openModal, closeModal, closePopupOverlay };
