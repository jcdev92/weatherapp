import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CardWeather from './assets/components/CardWeather'

function App() {
  const [coords, setCoords] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latlon = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        setCoords(latlon)
      },
      (err) => console.log(err)
    )
  }, [])
  

  return (
    <div className="App">
      <CardWeather lat={coords?.lat} lon={coords?.lon}/>
    </div>
  )
}

export default App
