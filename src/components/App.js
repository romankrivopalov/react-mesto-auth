import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/api';
import auth from "../utils/auth";

function App() {
  const navigate = useNavigate(),
        [ loggedIn, setLoggedIn ] = useState(false),
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

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      auth.checkValidityUser(localStorage.getItem('jwt'))
        .then(res => {
          console.log(res)
          setLoggedIn(true);
        })
        .then(() => {
          navigate("/", {replace: true});
        })
    }

    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(res => {
        const [ userData, cardsArray ] = res;
        setCards(cardsArray);
        setCurrentUser(userData);
      })
      .catch(err => console.log(err));
  }, [])

  function checkValidityUser() {

  }

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
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <Header loggedIn={loggedIn} />

          <main>
            <Routes>

              <Route path='/'
                element={<ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />}
              />

              <Route
                path='/signin'
                element={<Login setLoggedIn={setLoggedIn} navigate={navigate} />} />

              <Route
                path='/signup'
                element={<Register navigate={navigate} />} />

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
  );
}

export default App;
