import React, { useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import { auth } from "../utils/AuthApi";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = React.useState(false);

  useEffect(() => {
    api
      .getServerData()
      .then((res) => {
        const [initialCards] = res;
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser({
          _id: userData._id,
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    setSelectedCard({ isOpen: false, link: "", name: "" });
  }

  function handleUpdateUser(user) {
    api.editUserInfo(user).then((newUser) => {
      setCurrentUser({
        _id: newUser._id,
        userName: newUser.name,
        userDescription: newUser.about,
        userAvatar: newUser.avatar,
      }).catch((error) => console.log(`Ошибка: ${error}`));
      setIsEditProfilePopupOpen(false);
    });
  }

  function handleAddPlaceSubmit(user) {
    api
      .addNewCard(user)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));

    setIsAddPlacePopupOpen(false);
  }

  function handleUpdateAvatar(newAvatar) {
    console.log(newAvatar);
    api
      .setAvatar(newAvatar)
      .then((newUser) => {
        setCurrentUser({
          _id: newUser._id,
          userName: newUser.name,
          userDescription: newUser.about,
          userAvatar: newUser.avatar,
        });
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;