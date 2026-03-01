import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminSidebar({ route, setRoute }) {

    const [activeRoutes, setActiveRoutes] = useState([])

    useEffect(() => {
        const fetchActiveRoutes = async () => {
            try {
                const { data } = await axios.get('/routes/active')

                setActiveRoutes(data)

                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchActiveRoutes()
    }, [])

    return (
        <div>
            <p>ALL BUSES EN ROUTE: </p>

            {
                activeRoutes.length == 0 && (
                    <p>No active routes available</p>
                )
            }

            {
                activeRoutes.map((activeRoute, ind) => (
                    <div key={activeRoute._id} style={{ backgroundColor: route?._id === activeRoute?._id ? "green" : "white" }}>
                        <p>{ ind+1 }. { activeRoute.bus.name }</p>
                        <p>Status: { activeRoute.status }</p>

                        <button onClick={() => {
                            setRoute(activeRoute)
                        }}>VIEW</button>

                        <br></br>
                    </div>
                ))
            }
        </div>
    )
}

export default AdminSidebar