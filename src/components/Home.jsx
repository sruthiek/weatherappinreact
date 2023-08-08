import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

function Home() {

    const [data, setData] = useState({
        celcius: 10,
        name: 'london',
        humidity: 10,
        speed: 2,
        image: '/images/clouds.png'
    })

    const [name, setName] = useState('')
    const [error, setError] = useState('')



    const handleClick = () => {
        if (name !== "") {
            const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=40cde31b43e495de2b9b3bbe140366d8&&units=metric`;
            axios.get(apiurl).then(res => {

                let imagepath = ''
                if (res.data.weather[0].main == "Clouds") {
                    imagepath = "/images/clouds.png"
                }
                else if (res.data.weather[0].main == "Clear") {
                    imagepath = "/images/clear-sky.png"
                }
                else if (res.data.weather[0].main == "Rain") {
                    imagepath = "/images/heavy-rain.png"
                }
                else if (res.data.weather[0].main == "Drizzle") {
                    imagepath = "/images/drizzle.png"
                }
                else if (res.data.weather[0].main == "Mist") {
                    imagepath = "/images/mist.png"
                }
                else {
                    imagepath = "/images/clouds.png"
                }





                console.log(res.data);

                setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagepath })
            }).catch(err => {

                if (err.response.status == 404) {
                    setError("Invalid City Name")
                } else {
                    setError('')
                }
                console.log(err)

            })
        }
    }

    return (
        <div className='container-fluid'>
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button> <img width="20px" src="/images/cloud-computing.png" alt="" onClick={handleClick} /> </button>
                </div>

                <div className="error">
                    <p> {error} </p>
                </div>

                <div className="winfo">
                    <img className='icon' width="100px" height="100px" src={data.image} alt="" />
                    <h1>{Math.round(data.celcius)} °c</h1>
                    <h2> {data.name} </h2>
                    <div className="details">
                        <div className="col">
                            <img width="45px" src="/images/humidity.png" alt="" />
                            <div className='humidity'>
                                <p> {Math.round(data.humidity)} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">

                            <img width="45px" src="/images/windy.png" alt="" />
                            <div className='wind'>
                                <p>{Math.round(data.speed)}</p>
                                <p> Wind</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home