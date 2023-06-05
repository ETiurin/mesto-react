import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, link: '', name: '' });

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, link: '', name: '' });
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      {isEditProfilePopupOpen &&
        <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={true} onClose={closeAllPopups} buttonText={'Сохранить'}>
          <input className="popup__input popup__input_type_name popup__input_type_name-profile" name="user_name" id="name-input" type="text" placeholder="Имя" value="" minlength="2" maxlength="40" required />
          <span className="popup__span popup__span_error name-input-error"></span>
          <input className="popup__input popup__input_type_about popup__input_type_about-profile" name="user_about" id="about-input" type="text" placeholder="О cебе" value="" minlength="2" maxlength="200" required />
          <span className="popup__span popup__span_error about-input-error"></span>
        </PopupWithForm>
      }
      {isAddPlacePopupOpen &&
        <PopupWithForm name={'add'} title={'Новое место'} isOpen={true} onClose={closeAllPopups} buttonText={'Создать'}>
          <input className="popup__input popup__input_type_name popup__input_name" name="name" type="text" id="placeName-input" placeholder="Название" minlength="2" maxlength="30" value="" required />
          <span className="popup__span popup__span_error placeName-input-error"></span>
          <input className="popup__input popup__input_type_about popup__input_type_about-url" name="link" type="url" id="placeUrl-input" placeholder="Ссылка на картинку"  value="" required />
          <span className="popup__span popup__span_error placeUrl-input-error"></span>
        </PopupWithForm>
      }
      {isEditAvatarPopupOpen &&
        <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={true} onClose={closeAllPopups} buttonText={'Сохранить'}>
         <input className="popup__input popup__input_el_avatar-url" type="url" id="input-avatar-link" placeholder="Ссылка на изображение" name="input-avatar-link" value="" required />
          <span className="input-avatar-link-error"></span>
        </PopupWithForm>
      }
      {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
    </div>
  );
}

export default App;
