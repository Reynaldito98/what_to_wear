import './ModalWithForm.css';
import closeButton from '../../images/Group 119.svg';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function ModalWithForm(props) {
    const history = useHistory();

    function handleClick(evt) {
        evt.preventDefault();
        props.onClose();
    }

    function handleClose(evt) {
        evt.preventDefault();
        history.push('/');
    }

    function handleRemoteClick(evt){
        if (evt.target === evt.currentTarget) { 
            handleClick(evt);
        }
    }

    React.useEffect(() => {
        if (!props.modalOpened) return;
        const handleEscClose = (evt) => {
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
        <div onMouseDown={handleRemoteClick} className={`modal modal_type_${props.name} ${(props.modalOpened)?'modal_opened':''}`}>
            <div className="modal__container">
                 <p>{props.title}</p>
    
                <form onSubmit={props.handleSubmit} noValidate>
                    {props.children}
    
                    <button type="submit" disabled={props.isDisabled?'':'disabled'} className={(props.isDisabled?`modal__button`:`modal__button modal__button_inactive`)}>{props.buttonText}</button>

                    {props.secondButton===""?'':<Link to={`${props.route}`} className="modal__second-button">{props.secondButton}</Link>}
    
                    <button className="modal__close-button" onClick={props.isLoggedIn?handleClick:handleClose} type="button"><img src={closeButton} alt="modal close button"></img></button>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm;