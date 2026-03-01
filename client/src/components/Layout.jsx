import { Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Navbar from "./Navbar"

function Layout() {

    const { loading } = useAuth()

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout