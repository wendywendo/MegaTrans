import { useEffect, useState } from 'react'
import axios from "axios"

import VehicleMap from './VehicleMap'

function DriverTrackingPage() {

    const [location, setLocation] = useState({
        lat: -1.2921,
        lng: 36.8219
    })

    useEffect(() => {
        if (!navigator.geolocation) return alert("Geolocation not supported")

            const watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        await axios.post('/vehicles/update-location', {
                            vehicleId,
                            latitude,
                            longitude
                        })

                        // Update map location
                        setLocation({
                            lat: latitude,
                            lng: longitude
                        })
                    } catch (error) {
                        console.error(error)
                    }
                },
                (err) => console.error(err),
                { enableHighAccuracy: true }
            )

            return () => navigator.geolocation.clearWatch(watchId);
    }, [vehicleId])

  return (
    <div>
        <VehicleMap 
            lat={location.lat}
            lng={location.lng}
        />
    </div>
  )
}

export default DriverTrackingPage