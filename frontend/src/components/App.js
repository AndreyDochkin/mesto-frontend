import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login'
import Register from "./Register";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Loading from './Loading'

import Api from "../utils/Api"
import ApiAuth from "../utils/ApiAuth";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const BASE_URL = 'https://api.picventures.nomoreparties.sbs';
//const BASE_URL = 'http://localhost:3000';

const api = new Api({
    baseUrl: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
});

const apiAuth = new ApiAuth({
    baseUrl: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
});

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedCard, setSelectedCard] = useState({});
    const [deleteCard, setDeleteCard] = useState({});
    const [cards, setCards] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [token, setToken] = useState('');
    const [registrationError, setRegistrationError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate()

    function handleUserSignUp(email, password) {
        apiAuth.registerUser(email, password)
            .then((res) => {
                setRegistrationError(false);
                navigate('/sign-in');
            })
            .catch((err) => {
                setRegistrationError(true);
                console.log(err);
            })
            .finally(() => { setIsInfoTooltipPopupOpen(true) });
    }

    function handleUserSignIn(email, password) {
        apiAuth
            .loginUser(email, password)
            .then((data) => {
                if (data.token) {
                    setLoginError(false)
                    localStorage.setItem("jwt", data.token);
                    api.setHeaderToken(data.token); //! pass toket to header for api request
                    setToken(data.token);
                    setUserEmail(email);
                    setIsLoggedIn(true);
                    navigate('/', { replace: true });
                }
            })
            .catch((err) => {
                setLoginError(true);
                setIsInfoTooltipPopupOpen(true)
                console.log(err);
            });
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) setToken(jwt);
    }, [])

    useEffect(() => {
        if (!token) return;
        if (!isLoggedIn) navigate('/sign-in', { replace: true });

        setIsLoading(true);
        apiAuth
            .checkToken(token)
            .then((res) => {
                if (res) {
                    setCurrentUser(res.data);
                    setUserEmail(res.data.email);
                    api.setHeaderToken(token); //! pass toket to header for api request
                    setIsLoggedIn(true);
                    navigate('/', { replace: true });
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, [navigate, token]);

    function handleSingOut() {
        localStorage.removeItem("jwt");
        setToken('');
        setUserEmail('');
        setIsLoggedIn(false);
        setCurrentUser({});
        navigate("/sign-in");
    }

    useEffect(() => {
        if (!isLoggedIn) return;
        api.getCurrentUser()
            .then((user) => {
                setCurrentUser(user.data);
            })
            .catch((err) => { console.log(err) });
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;
        api.getCards()
            .then((cardItems) => {
                setCards(cardItems.data);
            })
            .catch((err) => { console.log(err) });
    }, [isLoggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
            })
            .catch((err) => { console.log(err) });
    }

    function handleDeleteClick(card) {
        setIsDeletePopupOpen(true);
        setDeleteCard(card);
    }

    function handleConfirmDelete(e) {
        e.preventDefault();
        api.deleteCard(deleteCard._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== deleteCard._id));
            })
            .catch((err) => { console.log(err) });
        closeAllPopups();
    }

    function handleUpdateUser({ name, about }) {
        api.setCurrentUser(name, about)
            .then((newUser) => { setCurrentUser(newUser.data) })
            .catch((err) => { console.log(err) });

        closeAllPopups();
    }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar)
            .then((newUser) => {
                const { name, about } = currentUser;
                setCurrentUser({ name, about, avatar: newUser.data.avatar })
            })
            .catch((err) => { console.log(err) });

        closeAllPopups();
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
            })
            .catch((err) => { console.log(err) });

        closeAllPopups();
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({ ...card });
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeletePopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setSelectedCard({});
        setDeleteCard({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <Header headerEmail={userEmail} onExit={handleSingOut} />
                    <Routes>
                        <Route
                            exect path="/"
                            element={isLoading ? <Loading /> :
                                <ProtectedRoute
                                    element={Main}
                                    cards={cards}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleDeleteClick}
                                    isLoggedIn={isLoggedIn}
                                />
                            }
                        />
                        <Route path="/sign-in" element={<Login loginUser={handleUserSignIn} isLoggedIn={isLoggedIn} />} />
                        <Route path="/sign-up" element={<Register registrationUser={handleUserSignUp} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    <Footer />
                </div>

                <InfoTooltip
                    name={"registr-confirm"}
                    onClose={closeAllPopups}
                    isOpen={isInfoTooltipPopupOpen}
                    isSuccess={!registrationError && !loginError}
                    messagePass='Вы успешно зарегистрированы!'
                    messageFail='Что-то пошло не так!'
                />

                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard} />

                <PopupWithForm
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    name='confirm'
                    title='Вы уверены?'
                    submitButtonName='Да'
                    onSubmit={handleConfirmDelete} />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit} />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
