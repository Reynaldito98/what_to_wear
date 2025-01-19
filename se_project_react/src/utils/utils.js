import { apiKey, latitude, longitude } from "./constants";
import { checkResponse } from "./api";

function getWeatherInfo() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
                .then(checkResponse)
}

export {getWeatherInfo}