import './SideBar.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentTemperatureUnitContext';

export default function SideBar(props) {
    const user = React.useContext(CurrentUserContext);

    return (
        <div>
            <div className="sidebar__profile">
                <img src={user.currentUser.avatar} className="sidebar__avatar" alt="header avatar"></img>
                <p className="sidebar__username">{user.currentUser.name}</p>
            </div>
            <button className="sidebar__button" onClick={props.openModal}>Change profile data</button>
            <button className="sidebar__button" onClick={props.handleSignOut}>Log out</button>
        </div>
    )
}