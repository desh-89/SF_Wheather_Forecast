import * as React from "react";

import axios from 'axios';
import Button from "react-bootstrap/Button";

import '../styles/Weather.css';
import Hourly from "./Hourly";
import Current from "./Current";
import Daily from "./Daily";

function Weather(){
    const app_id : string = 'b9928f2b2a68cdfbabcd09eb619b9197';

    const [countryName, setCountryName] = React.useState('');
    const [daily, setDaily] = React.useState([]);
    const [current, setCurrent] = React.useState([]);
    const [hourly, setHourly] = React.useState([]);
    const [clicked,setClick] = React.useState(false);

    const GetLocationFromCountry = async () => {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${countryName}&limit=5&appid=${app_id}`)
        const data :object = res.data
        const latitude :number = data[0].lat;
        const longitude :number= data[0].lon;
        await GetWeatherInfo (latitude,longitude);
    }

    const GetWeatherInfo = async (latitude,longitude) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${app_id}&units=metric`);
        const data = res.data;
        setDaily(data.daily);
        setHourly(data.hourly);
        setCurrent(data.current);
        setClick(true);
    }

    return (
        <div className="wrapper">
            <div className="my-container">
                <h2>Weather app</h2>
                <div className="box">
                    {!clicked ?
                        <>
                            <select className="form-select" aria-label="Default select example" value={countryName} onChange={e=>setCountryName(e.target.value)}>
                                 <option selected>Select City</option>
                                 <option>Ekaterinburg</option>
                                 <option>Moscow</option>
                                 <option>Paris</option>
                                 <option>London</option>
                                 <option>Prague</option>
                             </select>
                             <hr/>
                            <Button variant="success" onClick={GetLocationFromCountry}>Get Weather By Location</Button>
                            <br/>
                        </>
                        :
                        <>
                            <Current name={countryName} data={current}/>
                            <h2>Next 2 days</h2>

                            <div className="grid">
                                {hourly.map((value,index) =>
                                    <Hourly day={index} temp={value.temp} icon={value.weather[0].icon} status={value.weather[0].main} key={value.dt}/>
                                )}
                            </div>
                            <h2>Next 7 days</h2>
                            <div className="grid grid2">
                                {daily.map((value,index) =>
                                    <Daily day={index} temp={value.temp.day} icon={value.weather[0].icon} status={value.weather[0].main} key={value.dt}/>
                                )}
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
export default Weather;