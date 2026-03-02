import { useEffect, useState } from 'react'
import axios from "axios"

import VehicleMap from './VehicleMap'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ParentSidebar from '../components/ParentSidebar';
import AdminSidebar from '../components/AdminSidebar';

function DriverTrackingPage() {
    const { id } = useParams()
    const { user } = useAuth()

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [visualizing, setVisualizing] = useState(false)
 
    const coordinatesMap = {
        NA: [-1.2921, 36.8219], // Nairobi
        KS: [-0.0917, 34.767956], // Kisumu
        MOM: [-4.043740, 39.658871] // Mombasa
    };

    const [route, setRoute] = useState({})

    const isDriver = user?.role === "driver"
    const isParent = user?.role === "parent"
    const isAdmin = user?.role === "admin"

    const markRouteAsComplete = async () => {
        try {
            const {data} = await axios.post('routes/complete', {
                routeId: id
            })

            if (data.success) {
                navigate(`/dashboard`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch route
    useEffect(() => {
        if (!id) return;

        const fetchRoute = async () => {
            try {
                setLoading(true)
                const {data} = await axios.get(`routes/${id}`)
                setRoute(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchRoute()
    }, [id])    

    if (loading) {
        return <div>Loading route...</div>
    }

    const start = route.from ? coordinatesMap[route.from] : null;
    const end = route.to ? coordinatesMap[route.to] : null;


  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <div>
            {
                isAdmin && (
                    <AdminSidebar 
                        route={route}
                        setRoute={setRoute}
                    />
                )
            }

            {
                isParent && (
                    <ParentSidebar 
                        route={route}
                        setRoute={setRoute}
                    />
                )
            }

            <div className='p-3'>
                {
                    (!loading && isDriver) && (
                        <div className="bg-white border border-black rounded-xl p-5 shadow-sm w-full max-w-xs">
                            <div className="mb-4 border-b border-black pb-2">
                                <h3 className="text-lg font-bold tracking-wide">CURRENT ROUTE</h3>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Bus</p>
                                <p className="text-xl font-bold">
                                {route.bus?.name}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-1">Route</p>
                                <p className="font-semibold text-lg">
                                {route.from} ➡️ {route.to}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <p className="text-xs text-gray-500">Departure</p>
                                <p className="font-bold text-black">
                                    {route.deptTime}
                                </p>
                                </div>

                                <div>
                                <p className="text-xs text-gray-500">ETA</p>
                                <p className="font-bold text-black">
                                    {route.eta}
                                </p>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    isDriver && (
                        <div className="mt-6 border-t border-black pt-4 space-y-4">
                            <button 
                                onClick={markRouteAsComplete}
                                className="w-full rounded-xl p-1 border border-black bg-black text-white py-2 font-bold tracking-wide hover:bg-white hover:text-black transition-colors duration-200"
                            >
                                MARK ROUTE AS COMPLETE
                            </button>

                            <label
                                className="flex items-center gap-3 cursor-pointer select-none"  
                            >
                                <input 
                                    type='checkbox'
                                    checked={visualizing}
                                    onChange={() => setVisualizing(prev => !prev)}
                                    className="w-4 h-4 accent-black"
                                />

                                <span className="text-gray-500">
                                    Visualize movement <span className="text-gray-500">(demo)</span>
                                </span>
                            </label>
                        </div>
                    )
                }
            </div>
        </div>


        <div>
            {
                route?.from ? (
                    <VehicleMap 
                        start={start}
                        end={end}
                        route={route}
                        mode={isDriver ? "driver" : "viewer"}
                        visualizing={visualizing}
                    />
                ) : (
                    <p className="text-center text-gray-900 bg-white border border-gray-300 rounded-md p-4 font-medium">
                        No route selected!
                    </p>
                )
            }
        </div>
    
    </div>
  )
}

export default DriverTrackingPage
