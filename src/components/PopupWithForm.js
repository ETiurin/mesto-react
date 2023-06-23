function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_delete-card">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form popup__form_type_avatar"
          name={name}
          id={`popup-form-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className="popup__button"
            type="submit"
            aria-label="Сохранить"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
