import axios from 'axios'
import React, { useState } from 'react'

const Weather = () => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [temprature, setTemprature] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [description, setDescription] = useState("");
    const [showWeather, setShowWeather] = useState("");
    const [icon, setIcon] = useState("");
    const getWeatherData = async(city, country) => {
        await axios({
            method: 'Get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=083c58bcd138eb76a8f6ae04bf80d628`
        }).then((res) => {
            console.log(res.data)
            setTemprature(res.data.main.temp - 273.15)
            setIcon(res.data.weather[0].icon)
            setMin(res.data.main.temp_min - 273.15)
            setMax(res.data.main.temp_max - 273.15)
            setDescription(res.data.weather[0].description)
            setCountry(res.data.sys.country)
            setShowWeather(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="container my-4">
            <input
                className="mx-1 p-1" 
                type="text" 
                value={city} 
                onChange={(event) => setCity(event.target.value)}
                placeholder="city name"
            />
            <input 
                className="mx-1 p-1"
                type="text" 
                value={country} 
                onChange={(event) => setCountry(event.target.value)}
                placeholder="country name"
            />
            <button
                style={{backgroundColor: "#51456a", fontWeight: "bold", fontSize: 20, border: 0}} 
                className="btn btn-primary" 
                onClick={() => getWeatherData(city, country)}
            >Get Weather</button>

            {showWeather ? (<div className="data_container p-4 my-5">
                <h1>{city},{country}</h1>
                <div className="my-2">
                    <img 
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
                        alt="weather-icon" 
                        style={{width: 200, height: 200}}/>
                </div>
                {temprature ? (<h1>{Math.floor(temprature)}℃</h1>) : null}
                <h4 className="my-4">Min:<span>{Math.floor(min)}℃</span>
                <span className="mx-3"> | </span>Max:<span>{Math.floor(max)}℃</span></h4>
                <h1>{description}</h1>
                <h4 className="my-4">Date: {new Date().toLocaleDateString()}</h4>
            </div>) : null}
            
        </div>
    )
}

export default Weather
