import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'


function Map({dataOrigin,availableAirports,destination,setDestination,progress}){

    function MapUpdater({dataOrigin,destination}){
        const map = useMap()
        useEffect(() => {
            if(destination){
                map.fitBounds([[dataOrigin.latitude_deg,dataOrigin.longitude_deg],[destination.latitude_deg,destination.longitude_deg]])  // esto corre cuando center cambia
            }
        },[destination])
    }
    // WE GOTTA WORK ON THE MAP ISSUES !!!! CANT CENTER CANT MOVE FREELY 

    // I calculate plane position based on progress 

    const planeLat = destination ? dataOrigin.latitude_deg + (destination.latitude_deg - dataOrigin.latitude_deg) * progress : null
    const planeLon = destination ? dataOrigin.longitude_deg + (destination.longitude_deg - dataOrigin.longitude_deg) * progress : null



    return(
        <div>
            <MapContainer center={[50.5,30.5]} zoom={13} style={{height:"800px"}}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {dataOrigin.latitude_deg && <MapUpdater dataOrigin={dataOrigin} destination={destination}/>}
        
                {dataOrigin.latitude_deg && 
                    <Marker position={[dataOrigin.latitude_deg, dataOrigin.longitude_deg]}> 
                        <Tooltip>{dataOrigin.municipality}</Tooltip>
                    </Marker> 
                }

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

                {destination && progress>0 && <Marker position={[planeLat,planeLon]}>
                    </Marker>}

            </MapContainer>
        </div>
    )
}
export default Map