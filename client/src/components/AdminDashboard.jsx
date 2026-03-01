import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function AdminDashboard() {

  // ================= ROUTES =========================
  const [routes, setRoutes] = useState([])

  const [routeData, setRouteData] = useState({
      bus: "",
      driver: "",
      from: "NA",
      to: "KS",
      deptTime: "",
      eta: "",
      date: ""
  })
  
  const availableLocations = ["NA", "KS", "MOM"]

  const addRoute = async (e) => {
    e.preventDefault()

    try {
      const {data} = await axios.post('/routes/create',
        {
          bus: routeData.bus,
          driver: routeData.driver,
          from: routeData.from,
          to: routeData.to,
          deptTime: routeData.deptTime,
          eta: routeData.eta,
          date: routeData.date
        }
      )

      if (data.error) {
        return alert(data.error)
      }

      setRoutes(prev => [...prev, data])

      // Reset inputs
      setRouteData({
          bus: "",
          driver: "",
          from: "NA",
          to: "KS",
          deptTime: "",
          eta: "",
          date: ""
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchActiveRoutes = async () => {
        try {
          const {data} = await axios.get('/routes/active/')

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

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [phone, setPhone] = useState("")

  // Create driver
  const addDriver = async (e) => {
    e.preventDefault()

    console.log("Adding driver...")

    try {
      const { data } = await axios.post('/auth/register/', {
          fname,
          lname,
          phone,
          role: "driver"
      })

      console.log(data)

      if (!data.error) {
        setDrivers(prevDrivers => [...prevDrivers, data])
        console.log("Created driver successfully")
      }
    } catch (error) {
      console.error(error)
    }
  }

  // GET ALL DRIVERS
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data } = await axios.get('/auth/drivers/')

        setDrivers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDrivers()
  }, [])


  // ================= BUSES =========================
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
    if (window.confirm("Are you sure?")) {
      try {
        const { data } = await axios.delete(`/buses/${bus._id}`)

        if (data.error) {
          return alert("Unexpected error occured!")
        }

        // Update buses list
        setBuses(prevBuses => prevBuses.filter(b => b._id !== bus._id))
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
  }, [])

  return (
    <div>
        <h2>ALL BUSES</h2>
        {
          buses?.map((bus, ind) => (
            <div key={bus._id}>
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

        <br></br>

        <h2>ALL DRIVERS</h2>
        {
          drivers.length == 0 && <p>No drivers created yet!</p>
        }

        {
          drivers?.map((driver, ind) => (
            <div key={ind}>
              <p>{ ind+1 }. { driver.fname } { driver.lname }</p>
              <p><b>Phone: </b>{ driver.phone }</p>
              <br></br>
            </div>
          ))
        }
        <br></br>

        <b>Add Driver: </b>
        <form onSubmit={(e) => addDriver(e)}>
          <div>
            <label>First Name: </label>
            <input 
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div>
            <label>Last Name: </label>
            <input 
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div>
            <label>Phone Number: </label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password automatically generated in backend */}

          <button type="submit">ADD DRIVER</button>
        </form>

        <br />

        <h2>Active Routes</h2>
        {routes.length === 0 && <p>No active routes</p>}

        {routes.map((route, ind) => (
          <div key={route._id}>
            <p>
              {ind + 1}. {route.from} ➡️ {route.to}
            </p>
            <p>Bus: {route.bus?.name}</p>
            <p>Driver: {route.driver?.fname} {route.driver?.lname}</p>
            <p>Dept Time: {route.deptTime}</p>
            <p>ETA: {route.eta}</p>
            <p>Status: {route.status}</p>
            <p>Date: {new Date(route.date).toLocaleDateString("en-GB")}</p>
            
            <br></br>
          </div>
        ))}

        <b>Add routes: </b>
        <form onSubmit={(e) => addRoute(e)}>
          <div>
            <label>Bus:</label>
            <select value={routeData.bus} onChange={(e) => setRouteData({...routeData, bus: e.target.value})}>
              <option value="">Select bus</option>
              {
                buses?.map(bus => (
                  <option key={bus._id} value={bus._id}>{bus.name}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label>Driver:</label>
            <select value={routeData.driver} onChange={(e) => setRouteData({...routeData, driver: e.target.value})}>
              <option value="">Select driver</option>
              {
                drivers?.map(driver => (
                  <option 
                    key={driver._id} 
                    value={driver._id}
                  >{driver.fname} {driver.lname}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label>From:</label>
            <select value={routeData.from} onChange={(e) => setRouteData({...routeData, from: e.target.value})}>
              <option value="">Select</option>
              {
                availableLocations?.map((loc, ind) => (
                  <option key={ind} value={loc}>{ loc }</option>
                ))
              }
            </select>
          </div>

          <div>
            <label>To:</label>
            <select value={routeData.to} onChange={(e) => setRouteData({...routeData, to: e.target.value})}>
              <option value="">Select</option>
              {
                availableLocations?.map((loc, ind) => (
                  <option key={ind} value={loc}>{ loc }</option>
                ))
              }
            </select>
          </div>

          <div>
            <label>Departure time:</label>
            <input 
              type="time"
              placeholder="6:00PM"
              value={routeData.deptTime} 
              onChange={(e) => setRouteData({...routeData, deptTime: e.target.value})}
            />
          </div>

          <div>
            <label>ETA:</label>
            <input 
              type="time"
              placeholder="12:00PM"
              value={routeData.eta} 
              onChange={(e) => setRouteData({...routeData, eta: e.target.value})}
            />
          </div>

          <div>
            <label>Date: </label>
            <input 
              type="date"
              placeholder="12:00PM"
              value={routeData.date} 
              onChange={(e) => setRouteData({...routeData, date: e.target.value})}
            />
          </div>

          <button type="submit">ADD ROUTE</button>
        </form>

        <hr/>
        <Link>SEE MAP</Link>
    </div>
  )
}

export default AdminDashboard