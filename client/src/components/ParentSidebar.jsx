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
        <div className="bg-gray-100 p-4 rounded-xl shadow-md w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-4 text-black">Your Booked Trips</h2>

            {
                bookedTrips.length == 0 && (
                    <p className="text-gray-500">No booked trips available to track</p>
                )
            }
            
            <div className="flex flex-col gap-3">
                {
                    bookedTrips.map(trip => {

                        const isSelected = route._id === trip.route?._id

                        return (
                            <div 
                                key={trip._id} 
                                className={`text-white p-4 rounded-lg flex justify-between items-center shadow hover:shadow-lg transition-shadow duration-200
                                    ${isSelected ? 'bg-[#3A276D]' : 'bg-black'}
                                `}
                            >
                                <div>
                                    <p className="font-semibold">Bus { trip.route?.bus?.name }</p>
                                    <p className="text-gray-300 text-sm capitalize">
                                        Status: { trip.route?.status }
                                    </p>
                                </div>

                                {
                                    trip.route?.status == "active" && (
                                        <button 
                                            onClick={() => {
                                                setRoute(trip.route)
                                            }}
                                            className={`bg-black hover:bg-[#2c1f55] text-white font-bold py-2 px-4 rounded transition-colors duration-200`}
                                        >
                                            VIEW
                                        </button>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>

            {/* Book trip */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow">
                <h3 className="text-lg font-bold text-black mb-2">
                    Book a Trip
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                    Select an upcoming route and book a seat (Emulation of a booking site)
                </p>

                <form onSubmit={(e) => bookTrip(e)} className="flex flex-col gap-3">
                    <select 
                        value={selectedRoute} 
                        onChange={(e) => setSelectedRoute(e.target.value)}
                        className="p-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#3A276D]"
                    >
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

                    <button 
                        type='submit' 
                        disabled={booking || !selectedRoute}
                        className={`py-2 rounded font-bold transition-colors duration-200
                            ${booking || !selectedRoute
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-[#3A276D] text-white hover:bg-[#2c1f55]"
                            }
                        `}
                    >
                        {booking ? "Booking..." : "BOOK TRIP"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ParentSidebar
