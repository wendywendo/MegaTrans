import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function DriverDashboard() {

    const [routes, setRoutes] = useState([])

    useEffect(() => {
        const fetchRoutes = async () => {
            const { data } = await axios.get('/routes/driver/')

            setRoutes(data)
        }

        fetchRoutes()
    }, [])

  return (
    <div>
        <h1>YOUR SCHEDULES</h1>

        {
            routes.map((route, ind) => (
                <div key={route._id}>
                    <p>{ind + 1}. <b>Bus { route.bus.name }</b></p>
                    <p>{ route.from } ➡️ { route.to }</p>
                    <p>Departure Time: { route.deptTime }</p>
                    <p>ETA: { route.eta }</p>
                    <p>Date: { route.date }</p>
                    <p>Status: { route.status }</p>

                    {
                        route.status != "closed" && (
                            <Link to={`/passengers/${route._id}`}>MARK STUDENT LIST</Link>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default DriverDashboard