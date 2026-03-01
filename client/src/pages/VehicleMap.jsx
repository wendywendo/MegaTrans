import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"
import { useEffect, useState } from "react";

import busImg from "../assets/bus.png";
import pin from "../assets/pin.png"

function VehicleMap({ start, end, route }) {

    const busIcon = new L.Icon({
        iconUrl: busImg,
        iconSize: [24, 24]
    })

    const pinIcon = new L.Icon({
        iconUrl: pin,
        iconSize: [24, 24]
    })

    const [roadRoute, setRoadRoute] = useState([]);
    const [busPos, setBusPos] = useState(start)

    useEffect(() => {
        async function loadRoute() {
            const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
            const res = await fetch(url)
            const data = await res.json()

            const coords = data.routes[0].geometry.coordinates.map(
                ([lng, lat]) => [lat, lng]
            )
            setRoadRoute(coords)
        }

        loadRoute();
    }, []);

    // Watch driver GPS
    useEffect(() => {
        if (!navigator.geolocation) return alert("Geolocation not supported")
        
        const watchId = navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords

                // Update backend
                try {
                    await fetch(`/routes/${route._id}/update-location`, {
                        routeId: route._id,
                        latitude,
                        longitude
                    })
                } catch (error) {
                    console.error(error)
                }

                // Update driver map
                setBusPos([latitude, longitude])
            },
            (err) => console.error(err),
            { enableHighAccuracy: true }
        )

        return () => navigator.geolocation.clearWatch(watchId);
    }, [route])

    // Fake movement
    // useEffect(() => {
    //     if (!roadRoute.length) return;

    //     let index = 0;

    //     const interval = setInterval(() => {
    //         setBusPos(roadRoute[index]);
    //         index++;

    //         if (index >= roadRoute.length) {
    //         clearInterval(interval);
    //         }
    //     }, 800); // speed control (ms)

    //     return () => clearInterval(interval);
    // }, [roadRoute]);

  return (
    
    <MapContainer
        center={[start[0], start[1]]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
    >
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
        />
        {/* Road-based route */}
        <Polyline positions={roadRoute} pathOptions={{ weight: 5 }} />

        {/* Driver bus marker */}
        <Marker position={busPos} icon={busIcon}>
            <Popup>
                <p><b>Bus {route.bus.name}</b></p>
                <p>{ route.from } - { route.to }</p>
                <p>Dept: { route.deptTime }   ETA: { route.eta }</p>
            </Popup>
        </Marker>

        {/* Start and End */}
        <Marker position={start} icon={pinIcon}>
            <Popup>Start</Popup>
        </Marker>

        <Marker position={end} icon={pinIcon}>
            <Popup>Destination</Popup>
        </Marker>
    </MapContainer>
  )
}

export default VehicleMap