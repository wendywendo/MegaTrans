import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"
import { useEffect, useState } from "react";
import axios from "axios";

import busImg from "../assets/bus.png";
import pin from "../assets/pin.png"
import RecenterMap from "../components/RecenterMap";

const busIcon = new L.Icon({
    iconUrl: busImg,
    iconSize: [24, 24]
})

const pinIcon = new L.Icon({
    iconUrl: pin,
    iconSize: [24, 24]
})

function VehicleMap({ start, end, route, mode, visualizing }) {

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
    }, [start, end]);

    // Driver GPS tracking
    useEffect(() => {
        if (mode !== "driver") return;

        let cleanup;

        // ============== REAL GPS ==============
        if (!visualizing) {
            if (!navigator.geolocation) return alert("Geolocation not supported")
            
            let lastSent = 0

            const watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const now = Date.now()
                    if (now - lastSent < 5000) return; // every 5s
                    lastSent = now;

                    const { latitude, longitude } = position.coords

                    // Update backend
                    try {
                        const {data} = await axios.post(`/routes/update-location`, {
                            routeId: route._id,
                            latitude,
                            longitude
                        })

                        console.log(data)
                    } catch (error) {
                        console.error(error)
                    }

                    // Update driver map
                    setBusPos([latitude, longitude])
                },
                (err) => {
                    console.warn("Geolocation error", err.code, err.message);
                    if (err.code === 2) setBusPos(start); // fallback for testing
                },
                { 
                    enableHighAccuracy: true,
                    timeout: 10000, 
                    maximumAge: 0
                }
            )

            cleanup = () => navigator.geolocation.clearWatch(watchId);
        } 

        // ============== VISUALIZATION MODE ==========
        else {
            if (!roadRoute.length) return;

            let index = 0;
            const interval = setInterval(async () => {
                index = (index + 1) % roadRoute.length;
                const [lat, lng] = roadRoute[index];

                // Update backend so parents/admins see movement
                try {
                    await axios.post('/routes/update-location', {
                        routeId: route._id,
                        latitude: lat, 
                        longitude: lng
                    })
                } catch(error) {
                    console.error(error)
                }

                setBusPos([lat, lng]);
            }, 500); // move every 0.5s

            cleanup = () => clearInterval(interval);
        }

        return cleanup;
    }, [mode, route?._id, start, visualizing, roadRoute])


    // Viewer mode [admin & parents] 
    useEffect(() => {
        if (mode !== "viewer") return

        const interval = setInterval(async () => {
            try {
                const { data } = await axios.get(`/routes/${route._id}/location`)

                if (data?.latitude && data?.longitude) {
                    setBusPos([data.latitude, data.longitude])
                }
            } catch (error) {
                console.error(error)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [mode, route])

  return (
    
    <MapContainer
        center={[busPos[0], busPos[1]]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
    >
        <RecenterMap position={busPos} />

        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
        />
        {/* Road-based route */}
        <Polyline positions={roadRoute} pathOptions={{ weight: 5 }} />

        {/* Driver bus marker */}
        <Marker position={busPos} icon={busIcon}>
            <Popup>
                <p><b>Bus {route.bus?.name}</b></p>
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