import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'; // 1. Import useRef

function App() {
  const [data, setData] = useState({});
  const cityRef = useRef('Paris'); // 2. Use useRef for city

  useEffect(() => {
    handleClick();
  }, []) // 3. Removed city dependency

  const handleClick = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current}&appid=8b056cc4938d7e9a8c51a5162df93618`)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + cityRef.current + "')" // 4. Use cityRef.current
  }

  console.log(data)
  const handleChange = (e) => { // 5. Handle change function
    cityRef.current = e.target.value; // 6. Update cityRef.current
  }

  return (
    <div className='container'>
      <div className='input-box'>
        <input placeholder='Enter a City...' onChange={handleChange}></input> // 7. Controlled input with useRef
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

