import React, { useState } from 'react';
import useFetch from './useFetch';

const Weather = () => {
    const [city, setCity] = useState(''); // Default city
    const [query, setQuery] = useState(null); // Query to trigger fetch
    const [showDetails, setShowDetails] = useState(false);
    const weatherApi = useFetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
    );

    const handleInputChange = (e) => {
        setCity(e.target.value); 
    };

    const handleSearch = () => {
        setQuery(city); 
        setShowDetails(true)
    };

    

    console.log(weatherApi);

    return (
        <div
            style={{ minHeight: '100vh',backgroundImage: `url('https://t4.ftcdn.net/jpg/10/53/34/87/360_F_1053348742_kjOhfML4NlIYQCQlkBrBfhAmvBbbRKoV.jpg')`, 
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: 'white', 
                 }}
            className="text-dark text-center my-5 d-flex justify-content-center align-items-center"
        >
            <div>
                <h1>WeatherApp</h1>

                <div className="d-flex m-5">
                    <input
                        id="userInput"
                        type="text"
                        className="form-control w-75"
                        placeholder="Enter any city name"
                        value={city}
                        onChange={handleInputChange}
                    />
                    <button className="ms-2 btn btn-success" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                    
                {showDetails && weatherApi ? (
                    <div>
                        {/* city */}
                        <h4>City: {weatherApi?.name}</h4>

                        {/* temperature */}
                        <h4>Temperature: {weatherApi?.main?.temp}°C</h4>

                        {/* humidity */}
                        <h4>Humidity: {weatherApi?.main?.humidity}%</h4>

                        {/* pressure */}
                        <h4>Pressure: {weatherApi?.main?.pressure} Pa</h4>

                        {/* country */}
                        <h4>Country: {weatherApi?.sys?.country}</h4>

                        {/* sunrise */}
                        <h4>Sunrise: {new Date(weatherApi?.sys?.sunrise * 1000).toLocaleTimeString()}</h4>

                        {/* sunset */}
                        <h4>Sunset: {new Date(weatherApi?.sys?.sunset * 1000).toLocaleTimeString()}</h4>

                        {/* weather details */}
                        <h4>Weather Details:</h4>
                        {weatherApi?.weather?.map((item) => (
                            <p key={item.id || item.description}>
                                {item.main}: {item.description}, <img src={`https://openweathermap.org/img/w/${item.icon}.png`} alt="icon" />
                            </p>
                        ))}
                    </div>
                ) : showDetails ? (
                    <p>Loading...</p>
                ):null}
            </div>
        </div>
    );
};

export default Weather;
