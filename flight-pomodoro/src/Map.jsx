import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect,} from 'react'
import "leaflet"
import "leaflet-rotatedmarker"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})


// Functions for convertion 
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
const degToRad = (deg) => {
    return (deg*Math.PI) / 180
}

// This function calculates bearing, -45 since the png used is rotated 45% fml 
function calculateBearing(startLat, startLng, destLat, destLng){
    startLat = degToRad(startLat);
    startLng = degToRad(startLng);
    destLat = degToRad(destLat);
    destLng = degToRad(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    brng = (brng + 360) % 360;
    return brng - 45
}



// I placed the map updater out of the function, cause it was being created every time map re-rendered, hence ignoring the condition and running the useEffect
// We only reset the window when the origin is changed
function MapUpdater({dataOrigin}){
const map = useMap()
    useEffect(()=>{
        if(dataOrigin.latitude_deg){
            map.setView([dataOrigin.latitude_deg, dataOrigin.longitude_deg],6)
        }
    },[dataOrigin.latitude_deg])// If we use the whole object react thinks it has changed, so best to use a dependency 
    return null
}


function Map({dataOrigin,availableAirports,destination,setDestination,progress}){

    // We can calculate the plane position based on this formula, progress is a % returned from the Focus.jsx
    const planeLat = destination ? dataOrigin.latitude_deg + (destination.latitude_deg - dataOrigin.latitude_deg) * progress : null
    const planeLon = destination ? dataOrigin.longitude_deg + (destination.longitude_deg - dataOrigin.longitude_deg) * progress : null
    const bearing = destination ? calculateBearing(dataOrigin.latitude_deg, dataOrigin.longitude_deg, destination.latitude_deg, destination.longitude_deg):0
    // I calculate bearing once there is a destination
    const planeIcon = L.icon({
        iconUrl: '/icons/plane.png',
        iconSize: [32,32],
        iconAnchor : [16,16],
        className:'plane-icon'
    })
    
    return(
        <div className='h-full'>
            {/* I hardcoded the starting center to BOG, yk my city, and always use height. The layer can be changed with another link, i send dataOrigin to the out function so it can compare */}
            <MapContainer className='w-full h-full' center={[4.70159,-74.1469]} zoom={8} style={{}}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {dataOrigin.latitude_deg && <MapUpdater dataOrigin={dataOrigin}/>}
        
        {/* Here i add the pin to the origin airport and display name and city based */}
                {dataOrigin.latitude_deg && 
                    <Marker position={[dataOrigin.latitude_deg, dataOrigin.longitude_deg]}> 
                        <Tooltip> HOME - {dataOrigin.municipality}, {dataOrigin.name}</Tooltip>
                    </Marker> 
                }
                {/* Here we show the destination pin only when destination was choosen and all other pins are deleted */}
                {destination && destination.latitude_deg && 
                    <Marker position={[destination.latitude_deg, destination.longitude_deg]}> 
                        <Tooltip> DESTINATION - {destination.municipality}, {destination.name}</Tooltip>
                    </Marker> 
                }
        {/* I use a map to show all the airports on the array, and place a marker using LAT-LON, A pop-up includes useful info and the button to make this airport the destination */}
        {/* I use the !destination to show all airports if there is no destination, this can be changed easily IMO */}
                {availableAirports && !destination && availableAirports.map((item,index) =>  item.latitude_deg && 
                    <Marker key={index} position={[item.latitude_deg, item.longitude_deg]}> 
                        <Tooltip>{item.municipality}</Tooltip>
                        <Popup>
                            <p>Airport name: {item.name}</p>
                            <p>Airport City: {item.municipality}</p>
                            <p>Airport Code: {item.iata_code}</p>
                            <p>{item.flightTime} min to Destination</p>
                            <button onClick={() => {setDestination(item)}} className='' >I want this destination</button>
                        </Popup>
                    </Marker> )
                }
        {/* If progress has started we show a marker (soon icon) with the plane location  */}
                {destination && progress>0 && <Marker  position={[planeLat,planeLon]} icon={planeIcon} rotationAngle={bearing} rotationOrigin='center' >
                    </Marker>}
            </MapContainer>
        </div>
    )
}
export default Map


// TODO :
// Auto cerrar el pop-up window una vez se elige destino // COMPLETED
// El time del pomodoro espera un int, si le mando str se buguea // HALF COMPLETED, ACEPTING STRINGS 
// Cambiar ortografia del flighttime  // COMPLETED
// Ciudad que no existe? rompe el render COMPLETED 
// Si se escoge destino? y luego busca otro destino? COMPLETEDD 
// What if the plane reaches dest? is it reseted to origin render? // COMPLETED 
// Pause and reset for timmer, plane has to stop or reset COMPLETED
// Quitar pin de los airports no elegidos COMPLETED 
// Router para redireccion en la navbar entre los dos pomodoros COMPLETED
// Add plane sound for background COMPLETED 
// Linea recta desde el origin al destino para que el avion la siga COMPLETED
// Cambiar styling del pin por un avion real  Completed

// Styling improvement 




// Add cx help messages like incorrect city or you made it 