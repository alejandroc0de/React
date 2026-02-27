import { MapContainer, Marker, TileLayer, Tooltip, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


function Map({dataOrigin,availableAirports,destination,setDestination}){

    function MapUpdater({center}){
        const map = useMap()
        map.setView(center,6)
        return null
    }


    return(
        <div>
            <MapContainer center={[50.5,30.5]} zoom={13} style={{height:"800px"}}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {dataOrigin.latitude_deg && <MapUpdater center={[dataOrigin.latitude_deg, dataOrigin.longitude_deg]} />}
                
                {dataOrigin.latitude_deg && 
                    <Marker position={[dataOrigin.latitude_deg, dataOrigin.longitude_deg]}> 
                        <Tooltip>{dataOrigin.municipality}</Tooltip>
                    </Marker> 
                }
                {availableAirports && availableAirports.map((item,index) =>  item.latitude_deg && 
                    <Marker eventHandlers={{click: () => setDestination(item)}} key={index} position={[item.latitude_deg, item.longitude_deg]}> 
                        <Tooltip>{item.municipality}</Tooltip>
                    </Marker> )
                }
            </MapContainer>
        </div>
    )
}
export default Map