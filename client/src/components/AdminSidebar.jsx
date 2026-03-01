import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminSidebar({ route, setRoute }) {

    const [activeRoutes, setActiveRoutes] = useState([])

    useEffect(() => {
        const fetchActiveRoutes = async () => {
            try {
                const { data } = await axios.get('routes/active')

                setActiveRoutes(data)

                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchActiveRoutes()
    }, [])

    return (
        <div className="bg-gray-100 p-4 rounded-xl shadow-md w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-4 text-black">Buses En Route</h2>

            {
                activeRoutes.length == 0 && (
                    <p className="text-gray-500">No active routes available</p>
                )
            }

            <div className="flex flex-col gap-3">
                {
                    activeRoutes.map(activeRoute => {

                        const isSelected = route?._id === activeRoute._id

                        return (
                            <div 
                                key={activeRoute._id} 
                                className={`text-white p-4 rounded-lg flex justify-between items-center shadow hover:shadow-lg transition-shadow duration-200
                                    ${isSelected ? 'bg-[#3A276D]' : 'bg-black'}
                                `}
                            >
                                <div>
                                    <p className="font-semibold">Bus { activeRoute.bus.name }</p>
                                    <p className="text-gray-300 text-sm capitalize">
                                        Status: {activeRoute.status}
                                    </p>
                                </div>

                                {
                                    activeRoute.status == "active" && (
                                        <button 
                                            onClick={() => {
                                                setRoute(activeRoute)
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
        </div>
    )
}

export default AdminSidebar