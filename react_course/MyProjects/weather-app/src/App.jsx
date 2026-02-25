import {useState } from 'react'
import "tailwindcss";
import './App.css'

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState("")
  //Mensajes de apoyo al user
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState()



  async function searchCity(){
    console.log(city)
    //Mensaje cargando...
    setLoading(true)
    try {
      const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=640f073a6ad849cdb78220208262502&q=${city}&aqi=no`)
      const data = await res.json()
      if(data.error){
        setError(true);
        setWeather("")
        return
      }
      const temp = (data.current.temp_c)
      const feelsLike = (data.current.feelslike_c)
      const status = (data.current.condition.text)
      const dewPoint = (data.current.dewpoint_c)
      const newWeather = {Place:city, Temp:temp, Feelslike:feelsLike, Status:status, DewPoint:dewPoint}
      setError(false)
      // NO hay error entonces no poner mensaje error
      setWeather(newWeather)
    } catch (error) {
        window.alert("Server issues, try again later")
    }finally{
      setLoading(false)
      // siempre quitar el loading 
    }
  }


  function handleCity(event){
    console.log(event.target.value)
    setCity(event.target.value)
  }


  return(
    <>
      <h1 className='' >Weather App</h1>
      <input value={city} onChange={handleCity} type="text" placeholder='Enter the name of the city to lookup' name="" id="" />
      <button onClick={searchCity}>Search</button>
      {weather && <p>La temperatura es : {weather.Temp}, feels like {weather.Feelslike}, the status is {weather.Status} and the DewPoint is {weather.DewPoint}</p>}
      {error && <p>Error al buscar la ciudad, revisa la ciudad ingresada</p>}
      {loading && <p>Cargando informacion....</p>}
    </>
  )
}

export default App
