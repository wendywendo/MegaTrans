import { Navigate } from "react-router-dom"
import AdminDashboard from "../components/AdminDashboard"
import DriverDashboard from "../components/DriverDashboard"
import { useAuth } from "../context/AuthContext"

function Dashboard() {

    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>

    if (user?.role == "parent") return (
        <Navigate to='/map' />
    )
 
    return (
        <div>
            {
                user.role == "driver" && (
                    <DriverDashboard />
                )
            }

            {
                user.role == "admin" && (
                    <AdminDashboard />
                )
            }
        </div>
    )
}

export default Dashboard