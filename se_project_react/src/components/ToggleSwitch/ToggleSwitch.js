import './ToggleSwitch.css';
import React from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';


function ToggleSwitch() {
    const temperatureUnit = React.useContext(CurrentTemperatureUnitContext);

    return (
        <label className="toggle-switch__label" htmlFor="toggle-switch">
            <input type="checkbox" onChange={temperatureUnit.handleToggleSwitchChange} checked={(temperatureUnit.currentTemperatureUnit==='C')} className="toggle-switch__input" id="toggle-switch"/>
            <div className="toggle-switch__content">
                <span className={(temperatureUnit.currentTemperatureUnit==='C')?'':'toggle-switch__fahrenheit'}>F</span>
                <span className={(temperatureUnit.currentTemperatureUnit==='C')?'toggle-switch__celsius':''}>C</span>
            </div>
        </label>
    )
}

export default ToggleSwitch;