import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"

function VehicleMap({ lat, lng }) {

    const busIcon = new L.Icon({
        iconUrl: "bus.png",
        iconSize: [24, 24]
    })

  return (
    <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
    >
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
        />

        <Marker position={[lat, lng]} icon={busIcon}>
            <Popup>
                <p><b>Bus A</b></p>
                <p>NA - KS</p>
                <p>Dept: 8:00 AM    ETA: 5:00 PM</p>
            </Popup>
        </Marker>
    </MapContainer>
  )
}

export default VehicleMap