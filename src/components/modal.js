export { openModal, closeModal, closePopupKey, closePopupOverlay };

const popupCloseKey = "Escape";
const popupCssClass = "popup_is-opened";

function openModal(popup) {
  popup.classList.add(popupCssClass);
  document.addEventListener("keydown", (evt) => closePopupKey(evt, popup));
  popup.addEventListener("click", (evt) => closePopupOverlay(evt, popup));
}

function closeModal(popup) {
  popup.classList.remove(popupCssClass);
  document.removeEventListener("keydown", closePopupKey);
}

function closePopupKey(evt, popup) {
  if (evt.key === popupCloseKey) {
    closeModal(popup);
  }
}
function closePopupOverlay(evt, popup) {
  if (evt.target === popup) {
    closeModal(popup);
  }
}
