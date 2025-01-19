import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import React from 'react';

function RegisterModal(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [avatar, setAvatar] = React.useState('');
    const [nameValid, setNameValid] = React.useState(false);
    const [avatarValid, setAvatarValid] = React.useState(false);
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [avatarErrorMessage, setAvatarErrorMessage] = React.useState('');
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const isDisabled = (nameValid && emailValid && passwordValid && avatarValid);

    React.useEffect(() => {
      setName('');
      setEmail('');
      setPassword(''); 
      setAvatar(''); 
    }, [props.modalOpened]);
    
    
    function handleSubmit(e) {
      e.preventDefault();
      props.onAddItem(name, avatar, email, password)
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

    function handleEmailChange(evt) {
      setEmail(evt.target.value);
        
        if(evt.target.checkValidity()){
          setEmailValid(true);
          setEmailErrorMessage('');
        } else{
          setEmailValid(false);
          setEmailErrorMessage(evt.target.validationMessage);
        }
    }

    function handlePasswordChange(evt) {
      setPassword(evt.target.value);
        
        if(evt.target.checkValidity()){
          setPasswordValid(true);
          setPasswordErrorMessage('');
        } else{
          setPasswordValid(false);
          setPasswordErrorMessage(evt.target.validationMessage);
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
        <ModalWithForm title="Sign up" buttonText="Sign up" name="register" modalOpened={true} onClose={props.handleClose} handleSubmit={handleSubmit} secondButton="or Log in" route="/login" isDisabled={isDisabled} isLoggedIn={props.isLoggedIn}>
            <div>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="registeremail">Email*</label>
                <input type="email" minLength="3" placeholder="Email" className="modal__input" id="registeremail" onChange={handleEmailChange} required value={email}></input>
                <span className="modal__error-message">{emailErrorMessage}</span>
              </fieldset>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="registerpassword">Password*</label>
                <input type="password" placeholder="Password" className="modal__input" id="registerpassword" onChange={handlePasswordChange} required value={password} autoComplete="username"></input>
                <span className="modal__error-message">{passwordErrorMessage}</span>
              </fieldset>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="registername">Name*</label>
                <input type="text" placeholder="Name" className="modal__input" id="registername" onChange={handleNameChange} required value={name}></input>
                <span className="modal__error-message">{nameErrorMessage}</span>
              </fieldset>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="editprofileurl">Avatar URL*</label>
                <input type="url" placeholder="Avatar URL" className="modal__input" id="editprofileurl" onChange={handleAvatarChange} required value={avatar}></input>
                <span className="modal__error-message">{avatarErrorMessage}</span>
              </fieldset>
            </div>
        </ModalWithForm>
    )
}

export default RegisterModal;