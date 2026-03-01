import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AddRouteForm from "./AddRouteForm"
import ActiveRoutes from "./ActiveRoutes"
import DriversList from "./DriversList"
import AddDriverForm from "./AddDriverForm"
import BusesSection from "./BusesSection"

function AdminDashboard() {

  // ================= ROUTES =========================

  const [routes, setRoutes] = useState([])

  useEffect(() => {
    const fetchActiveRoutes = async () => {
        try {
          const {data} = await axios.get('routes/active/')

          if (data.error) {
            return alert(data.error)
          }

          setRoutes(data)
        } catch (error) {
          console.error(error)
        }
    }

    fetchActiveRoutes()
  }, [])

  // ================= DRIVERS =========================
  const [drivers, setDrivers] = useState([])

  // GET ALL DRIVERS
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data } = await axios.get('auth/drivers/')

        setDrivers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDrivers()
  }, [])


  // ================= BUSES =========================
  const [buses, setBuses] = useState([])

  // Get all buses
  useEffect(() => {
    const getAllBuses = async () => {
      try {
        const { data } = await axios.get('buses/')

        setBuses(data)
      } catch (error) {
        console.error(error)
      }
    }

    getAllBuses()
  }, [])

  return (
    <div>
        <div className="bg-gray-100 min-h-screen p-6">
          <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Buses */}
            <BusesSection 
              buses={buses}
              setBuses={setBuses}
            />

            <br />

            {/* Drivers List */}
            <DriversList 
              drivers={drivers}
            />

            {/* Add Driver Form */}
            <AddDriverForm 
              setDrivers={setDrivers}
            />

            {/* Active Routes */}
            <ActiveRoutes 
              routes={routes}
            />

            {/* Add Route */}
            <AddRouteForm 
              setRoutes={setRoutes}
              buses={buses}
              drivers={drivers}
            />
          </div>
        </div>

    </div>
  )
}

export default AdminDashboard