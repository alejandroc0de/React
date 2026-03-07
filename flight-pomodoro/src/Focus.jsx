import { useState, useEffect, useRef} from 'react'
import LargeAirports from './data/LargeAirports.json'
import 'leaflet/dist/leaflet.css'
import Map from './Map.jsx'

function Focus(){

    const [city, setCity] = useState("")
    const [focusTime, setFocusTime] = useState("")
    const [dataOrigin, setDataOrigin] = useState({})
    const [availableAirports, setAvailableAirports] = useState([])
    const [destination, setDestination] = useState()
    const [isRunning, setIsRunning] = useState()
    const [seconds, setSeconds] = useState(0)
    const intervalIdRef = useRef(null) // SetInterval
    const [progress, setProgress] = useState()
    const audioRef = useRef()
    const successAudio = useRef()
    const [landed, setLanded] = useState(false)


    // This useffect listen to isRunning and while running plays the inflight sounds!
    useEffect(()=> {
        if(isRunning){
            audioRef.current.play()
        }else{
            audioRef.current.pause()
        }
    },[isRunning])

    useEffect(()=> {
        if(isRunning){
            intervalIdRef.current = setInterval( ()=> {
                setSeconds(prevSecs => prevSecs+1)
            },1000);
        }
        return()=>{
            clearInterval(intervalIdRef.current)
        }
    },[isRunning])

    // The progress has to be calculated outside the Interval since it is async and it may not be readily updated for the calc 
    useEffect(()=>{
        if(destination&&seconds>0){
            const newProgress = (seconds/(destination.flightTime*60)) // flighttime is in seconds so we have to pass it to minutes for the calc 
            setProgress(newProgress)
        }
        if(destination && seconds>=(destination.flightTime*60) ){
            successAudio.current.play()
            setIsRunning(false)
            setSeconds(0)
            setCity("")
            setLanded(true)
            setFocusTime("")
            setAvailableAirports([])            
        }
    },[seconds]) // I only updated progress after seconds is changed



    function handleCityInput(event){
        setCity(event.target.value)
    }

    function handleSearchAirport(){
        const data = LargeAirports.find(a => a.municipality.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"") === city.toLowerCase()) // We find the airport by city name
        if(data == undefined){
            window.alert("City not found")
            return
        }
        // I save the info about the origin airport 
        setDataOrigin(data)
        // Lets add the flight time from origin to each airport 
        let listAirports = LargeAirports.map( airport => ({
            ...airport, flightTime : findFlightTime(data.latitude_deg, data.longitude_deg, airport.latitude_deg, airport.longitude_deg)
        }))

        // We filter using comparing each airport lat and long to the origin, and return all airports in a range of 10+- minutes. We save the airports, easier to read having 2 dif methods
        listAirports = listAirports.filter(airport => {
            return airport.flightTime >= Number(focusTime) -10 && airport.flightTime <= Number(focusTime)+10 // I only convert to Number until here, because of input reasons, 0 showing up making everything act weird
        })
        setAvailableAirports(listAirports)
    }

    function handleInputTime(event){
        setFocusTime(event.target.value)
    }

    // MATH FUNCTIONS TO FIND OUT TIMES 
    const degToRad = (deg) => {
        return (deg*Math.PI) / 180
    }
    function findFlightTime(lat1,long1,lat2,long2){
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


    // CREATE TIMER FOR FLIGTH PLAN 

    function handleFlightPath(){
        if(isRunning){
            return
        }
        setIsRunning(true) // This is used by the interval
        setProgress(seconds/destination.flightTime)
    }
    function formatTime(){
        const minutos = Math.floor(seconds/60)
        const segundos = seconds%60
        return(<p className=' flex flex-row items-center rounded-2xl text-center p-4 text-5xl backdrop-blur-xs'>{String(minutos).padStart(2,'0')}:{String(segundos).padStart(2,'0')}</p>)
    }


    // CONTROLS FOR THE TIMMER 
    function handlePause(){
        if(isRunning && seconds>0){
            setIsRunning(false)
        }
        if(!isRunning && seconds>0){
            setIsRunning(true)
        }
    }

    function handleReset(){
        setLanded(false)
        setIsRunning(false)
        setSeconds(0)
        setCity("")
        setDestination()
        setFocusTime("")
        setAvailableAirports([])
    }



    return(
        <div className='h-full flex flex-col relative'>
            <div className='flex flex-row z-1000 items-center justify-center p-3 gap-5 '>
                <input value={city} onChange={handleCityInput} type="text" placeholder='Enter city name' className=' border-b outline-none backdrop-blur-xs p-2 text-2x2 rounded-2xl m-2'/>
                <input value={focusTime} onChange={handleInputTime} type="number" placeholder='Focus time' className='border-b outline-none backdrop-blur-xs p-2 text-2x2 rounded-2xl m-2'/>
                {!destination && <button onClick={handleSearchAirport} className='backdrop-blur-xs border-b p-3 text-2x2 rounded-2xl m-2 hover:scale-115 transition-all duration-150' >Search Destination</button> }
                {destination && !isRunning && <button onClick={handleFlightPath} className='backdrop-blur-md p-3 border-b font-medium text-2x2 rounded-2xl m-2 hover:scale-115 transition-all duration-150'>Let's Fly</button>}
                {destination && isRunning && <button className='backdrop-blur-md p-3 border-b font-medium text-2x2 rounded-2xl m-2' >Flight time : {destination.flightTime} mins</button>}
            </div>
            <div id='conditionalMessage'>
                {landed && <div className='flex absolute border-2 inset-0 z-50 items-center justify-center backdrop-blur-md'>
                    <div className='text-center'>
                                    <h2 className='text-2xl'>You have arrived!</h2>
                                    <p>Welcome to {destination.municipality} </p> 
                                </div>
                    </div> 
                }

            </div>

            <Map
                dataOrigin = {dataOrigin}
                availableAirports = {availableAirports}
                destination = {destination}
                setDestination = {setDestination}
                progress = {progress}
            /> {/* Props for the Map.jsx*/}  
               

            
            <div className='flex flex-row justify-center gap-5 text-3xl p-4 z-1000 absolute bottom-10 left-1/2 transform -translate-x-1/2 backdrop-blur-xs rounded-4xl'>
                {formatTime()} {/* If its running lets format the time and show it*/}
                <button className='hover:scale-115 transition-all duration-150' onClick={handlePause}> {isRunning? "Pause" : seconds > 0 ? "Resume": null}</button>
                <button className='hover:scale-115 transition-all duration-150' onClick={handleReset}>Reset</button>
                <audio ref={audioRef} src='/sounds/50min-2.mp3'/>
                <audio ref={successAudio} src="/sounds/success.mp3"></audio>
            </div>
        </div>
    )
}


export default Focus