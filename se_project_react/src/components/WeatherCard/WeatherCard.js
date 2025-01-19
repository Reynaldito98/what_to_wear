import './WeatherCard.css';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import React from 'react';

function WeatherCard (props) {
    const temperatureUnit = React.useContext(CurrentTemperatureUnitContext);

    return (
        <section className="weather-card" style={{
            backgroundImage: `url(${props.weather})`
        }}>
            <p className="weather-card__temperature">{props.weatherData.temperature[temperatureUnit.currentTemperatureUnit]}</p>
        </section>
    )
}

export default WeatherCard;