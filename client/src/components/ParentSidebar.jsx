import { useEffect, useState } from 'react'
import axios from "axios"
import { useAuth } from '../context/AuthContext'

function ParentSidebar({ route, setRoute }) {

    const [bookedTrips, setBookedTrips] = useState([])
    const [upcomingRoutes, setUpcomingRoutes] = useState([])

    const [selectedRoute, setSelectedRoute] = useState("")
    const [booking, setBooking] = useState(false)
 
    const { user } = useAuth()

    const bookTrip = async (e) => {
        e.preventDefault()

        if (selectedRoute.length == 0) return;

        try {
            setBooking(true)
            const {data} = await axios.post('trips/book/', {
                user: user._id,
                route: selectedRoute
            })

            // Update UI
            if (!data.error) {
                setBookedTrips(prev => [...prev, data])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setBooking(false)
        }
    }

    useEffect(() => {
        const fetchTrips = async () => {
            const { data } = await axios.get('trips/parent')

            setBookedTrips(data)
        }

        fetchTrips()
    }, [])


    useEffect(() => {
        const getAllUpcomingRoutes = async () => {
            const { data } = await axios.get('/routes/upcoming')

            setUpcomingRoutes(data)
        }

        getAllUpcomingRoutes()
    }, [])

    return (
        <div>
            <p>YOUR BOOKED TRIPS</p>

            {
                bookedTrips.length == 0 && (
                    <p>No booked trips available to track</p>
                )
            }
            
            {
                bookedTrips.map((trip, ind) => (
                    <div key={trip._id} style={{ backgroundColor: route._id === trip.route?._id ? "green" : "white" }}>
                        <p>{ ind+1 }. { trip.route?.bus?.name }</p>
                        <p>Status: { trip.route?.status }</p>

                        {
                            trip.route?.status == "active" && (
                                <button onClick={() => {
                                    setRoute(trip.route)
                                }}>VIEW</button>
                            )
                        }

                        <br></br>
                    </div>
                ))
            }

            <p><b>Book trip [Emulation of real booking site]</b></p>
            <form onSubmit={(e) => bookTrip(e)}>
                <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)}>
                    <option value="">Select route</option>

                    {
                        upcomingRoutes.map(route => (
                            <option
                                value={route._id}
                            >{route.from} - {route.to}, Dept: {route.deptTime}
                            </option>
                        ))
                    }
                </select>

                <button type='submit' disabled={booking}>BOOK</button>
            </form>
        </div>
    )
}

export default ParentSidebar
