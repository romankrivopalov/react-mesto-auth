import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import auth from '../utils/auth';
import api from '../utils/api';

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false),
        [ currentUser, setCurrentUser ] = useState({}),
        [ isLoading, setIsLoading ] = useState(false),
        [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false),
        [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false),
        [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false),
        [ selectedCard, setSelectedCard ] = useState({name: '', link: ''}),
        [ cardToDelete, setCardToDelete ] = useState(null),
        allSetsPopupOpen = [
          setIsEditAvatarPopupOpen,
          setIsEditProfilePopupOpen,
          setIsAddPlacePopupOpen,
        ],
        [ cards, setCards ] = useState([]);

  function handleRegistrationUser(userData) {
    auth.getRegistrationUser(userData)
      .then(res => console.log(res))
  }

  function handleAuthorizationUser(userData) {
    auth.getAuthorizationUser(userData)
      .then(res => {
        console.log(res);
        setLoggedIn(true);
      })
  }

  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(res => {
        const [ userData, cardsArray ] = res;
        setCards(cardsArray);
        setCurrentUser(userData);
      })
      .catch(err => console.log(err));
  }, [])

  function closeAllPopups() {
    allSetsPopupOpen.forEach(item => item(false));
    setSelectedCard({name: '', link: ''});
    setCardToDelete(null);
    setIsLoading(false)
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true)
    api.updateAvatar(avatarData)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api.setUserInfo(userInfo)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true)
    api.postNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(isLiked, card.id)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(cardId) {
    setCardToDelete(cardId);
  }

  function handleConfirmBeforeDelete() {
    setIsLoading(true)
    api.deleteCard(cardToDelete)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardToDelete))
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">

          <Header loggedIn={loggedIn} />

          <main>
            <Routes>

              <Route
                path='/signin'
                element={<Login handleSubmit={handleAuthorizationUser} />} />

              <Route
                path='/signup'
                element={<Register handleSubmit={handleRegistrationUser} />} />

              <Route path='/'
                element={<ProtectedRoute
                  element={<Main
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onEditProfile={setIsEditProfilePopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}/>}
                  loggedIn={loggedIn}
                />}
              />

              <Route path='*' element={<Navigate to='/' />} />

            </Routes>
          </main>

          {loggedIn && <Footer />}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <ConfirmPopup
            isOpen={!!cardToDelete}
            onClose={closeAllPopups}
            onConfirm={handleConfirmBeforeDelete}
            isLoading={isLoading}
          />

        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
