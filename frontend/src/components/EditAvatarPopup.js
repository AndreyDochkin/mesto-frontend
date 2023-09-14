import React, { useEffect } from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const inputAvatar = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: inputAvatar.current.value
        });
    }

    useEffect(() => {
        inputAvatar.current.value = '';
    },[props.isOpen])

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name='avatar' title='Updatr avatar' submitButtonName='Save'>
            <input className="popup__input popup__input_type_avatar" id="url-avatar-input" type="url" name="avatar"
                placeholder="Ссылка на аватар" ref={inputAvatar} required />
            <span className="popup__error url-avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;