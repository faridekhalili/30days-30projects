import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [data, setData] = useState({});
  const cityRef = useRef('Paris');

  useEffect(() => {
    handleClick();
  }, [])

  const handleClick = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current}&appid=8b056cc4938d7e9a8c51a5162df93618`)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + cityRef.current + "')"
  }

  console.log(data)
  const handleChange = (e) => {
    cityRef.current = e.target.value;
  }

  return (
    <div className='container'>
      <div className='input-box'>
        <input placeholder='Enter a City...' onChange={handleChange}></input>
        <button onClick={handleClick}>X</button>
      </div>
      <p className='temp'>{data.main ? Math.round(data.main.temp - 273.15) + '°C' : ''}</p>
      <p className='city'>{data.name ? data.name : ''}</p>
      <p className='weather'>Weather: {data.weather ? data.weather[0].main : ''}</p>
      <p className='wind'>Wind speed: {data.wind ? data.wind.speed : ''}</p>
    </div>
  );
}

export default App;
