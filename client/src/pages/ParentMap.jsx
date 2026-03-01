import { act, useEffect, useState } from 'react'
import axios from "axios"

import VehicleMap from './VehicleMap'
import { useAuth } from '../context/AuthContext';

function ParentMap() {
    const { user } = useAuth()

    const [bookedTrips, setBookedTrips] = useState([])
    const [activeRoute, setActiveRoute] = useState({})

    const coordinatesMap = {
        NA: [-1.2921, 36.8219],     // Nairobi
        KS: [-0.0917, 34.767956],  // Kisumu
        MOM: [-4.043740, 39.658871] // Mombasa
    };


    useEffect(() => {
        const fetchTrips = async () => {
            const { data } = await axios.get('/trips/parent')

            setBookedTrips(data)
        }

        fetchTrips()
    }, [])

    useEffect(() => {
        if (bookedTrips.length > 0) {
            setActiveRoute(bookedTrips[0].route);
        }
    }, [bookedTrips]);

    const start = activeRoute.from ? coordinatesMap[activeRoute.from] : null;
    const end = activeRoute.to ? coordinatesMap[activeRoute.to] : null;

    if (!start || !end) return <div>Loading trips...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
        <div>
            <p>YOUR BOOKED TRIPS: </p>
            
            {
                bookedTrips.map((trip, ind) => (
                    <div key={trip._id} style={{ backgroundColor: activeRoute._id === trip.route._id ? "green" : "white" }}>
                        <p>{ ind+1 }. { trip.route.bus.name }</p>
                        <p>Status: { trip.route.status }</p>

                        <button onClick={() => {
                            setActiveRoute(trip.route)
                        }}>VIEW</button>

                        <br></br>
                    </div>
                ))
            }
        </div>

        <VehicleMap 
            start={start}
            end={end}
            route={activeRoute}
        />
    </div>
  )
}

export default ParentMap
