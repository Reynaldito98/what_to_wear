import './AddItemModal.css';
import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function AddItemModal(props) {
      const [itemName, setItemName] = React.useState('');
      const [imageURL, setImageURL] = React.useState('');
      const [weather, setWeather] = React.useState('');
      const [inputNameValid, setInputNameValid] = React.useState(false);
      const [errorMessage, setErrorMessage] = React.useState('');
      const [errorUrlMessage, setErrorUrlMessage] = React.useState('');
      const [inputUrlValid, setInputUrlValid] = React.useState(false);
      const [inputRadioValid, setInputRadioValid] = React.useState(false);
      const isDisabled = (inputNameValid && inputUrlValid && inputRadioValid);

      React.useEffect(() => {
        setItemName('');
        setImageURL('');
    }, [props.modalOpened]);


      function handleSubmit(e) {
          e.preventDefault();
          props.onAddItem(itemName, weather, imageURL);
    }

    function handleItemNameChange(evt) {
        setItemName(evt.target.value);
        
        if(evt.target.checkValidity()){
          setInputNameValid(true);
          setErrorMessage('');
        } else{
          setInputNameValid(false);
          setErrorMessage(evt.target.validationMessage);
        }
    }

    function handleImageURLChange(evt) {
        setImageURL(evt.target.value);
        if(evt.target.checkValidity()){
          setInputUrlValid(true);
          setErrorUrlMessage('');
        } else{
          setInputUrlValid(false);
          setErrorUrlMessage(evt.target.validationMessage);
        };
    }

    function handleWeatherChange(evt) {
        if(evt.target.checked) {
            setInputRadioValid(true);
            setWeather(evt.target.id);
        } else{
            setInputRadioValid(false);
        }
    }

    return (
        <ModalWithForm title="New garment" buttonText="Add garment" name="garment" modalOpened={props.modalOpened} onClose={props.handleClose} handleSubmit={handleSubmit} isDisabled={isDisabled} secondButton="" isLoggedIn={props.isLoggedIn}>
            <div>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="name">Name</label>
                <input type="text" minLength="3" placeholder="Name" className={`modal__input ${inputNameValid?'':'modal__input_invalid'}`} value={itemName} id="name" onChange={handleItemNameChange} required></input>
                <span className="modal__error-message">{errorMessage}</span>
              </fieldset>
              <fieldset className="modal__fieldset">
                <label className="modal__label" htmlFor="image">Image</label>
                <input type="url" placeholder="Image URL" className={`modal__input ${inputUrlValid?'':'modal__input_invalid'}`} id="image" onChange={handleImageURLChange} required value={imageURL}></input>
                <span className="modal__error-message">{errorUrlMessage}</span>
              </fieldset>

              <fieldset className="modal__fieldset">
                <p className="modal__heading">Select the weather type</p>

                <div className="modal__input-container">
                  <input type="radio" id="hot" name="weather" className="modal__radio" onChange={handleWeatherChange}></input>
                  <label htmlFor="hot" className="modal__label modal__label_radio">Hot</label>
                </div>
                <div className="modal__input-container">
                  <input type="radio" id="warm" name="weather" className="modal__radio" onChange={handleWeatherChange}></input>
                  <label htmlFor="warm" className="modal__label modal__label_radio">Warm</label>
                </div>
                <div className="modal__input-container">
                  <input type="radio" id="cold" name="weather" className="modal__radio" onChange={handleWeatherChange}></input>
                  <label htmlFor="cold" className="modal__label modal__label_radio">Cold</label>
                </div>
              </fieldset>
            </div>
        </ModalWithForm>
    )
}

export default AddItemModal;