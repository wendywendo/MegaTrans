import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function StudentChecklist() {

    const { id } = useParams()
    const [bookedTrips, setBookedTrips] = useState([])

    const updateBookedTrip = async (tripId, status) => {
        try {
            const {data} = await axios.put(`/trips/${tripId}`, {
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

    useEffect(() => {
        const fetchPassengers = async () => {
            const {data} = await axios.get(`/trips/${id}/`)
            setBookedTrips(data)
        }

        fetchPassengers()
    }, [])

  return (
    <div>
        <h1>PASSENGERS</h1>

        <table>
            <tr>
                <th>Student Name</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            
            <tbody>
            {
                bookedTrips.map(trip => (
                    <tr>
                        <td>{ trip.user.fname } { trip.user.lname }</td>
                        <td>{ trip.status }</td>
                        {
                            trip.status == "booked" && (
                                <button onClick={() => updateBookedTrip(trip._id, "boarded")}>MARK BOARDED</button>
                            )
                        }

                        {
                            trip.status == "boarded" && (
                                <button onClick={() => updateBookedTrip(trip._id, "booked")}>REMOVE FROM BOARDED</button>
                            )
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>

        <Link to={`/map/${id}/`}>START TRIP</Link> 
        {/* Mark route as started and all passengers that have arrived as en route */}

    </div>
  )
}

export default StudentChecklist