import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'


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

    return(
        <div>
            {/* I hardcoded the starting center to BOG, yk my city, and always use height. The layer can be changed with another link, i send dataOrigin to the out function so it can compare */}
            <MapContainer center={[4.70159,-74.1469]} zoom={8} style={{height:"800px"}}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {dataOrigin.latitude_deg && <MapUpdater dataOrigin={dataOrigin}/>}
        
        {/* Here i add the pin to the origin airport and display name and city based */}
                {dataOrigin.latitude_deg && 
                    <Marker position={[dataOrigin.latitude_deg, dataOrigin.longitude_deg]}> 
                        <Tooltip> HOME - {dataOrigin.municipality}, {dataOrigin.name}</Tooltip>
                    </Marker> 
                }
        {/* I use a map to show all the airports on the array, and place a marker using LAT-LON, A pop-up includes useful info and the button to make this airport the destination */}
                {availableAirports && availableAirports.map((item,index) =>  item.latitude_deg && 
                    <Marker key={index} position={[item.latitude_deg, item.longitude_deg]}> 
                        <Tooltip>{item.municipality}</Tooltip>
                        <Popup>
                            <p>Airport name: {item.name}</p>
                            <p>Airport City: {item.municipality}</p>
                            <p>Airport Code: {item.iata_code}</p>
                            <p>{item.fligthTime} min to Destination</p>
                            <button onClick={() => setDestination(item)} className='' >I want this destination</button>
                        </Popup>
                    </Marker> )
                }
        {/* If progress has started we show a marker (soon icon) with the plane location  */}
                {destination && progress>0 && <Marker position={[planeLat,planeLon]}>
                    </Marker>}
            </MapContainer>
        </div>
    )
}
export default Map