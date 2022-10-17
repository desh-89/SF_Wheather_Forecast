import * as React from "react";

import '../styles/Weather.css';
function Current(props){
    return (
        <>
            <div className="weather__header">
                <div className="weather__main">
                    <div className="weather__city"><h1>{props.name}</h1></div>
                </div>

                <div className="weather__icon">
                    <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}.png`} alt={props.data.weather[0].main}/>
                </div>
            </div>
            <div className="weather__temp"><h1>Current: {props.data.temp}°C</h1></div>
        </>
    )
}

export default Current;