import '../ModalWithForm/ModalWithForm.css';
import './ConfirmationModal.css';
import React from 'react';
import closeButton from '../../images/Group 119.svg';

function ConfirmationModal(props) {
    function handleClick() {
        props.onClose();
    }

    function handleRemoteClick(evt){
        if (evt.target === evt.currentTarget) { 
            handleClick();
        }
    }

    React.useEffect(() => {
        if (!props.modalOpened) return;
        function handleEscClose(evt) {
            if(evt.key === 'Escape') {
                handleClick() ;   
            }
        }

        window.addEventListener('keydown', handleEscClose);
        return () => {
            window.removeEventListener("keydown", handleEscClose);
        };
    }, [props.modalOpened])

    return (
        <div onMouseDown={handleRemoteClick} className={`modal modal-confirmation ${(props.modalOpened)?'modal_opened':''}`}>
            <div className="modal-confirmation__container">
                <p className="modal-confirmation__delete-heading">Are you sure you want to delete this item?. This action is irreversible</p>
                <button className="modal-confirmation__yes-button" onClick={props.handleDeleteCard}>Yes, delete item</button>
                <button className="modal-confirmation__cancel-button" onClick={handleClick}>Cancel</button>
                <button className="modal__close-button" type="button" onClick={handleClick}><img src={closeButton} alt="modal close button"></img></button>
            </div>
        </div>
    )
}

export default ConfirmationModal;