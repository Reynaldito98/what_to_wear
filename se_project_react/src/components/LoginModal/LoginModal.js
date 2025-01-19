import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import React from 'react';

function LoginModal(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const isDisabled = (emailValid && passwordValid);

    React.useEffect(() => {
      setEmail('');
      setPassword('');
  }, [props.modalOpened]);


    function handleSubmit(e) {
      e.preventDefault();
      props.onAddItem(email, password);
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
      };
  }

    return (
        <ModalWithForm title="Log in" buttonText="Log in" name="login" modalOpened={props.modalOpened} onClose={props.handleClose} handleSubmit={handleSubmit} isDisabled={isDisabled} secondButton="or Register" route="/register" isLoggedIn={props.isLoggedIn}>
            <div>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="loginemail">Email</label>
                <input type="email" minLength="3" placeholder="Email" className={`modal__input ${emailValid?'':'modal__input_invalid'}`} value={email} id="loginemail" onChange={handleEmailChange} autoComplete="off" required></input>
                <span className="modal__error-message">{emailErrorMessage}</span>
              </fieldset>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="loginpassword">Password</label>
                <input type="password" placeholder="Password`" autoComplete="username" className={`modal__input ${passwordValid?'':'modal__input_invalid'}`} id="loginpassword" onChange={handlePasswordChange} required value={password}></input>
                <span className="modal__error-message">{passwordErrorMessage}</span>
              </fieldset>
            </div>
        </ModalWithForm>
    )
}

export default LoginModal;