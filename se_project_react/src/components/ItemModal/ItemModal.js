import '../ModalWithForm/ModalWithForm.css';
import './ItemModal.css';
import closeButton from '../../images/Group 119.png';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';

function ItemModal(props) {
    const user = React.useContext(CurrentUserContext);
    const isOwn = (props.card.owner === user.currentUser._id);  
    const itemDeleteButtonClassName = `${isOwn?"modal-image__delete-btn_visible":"modal-image__delete-btn_invisible"}`;

    function handleClick(evt) {
        evt.preventDefault();
        props.onClose();
    }

    function handleRemoteClick(evt){
        if (evt.target === evt.currentTarget) { 
            handleClick(evt);
        }
    }

    React.useEffect(() => {
        if (!props.modalOpened) return;
        function handleEscClose(evt) {
            if(evt.key === 'Escape') {
                handleClick(evt);  
            }
        }

        window.addEventListener('keydown', handleEscClose);
        return () => {
            window.removeEventListener("keydown", handleEscClose);
        };
    }, [props.modalOpened])

    return (
        <div onMouseDown={handleRemoteClick} className={`modal modal-image ${(props.modalOpened)?'modal_opened':''}`}>
            <div className="modal-image__container">
                <img src={props.card.imageUrl} className="modal-image__image" alt={props.card.name}></img>
                <div className="modal-image__card-info-container">
                    <div className="modal-image__card-info">
                        <p className="modal-image__item-name">{props.card.name}</p>
                        <p className="modal-image__weather">Weather: <span className="modal-image__weather-type">{props.card.weather}</span></p>
                        <button className="modal-image__close-button" onClick={props.onClose}><img src={closeButton} alt="modal close button"></img></button>
                    </div>
                    <button className={`modal-image__delete-btn ${itemDeleteButtonClassName}`} onClick={props.onConfirmationModalOpen} type="button">Delete Item</button>
                </div>
            </div>
        </div>
    )
}

export default ItemModal;