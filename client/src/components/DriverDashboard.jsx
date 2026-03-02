import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function DriverDashboard() {

    const [routes, setRoutes] = useState([])

    useEffect(() => {
        const fetchRoutes = async () => {
            const { data } = await axios.get('routes/driver/')

            setRoutes(data)
        }

        fetchRoutes()
    }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-black">Your Schedules</h1>
            <p className="text-gray-500 text-sm">
                View and manage your assigned bus routes.
            </p>
        </div>

        {routes.length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500">
                No routes assigned yet.
                </p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {
                routes.map((route, ind) => {

                    const isActive = route.status === "active"

                    return (
                        <div 
                            key={route._id}
                            className={`rounded-xl shadow p-5 border-l-4 transition
                                ${isActive ? "border-[#3A276D] bg-white" : "border-gray-300 bg-gray-50"}
                            `}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-bold text-black">
                                    {ind + 1}. Bus {route.bus?.name}
                                </h2>
                                
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                                    ${
                                        route.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : route.status === "closed"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }
                                    `}
                                >
                                    {route.status}
                                </span>
        
                            </div>

                            <p className="text-gray-700 font-medium">
                                {route.from} ➡️ {route.to}
                            </p>

                            <div className="text-sm text-gray-500 mt-2 space-y-1">
                                <p><b>Departure:</b> {route.deptTime}</p>
                                <p><b>ETA:</b> {route.eta}</p>
                                <p><b>Date:</b> {route.date}</p>
                            </div>

                            {
                                route.status != "closed" && (
                                    <Link 
                                        to={`/passengers/${route._id}`}
                                        className="inline-block mt-4 bg-[#3A276D] hover:bg-[#2c1f55] text-white text-sm font-bold px-5 py-2 rounded transition-colors duration-200"
                                    >
                                        MARK STUDENT LIST
                                    </Link>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default DriverDashboard
