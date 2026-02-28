import { useState } from 'react'
import VehicleMap from './VehicleMap'

function DriverTrackingPage() {

    const [location, setLocation] = useState({
        lat: -1.2921,
        lng: 36.8219
    })

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