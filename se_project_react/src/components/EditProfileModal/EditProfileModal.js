import './EditProfileModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';

function EditProfileModal(props) {
    const user = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState('');
    const [nameValid, setNameValid] = React.useState(true);
    const [avatarValid, setAvatarValid] = React.useState(true);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [avatarErrorMessage, setAvatarErrorMessage] = React.useState('');
    const isDisabled = (nameValid && avatarValid);


    React.useEffect(() => {
      setName(`${user.currentUser.name}`);
      setAvatar(`${user.currentUser.avatar}`);
  }, [props.modalOpened]);
    
    
    function handleSubmit(e) {
      e.preventDefault();
      props.onAddItem(name, avatar);
    }

    function handleNameChange(evt) {
      setName(evt.target.value);
        
        if(evt.target.checkValidity()){
          setNameValid(true);
          setNameErrorMessage('');
        } else{
          setNameValid(false);
          setNameErrorMessage(evt.target.validationMessage);
        }
    }

    function handleAvatarChange(evt) {
      setAvatar(evt.target.value);
        
        if(evt.target.checkValidity()){
          setAvatarValid(true);
          setAvatarErrorMessage('');
        } else{
          setAvatarValid(false);
          setAvatarErrorMessage(evt.target.validationMessage);
        }
    }

    return (
        <ModalWithForm title="Change profile data" buttonText="Save changes" name="profile" modalOpened={props.modalOpened} onClose={props.handleClose} handleSubmit={handleSubmit} isDisabled={isDisabled} isLoggedIn={props.isLoggedIn}>
            <div>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="editname">Name*</label>
                <input type="text" placeholder="Name" className="modal__input" id="editname" onChange={handleNameChange} required value={name}></input>
                <span className="modal__error-message">{nameErrorMessage}</span>
              </fieldset>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="editurl">Avatar URL*</label>
                <input type="url" placeholder="Avatar URL" className="modal__input" id="editurl" onChange={handleAvatarChange} required value={avatar}></input>
                <span className="modal__error-message">{avatarErrorMessage}</span>
              </fieldset>
            </div>
        </ModalWithForm>
    )
}

export default EditProfileModal;