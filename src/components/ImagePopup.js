import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup image-popup ${props.card.link ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_image">
                <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
                <h2 className="popup__caption">{props.card.name}</h2>
                <button className="popup__close-button popup__close-button_shifted" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;
