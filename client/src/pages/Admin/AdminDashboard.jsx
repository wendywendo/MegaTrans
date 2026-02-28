import { useEffect, useState } from "react"
import axios from "axios"

function AdminDashboard() {

  const [buses, setBuses] = useState([])

  const [bus, setBus] = useState("")

  // Create bus
  const createBus = async () => {
    try {
      const { data } = await axios.post('/buses/', {
        name: bus
      })

      // Update buses list
      setBuses(prevBuses => [...prevBuses, data])

      // Update bus input
      setBus("")
    } catch (error) {
      console.error(error)
    }
  }

  // Delete bus
  const deleteBus = async (bus) => {
    if (confirm("Are you sure?")) {
      try {
        const { data } = await axios.delete(`/buses/${bus._id}`)

        if (data.error) {
          return alert("Unexpected error occured!")
        }

        // Update buses list
        setBuses(prevBuses => prevBuses.filter(b => b._id != bus._id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  // Get all buses
  useEffect(() => {
    const getAllBuses = async () => {
      try {
        const { data } = await axios.get('/buses/')

        setBuses(data)
      } catch (error) {
        console.error(error)
      }
    }

    getAllBuses()
  })

  return (
    <div>
        <h2>All Buses</h2>
        {
          buses.map((bus, ind) => (
            <div>
              <p>{ind+1}. { bus.name } <button onClick={() => deleteBus(bus)}>🗑️</button></p>
            </div>
          ))
        }

        <div>
          <label>Bus name: </label>
          <input 
            type="text"
            value={bus}
            onChange={(e) => setBus(e.target.value)}
          />

          <button onClick={createBus}>ADD BUS</button>
        </div>
        
        <h1>Buses en route</h1>
        
        <div>
            <p>Bus KAU088H</p>
            <p><b>Route: </b> KS - NA</p>
            <p><b>Driver: </b> John Doe</p>
            <p><b>Dept. Time: </b>8:00 AM</p>
            <p><b>ETA: </b>5:00 PM</p>
        </div>

        <br />

        <div>
            <p>Bus KAZ238A</p>
            <p><b>Route: </b> KER - SIAYA</p>
            <p><b>Driver: </b> Alex Marvin</p>
            <p><b>Dept. Time: </b>10:00 PM</p>
            <p><b>ETA: </b>6:00 PM</p>
        </div>

    </div>
  )
}

export default AdminDashboard