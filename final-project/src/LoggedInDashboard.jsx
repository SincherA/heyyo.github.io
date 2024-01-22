import { useState, useEffect } from 'react';
import Hero from './Hero';
import ToDoList from './ToDoList';
import './LoggedInDashboard.css'

const LoggedInDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState('London');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9b6fde08d2f6062fb430e6ead76846ab`);
      const data = await response.json();
      setWeather(data);
      setIsLoading(false);
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    if (city.trim() === '') {
      setErrorMessage('Please enter a city');
    } else {
      setErrorMessage('');
      setCity(city);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
      <div>
        {!isLoggedIn && <Hero />}
        <p>Welcome to your Dashboard</p>
        <div className="weather-container">
          <div className="dashboard-container">
            {weather && weather.weather && weather.weather.length > 0 && <h2>Weather in {weather.name}</h2>}
            <form onSubmit={handleSearch} className="search-form">
              <input type="text" name="city" placeholder="Search city" />
              <button type="submit">Search</button>
            </form>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          {weather && weather.weather && weather.weather.length > 0 && (
            <div className="weather-details">
              <p>{weather.weather[0].description}</p>
              <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
              <p>Feels like: {Math.round(weather.main.feels_like - 273.15)}°C</p>
              <p>Min temperature: {Math.round(weather.main.temp_min - 273.15)}°C</p>
              <p>Max temperature: {Math.round(weather.main.temp_max - 273.15)}°C</p>
              <p>Cloudiness: {weather.clouds.all}%</p>
            </div>
          )}
        </div>
        <ToDoList /> {/* Add ToDoList component here */}
      </div>
    );
  };

export default LoggedInDashboard;