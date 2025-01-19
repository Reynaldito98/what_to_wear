import './App.css';
import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import LoginModal from '../LoginModal/LoginModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getWeatherInfo } from '../../utils/utils';
import { getClothingItems, postClothingItem, deleteClothingItem, editProfileInfo, addCardLike, deleteCardLike } from '../../utils/api';
import { CurrentTemperatureUnitContext, CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';
import { currentDate } from '../../utils/constants';
import { loginUser, registerUser, getToken } from '../../utils/auth';
import daySunny from '../../images/sunny.png';
import dayRain from '../../images/dayRain.png';
import dayRainStorm from '../../images/DayRainStorm.png';
import dayCloudy from '../../images/daySunnyCloudy.png';
import daySnow from '../../images/daySnow.png';
import dayMist from '../../images/Cloudy.png'
import nightRainStorm from '../../images/NightRainStorm.png';
import nightRain from '../../images/nightRain.png';
import nightClear from '../../images/NightClear.png';
import nightCloudy from '../../images/NightCloudy.png';
import nightSnow from '../../images/NightSnow.png';
import nightMist from '../../images/NightMist.png';
import {Switch, Route, useHistory} from 'react-router-dom';   

function App() {
  const [addModalOpened, setAddModalOpened] = React.useState(false);
  const [imageModalOpened, setImageModalOpened] = React.useState(false);
  const [editProfileOpened, setEditProfileOpened] = React.useState(false);
  const [confirmationModalOpened, setConfirmationModalOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cityName, setCityName] = React.useState('');
  const [tempF, setTempF] = React.useState(0);
  const [tempC, setTempC] = React.useState(0);
  const [weather, setWeather] = React.useState('');
  const [tempDescription, setTempDescription] = React.useState('');
  const [clothingItems, setClothingItems] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');
  const [currentUser, setCurrentUser] = React.useState({});
  const weatherData = {
    temperature: {
      C: `${Math.round(tempC)}°C`,
      F: `${Math.round(tempF)}°F`
    }
  };
  const history = useHistory();


  function handleEditProfileOpen() {
    setEditProfileOpened(true);
  }

  function handleEditProfileClose() {
    setEditProfileOpened(false);
  }  

  function handleAddModalOpen() {
    setAddModalOpened(true);
  }

  function handleAddModalClose() {
    setAddModalOpened(false);
  }

  function handleConfirmationModalOpen() {
    setConfirmationModalOpened(true);
  }

  function handleConfirmationModalClose() {
    setConfirmationModalOpened(false);  
  }

  function handleImageModalOpen(card){
    setImageModalOpened(true);
    setSelectedCard(card);
  }

  function handleImageModalClose() {
    setImageModalOpened(false);
  }

  function handleDeleteCard(evt) {
      const token = localStorage.getItem('jwt');

      evt.preventDefault();
      deleteClothingItem(selectedCard._id, token)
        .then(() => {
          clothingItems.splice(clothingItems.indexOf(selectedCard), 1)
          setClothingItems([...clothingItems]);
          setImageModalOpened(false);
          setConfirmationModalOpened(false);
        })
        .catch(err => {
          console.log(err);
        })
  }

  function handleAddItemSubmit( name, weather, imageUrl) {
      const token = localStorage.getItem('jwt');

      postClothingItem(name, weather, imageUrl, token)
      .then(data => {
        setClothingItems([data, ...clothingItems]);
        handleAddModalClose();
      })
      .catch(err => console.log(err))
  }

  function handleRegisterSubmit(name, avatar, email, password) {
    registerUser(name, avatar, email, password)
      .then(() => {
        history.push('/login');
      })
      .catch(err => console.log(err));
  }

  function handleEditProfileSubmit(name, avatar) {
      const token = localStorage.getItem('jwt');

      editProfileInfo(name, avatar, token)
      .then((res) => {
        setCurrentUser({
          name: res.data.name,
          avatar: res.data.avatar,
          _id: res.data._id,
          email: res.data.email,
        })
        handleEditProfileClose();
      })
      .catch(err => console.log(err))
  }

  function handleLoginSubmit( email, password) {
    if(!email || !password) {
      return;
    }

    loginUser(email, password) 
      .then((res) => {
          if(res.token) {
            localStorage.setItem('jwt', res.token);
            setIsLoggedIn(true);
            history.push('/');
            getToken(res.token)
            .then(data => {
              setCurrentUser({
                name: data.data.name,
                avatar: data.data.avatar,
                email: data.data.email,
                _id: data.data._id
              })  
            })
          }
        }
      )
      .catch(err => console.log(err));
  }

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/login');
  }

  function handleCardLike(id, isLiked) {
    const token = localStorage.getItem('jwt');

        !isLiked ?
          addCardLike(id, token) 
          .then((updatedCard) => {
            setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch(err => console.log(err))
    :
          deleteCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item))
          );
        })
          .catch(err => console.log(err))
    }

  const handleToggleSwitchChange = () => {
    (currentTemperatureUnit === 'F') ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  React.useEffect(() => {
    getWeatherInfo()
        .then(data => {
            setCityName(data.name);
            setTempF(data.main.temp);
            setTempC((data.main.temp - 32) * 5/9);


            if((Date.now()/1000) > data.sys.sunset || (Date.now()/1000) < data.sys.sunrise){
              if(data.weather[0].main === 'Thunderstorm'){
                  setWeather(nightRainStorm);
              } else if(data.weather[0].main === 'Clear') {
                  setWeather(nightClear);
              } else if(data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                  setWeather(nightRain);
              } else if(data.weather[0].main === 'Snow') {
                  setWeather(nightSnow);
              } else if(data.weather[0].main === 'Atmosphere') {
                  setWeather(nightMist);
              } else {
                  setWeather(nightCloudy);
              }
            } else {
                if(data.weather[0].main === 'Thunderstorm'){
                    setWeather(dayRainStorm);
                } else if(data.weather[0].main === 'Clear') {
                    setWeather(daySunny);
                } else if(data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                    setWeather(dayRain);
                } else if(data.weather[0].main === 'Snow') {
                    setWeather(daySnow);
                } else if(data.weather[0].main === 'Atmosphere') {
                    setWeather(dayMist);
                } else {
                    setWeather(dayCloudy);
                }
            }

            if(data.main.temp >= 86){
              setTempDescription('hot');
            } else if(data.main.temp <= 65) {
              setTempDescription('cold');
            } else {
              setTempDescription('warm');
            }
          })
          .catch(err => {
            console.log(err);
          })


      getClothingItems()
        .then(data => {
          setClothingItems(data.reverse());
        })
        .catch(err => {
          console.log(err);
        })
    }, [])


    React.useEffect(() => {
      const jwt = localStorage.getItem('jwt');
    
      if(jwt) {
        getToken(jwt)
        .then(data => {
          setIsLoggedIn(true);
          setCurrentUser({
            name: data.data.name,
            avatar: data.data.avatar,
            email: data.data.email,
            _id: data.data._id,
            }) 
        })
        .catch(err => console.log(err));
      }
    }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
              <Header currentDate={currentDate} openModal={handleAddModalOpen} cityName={cityName} isLoggedIn={isLoggedIn}/>
              <Switch>  
                <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                  <Profile defaultClothingItems={clothingItems} openModal={handleAddModalOpen} openImageModal={handleImageModalOpen} openEditModal={handleEditProfileOpen} handleSignOut={handleSignOut} onCardLike={handleCardLike} isLoggedIn={isLoggedIn}/>
                </ProtectedRoute>
                <Route path="/register">
                  <RegisterModal modalOpened={true} onAddItem={handleRegisterSubmit} handleClose={handleAddModalClose} isLoggedIn={isLoggedIn}/>  
                  <Main onCardLike={handleCardLike} defaultClothingItems = {clothingItems} weather={weather} tempDescription={tempDescription} openImageModal={handleImageModalOpen} weatherData = {weatherData} isLoggedIn={isLoggedIn}/>                                                                                                                       
                </Route>
                <Route path="/login">
                  <LoginModal modalOpened={true} onAddItem={handleLoginSubmit} handleClose={handleAddModalClose} isLoggedIn={isLoggedIn}/>
                  <Main onCardLike={handleCardLike} defaultClothingItems = {clothingItems} weather={weather} tempDescription={tempDescription} openImageModal={handleImageModalOpen} weatherData = {weatherData} isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/">
                  <Main onCardLike={handleCardLike} defaultClothingItems = {clothingItems} weather={weather} tempDescription={tempDescription} openImageModal={handleImageModalOpen} weatherData = {weatherData} isLoggedIn={isLoggedIn}/>
                </Route>
              </Switch>
              <ItemModal onClose={handleImageModalClose} modalOpened={imageModalOpened} card={selectedCard} onConfirmationModalOpen={handleConfirmationModalOpen}/>
              <EditProfileModal isLoggedIn={isLoggedIn} modalOpened={editProfileOpened} onAddItem={handleEditProfileSubmit} handleClose={handleEditProfileClose}/>
              <AddItemModal isLoggedIn={isLoggedIn} modalOpened={addModalOpened} onAddItem={handleAddItemSubmit} handleClose={handleAddModalClose}/>
              <ConfirmationModal modalOpened={confirmationModalOpened} onClose={handleConfirmationModalClose} handleDeleteCard={handleDeleteCard}/>
              <Footer />
          </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
