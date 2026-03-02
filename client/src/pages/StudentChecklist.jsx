import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

function StudentChecklist() {

    const { id } = useParams()
    const [bookedTrips, setBookedTrips] = useState([])

    const navigate = useNavigate()

    const updateBookedTrip = async (tripId, status) => {
        try {
            const {data} = await axios.put(`trips/${tripId}`, {
                status
            })

            setBookedTrips(prev =>
                prev.map(trip =>
                    trip._id === tripId ? {...trip, status: data.status} : trip
                )
            )
        } catch (error) {
            console.error(error)
        }
    }

    const startRoute = async () => {
        try {
            const { data } = await axios.post(`routes/start`, {
                routeId: id
            })

            if (data.success) {
                navigate(`/map/${id}/`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchPassengers = async () => {
            const {data} = await axios.get(`trips/${id}/`)
            setBookedTrips(data)
        }

        fetchPassengers()
    }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
        <div className="mb-6 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">Passengers</h1>
                <p className="text-sm text-gray-600">
                Mark students as boarded before starting the route
                </p>
            </div>

            <button 
                onClick={startRoute}
                className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition"
            >
                START ROUTE
            </button>
        </div>

        {bookedTrips.length === 0 && (
            <div className="border border-gray-300 rounded p-6 text-center text-gray-600">
                No passengers found for this route.
            </div>
        )}

        {
            bookedTrips.length > 0 && (
                <div className="overflow-x-auto border border-gray-300 rounded">
                    <table className="w-full border-collapse">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="text-left p-3">Student Name</th>
                                <th className="text-left p-3">Status</th>
                                <th className="text-left p-3">Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                bookedTrips.map(trip => (
                                    <tr
                                        key={trip._id}
                                        className="border-t border-gray-300 hover:bg-gray-100 transition"
                                    >
                                        <td className="p-3 font-medium">
                                            {trip.user.fname} {trip.user.lname}
                                        </td>

                                        <td className="p-3 capitalize">
                                            {trip.status}
                                        </td>

                                        <td className="p-3">
                                            {
                                                trip.status == "booked" && (
                                                    <button 
                                                        onClick={() => updateBookedTrip(trip._id, "boarded")}
                                                        className="border border-black px-4 py-1 font-bold hover:bg-black hover:text-white transition"
                                                    >
                                                        MARK BOARDED
                                                    </button>
                                                )
                                            }

                                            {
                                                trip.status == "boarded" && (
                                                    <button 
                                                        onClick={() => updateBookedTrip(trip._id, "booked")}
                                                        className="border border-black px-4 py-1 font-bold hover:bg-black hover:text-white transition"
                                                    >
                                                        UNDO
                                                    </button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        }

    </div>
  )
}

export default StudentChecklist