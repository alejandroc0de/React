import { useState } from 'react'
import LargeAirports from './data/LargeAirports.json'
import { MapContainer, Marker, TileLayer, Tooltip, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Map from './Map.jsx'

function Focus(){

    const [city, setCity] = useState("")
    const [focusTime, setFocusTime] = useState(0)
    const [dataOrigin, setDataOrigin] = useState({})
    const [availableAirports, setAvailableAirports] = useState([])
    const [destination, setDestination] = useState()


    function handleCityInput(event){
        setCity(event.target.value)
    }

    function handleSearchAirport(){
        const data = LargeAirports.find(a => a.municipality.toLowerCase() === city.toLowerCase()) // We find the airport by city name
        // We save the info about the origin airport 
        setDataOrigin(data)
        // We filter using comparing each airport lat and long to the origin, and return all airports in a range of 10+- minutes. We save the airports 
        const listAirports = LargeAirports.filter(airport => {
            let time = findFligthTime(data.latitude_deg, data.longitude_deg, airport.latitude_deg, airport.longitude_deg)
            return time >= focusTime -10 && time <= focusTime+10
        })
        setAvailableAirports(listAirports)
        console.log(listAirports)
    }

    function handleInputTime(event){
        setFocusTime(Number(event.target.value))
    }

    // MATH FUNCTIONS TO FIND OUT TIMES 
    const degToRad = (deg) => {
        return (deg*Math.PI) / 180
    }
    function findFligthTime(lat1,long1,lat2,long2){
        // CHANGE TO RANDIANS 
        lat1 = degToRad(lat1)
        long1 = degToRad(long1)

        lat2 = degToRad(lat2)
        long2 = degToRad(long2)

        // Haversine Formula // 
        const earthRadius = 6371;
        let lonDifference = long1-long2
        let latDifference = lat1-lat2

        let a = 
            Math.pow(Math.sin(latDifference/2),2)+
            Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin(lonDifference/2),2);
        let c =2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let distanceKm = earthRadius * c
        let timeTaken = Math.ceil((distanceKm/850)*60) // 850kmh average cruise speed in kmh
        return timeTaken
    }






    return(
        <div>
            <input value={city} onChange={handleCityInput} type="text" placeholder='Enter city name'/>
            <input value={focusTime} onChange={handleInputTime} type="text" placeholder='Focus time' />
            <br />
            <button onClick={handleSearchAirport} >Submit</button>
            <Map
                dataOrigin = {dataOrigin}
                availableAirports = {availableAirports}
                destination = {destination}
                setDestination = {setDestination}
            />
        </div>
    )

}


export default Focus