import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {

    const { user } = useAuth()

    return (
        <nav style={{ display: "flex", gap: "4px" }}>
            <Link to='/'>Home</Link>

            {
                user ? (
                    <>
                        <Link to='/dashboard'>My Dashboard</Link>

                        {
                            user.role == "admin" && (
                                <Link to='/map'>Map</Link>
                            )   
                        }

                        {
                            user.role == "parent" && (
                                <Link to='/notifications'>Notifications</Link>
                            )
                        }

                        <Link to='profile'>Profile</Link>
                    </>
                ) : (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>SignUp</Link>
                    </>
                )
            }
        </nav>
    )
}

export default Navbar