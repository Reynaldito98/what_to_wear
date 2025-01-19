import './Header.css';
import headerLogo from '../../images/logo.png';
import React from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';
import {Link} from 'react-router-dom';

function Header(props) {
    const user = React.useContext(CurrentUserContext);

    return (
            <header className="header">
                <div className="header__left-column">
                    <Link to='/'>
                        <img src={headerLogo} className="header__logo" alt="header logo"></img>
                    </Link>
                    <p className="header__date-location">{props.currentDate}, {props.cityName}</p>
                </div>

                <div className="header__right-column">
                    <ToggleSwitch handleChange={props.handleToggleSwitchChange}/>
                    {props.isLoggedIn ?
                        <div className="header__right-container">
                            <button className="header__add-clothes-button" onClick={props.openModal}>+ Add clothes</button>
                            <div className="header__profile">
                                <Link to='/profile' className="header__username">
                                    <p>{user.currentUser.name}</p>
                                    <img src={user.currentUser.avatar} alt="header avatar" className="header__avatar"></img>
                                </Link>
                            </div>
                        </div>  :
                        <div className="header__right-container">
                            <Link to='/register' className="header__button">Sign up</Link>
                            <Link to='/login' className="header__button">Sign in</Link>
                        </div>}
                </div>
            </header>
    )
}


export default Header;