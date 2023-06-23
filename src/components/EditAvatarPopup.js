import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvaterPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_el_avatar-url"
        type="url"
        id="input-avatar-link"
        placeholder="Ссылка на изображение"
        name="input-avatar-link"
        value={avatar}
        onChange={handleChangeAvatar}
        ref={avatarRef}
        required
      />
      <span className="input-avatar-link-error" />
    </PopupWithForm>
  );
}

export default EditAvaterPopup;
