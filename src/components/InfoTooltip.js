import React from "react";
import closeIcon from "../images/Close_Icon.svg";

const InfoTooltip = ({ name, isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <div
          className={`popup__success ${
            isSuccess ? "popup__success" : "popup__success_fail"
          }`}
        ></div>
        <h2 className="popup__title">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>
        <button type="button" className="popup__close" onClick={onClose}>
          <img
            src={closeIcon}
            alt="закрывающий крестик"
            className="popup__close-image"
          />
        </button>
      </div>
    </div>
  );
};

export default InfoTooltip;
