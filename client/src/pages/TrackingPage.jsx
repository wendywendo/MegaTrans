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

            {
                (!loading && isDriver) && (
                    <>
                        <p><b>Bus {route.bus?.name}</b></p>
                        <p>From: { route.from }</p>
                        <p>To: { route.to }</p>
                        <p>Dept Time: { route.deptTime }</p>
                        <p>ETA: { route.eta }</p>
                    </>
                )
            }

            
            <br />

            {
                isDriver && (
                    <>
                        <button onClick={markRouteAsComplete}>
                            MARK ROUTE AS COMPLETE
                        </button>

                        <br /><br />

                        <label>
                            <input 
                                type='checkbox'
                                checked={visualizing}
                                onChange={() => setVisualizing(prev => !prev)}
                            />
                            Visualize movement (demo)
                        </label>
                    </>
                )
            }
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
