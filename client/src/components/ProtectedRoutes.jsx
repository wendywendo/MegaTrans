import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoutes() {

    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>

    if (!loading && !user) return (
        <h1>Network Error</h1>
    )

    return user ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoutes