import { React, useState, useEffect } from "react";
import axios from "axios";

const CardWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState({});
  const [isCelsius, setFahrenheit] = useState(true);

  useEffect(() => {
    if (lat) {
      const APIKey = "6b4fdb4823e7eafde14fb6d94c503189";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      axios
        .get(URL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [lat, lon]);

  useEffect(() => {
    if (weather) {
      const kelvin = weather.main?.temp;
      const celsius = (kelvin - 273.15).toFixed(2);
      const fahrenheit = (celsius * 1.8 + 32).toFixed(2);
      setTemp({
        celsius,
        fahrenheit,
      });
    }
  }, [temp]);

  const handleChange = () => {
    isCelsius ? setFahrenheit(false) : setFahrenheit(true);
  };

  return (
    <div>
      <div className="card">
        <h1>Weather App</h1>
        <div className="card-body">
          <h2 className="card-title">{weather.name}</h2>
          <p className="card-text" id="temperature">
            <span>
              <i className="fas fa-thermometer-three-quarters"></i>
            </span>
            <strong>Temperature:</strong>{" "}
            {isCelsius ? temp.celsius : temp.fahrenheit} {isCelsius ? "C" : "F"}
            &deg;
          </p>
          <p className="card-text">
            <span>
              <i className="fas fa-cloud"></i>
            </span>
            <strong>Clouds:</strong> {weather.weather?.[0].description}{" "}
            {weather.clouds?.all}%
          </p>
          <p className="card-text">
            <span>
              <i className="fas fa-wind"></i>
            </span>
            <strong>Wind speed:</strong> {weather.wind?.speed} m/s
          </p>
          <p className="card-text">
            <span>
              <i class="fa-solid fa-temperature-low"></i>
            </span>
            <strong>Pressure:</strong> {weather.main?.pressure} mb
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleChange}>
          Switch {isCelsius ? "F" : "C"} &deg;
        </button>
      </div>
    </div>
  );
};

export default CardWeather;
