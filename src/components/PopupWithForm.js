import React from "react";

function PopupWithForm(props) {

    return (
        <div className={`popup ${props.name}-popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <h2 className={`popup__title popup__title_${props.name}`}>
                    {props.title}
                </h2>
                <form onSubmit={props.onSubmit} className="popup__form" name={`${props.name}-form`}>
                    {props.children}
                    <button className="popup__submit-button" type="submit">
                        {props.submitButtonName}
                    </button>
                </form>
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;
