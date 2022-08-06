import { React, useState, useEffect } from "react";
import axios from "axios";

const CardWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState({});
  const [isCelsius, setFahrenheit] = useState(true);
  const [background, setBackground] = useState();

  useEffect(() => {
    if (lat) {
      const APIKey = "6b4fdb4823e7eafde14fb6d94c503189";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      axios
        .get(URL)
        .then((response) => {
          setWeather(response.data);
          const temp = {
            kelvin: response.data.main.temp,
            fahrenheit: Math.round(response.data.main.temp * 9 / 5 - 459.67),
            celsius: Math.round(response.data.main.temp - 273.15),
          }
          setTemp(temp);
        })
        .catch((error) => console.log(error));
    }
  }, [lat, lon]);



  const handleChange = () => {
    isCelsius ? setFahrenheit(false) : setFahrenheit(true);
  };



  // let backgroundClass = {
  //   backgroundImage: `url(${background})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   height: "100vh",
  //   width: "100vw",
  // }

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
              <i className="fa-solid fa-temperature-low"></i>
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
