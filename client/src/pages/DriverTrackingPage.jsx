import { useEffect, useState } from 'react'
import axios from "axios"

import VehicleMap from './VehicleMap'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DriverTrackingPage() {

    const { id } = useParams()

    const { user } = useAuth()
 
    const coordinatesMap = {
        NA: [-1.2921, 36.8219],     // Nairobi
        KS: [-0.0917, 34.767956],  // Kisumu
        MOM: [-4.043740, 39.658871] // Mombasa
    };

    const [route, setRoute] = useState({})

    // Fetch route
    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const {data} = await axios.get(`/routes/${id}`)
                
                setRoute(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchRoute()
    }, [])

    if (!route.from || !route.to) {
        return <div>Loading route...</div>
    }

    const start = coordinatesMap[route.from];
    const end = coordinatesMap[route.to];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
        <div>
            <p>User role: { user.role }</p>

            <br></br>

            <p><b>Bus {route.bus.name}</b></p>
            <p>From: { route.from }</p>
            <p>To: { route.to }</p>
            <p>Dept Time: { route.deptTime }</p>
            <p>ETA: { route.eta }</p>
            
            <br></br>
            <button>MARK TRIP AS COMPLETE</button>
        </div>

        <VehicleMap 
            start={start}
            end={end}
            route={route}
        />
    </div>
  )
}

export default DriverTrackingPage
