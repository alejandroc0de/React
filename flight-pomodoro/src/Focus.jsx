import { useState } from 'react'
import LargeAirports from './data/LargeAirports.json'
function Focus(){

    const [city, setCity] = useState("")
    const [focusTime, setFocusTime] = useState("")


    function handleCityInput(event){
        setCity(event.target.value)
    }

    function handleSearchAirport(){
        console.log(city)
        const data = LargeAirports.find(a => a.municipality.toLowerCase() === city.toLowerCase())
        console.log(data)
    }

    function handleInputTime(event){
        setFocusTime(event.target.value)
    }

    function handleFocusTime(){
        console.log(`Focus time is ${focusTime} and the target airport is ${data.name}`)
    }











    return(
        <div>
            <input value={city} onChange={handleCityInput} type="text" placeholder='Enter city name'/>
            <button onClick={handleSearchAirport} >Submit</button>
            <br />
            <input value={focusTime} onChange={handleInputTime} type="text" placeholder='Focus time' />
            <button onClick={handleFocusTime}>Submit</button>
        </div>
    )

}


export default Focus