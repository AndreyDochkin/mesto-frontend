import React from "react";
import iconPass from "../images/icon-pass.svg";
import iconFail from "../images/icon-fail.svg";

function InfoTooltip({ name, onClose, isOpen, isSuccess, messagePass, messageFail }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container`}>
                <img src={isSuccess ? iconPass : iconFail}
                    alt={isSuccess ? "Success" : "Error"}
                    className={`popup__image_registr-confirm`} />
                <h2 className={`popup__title popup__title_${name}`}>
                    {isSuccess ? messagePass : messageFail}
                </h2>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}
export default InfoTooltip;