import { useEffect, useState } from 'react'
import axios from "axios"

function ParentSidebar({ route, setRoute }) {

    const [bookedTrips, setBookedTrips] = useState([])

    useEffect(() => {
        const fetchTrips = async () => {
            const { data } = await axios.get('/trips/parent')

            setBookedTrips(data)
        }

        fetchTrips()
    }, [])

    return (
        <div>
            <p>YOUR BOOKED TRIPS: </p>

            {
                bookedTrips.length == 0 && (
                    <p>No booked trips available to track</p>
                )
            }
            
            {
                bookedTrips.map((trip, ind) => (
                    <div key={trip._id} style={{ backgroundColor: route._id === trip.route._id ? "green" : "white" }}>
                        <p>{ ind+1 }. { trip.route.bus.name }</p>
                        <p>Status: { trip.route.status }</p>

                        <button onClick={() => {
                            setRoute(trip.route)
                        }}>VIEW</button>

                        <br></br>
                    </div>
                ))
            }
        </div>
    )
}

export default ParentSidebar
