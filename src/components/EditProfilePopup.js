import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name='profile' title='Edit profile' submitButtonName='Save'>

            <input className="popup__input popup__input_type_name" id="place-name-input" type="text" name="name"
                placeholder="Имя" minLength="2" maxLength="30" value={name || ''} onChange={handleChangeName} required />

            <span className="popup__error place-name-input-error"></span>

            <input className="popup__input popup__input_type_about" id="place-about-input" type="text" name="about"
                placeholder="Описание" value={about || ''} onChange={handleChangeAbout} required />

            <span className="popup__error url-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;