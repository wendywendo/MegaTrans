import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import { FaBell, FaBus, FaHouse, FaMap, FaCircleUser } from "react-icons/fa6";

function Navbar() {

    const { user } = useAuth()

    return (
        <nav className="flex bg-black p-2 justify-between items-center">
            <Link to='/'>
                <FaBus 
                    size={50}
                    className="p-2 rounded-full bg-transparent hover:bg-[#3A276D] transition-colors duration-200 text-white"
                />
            </Link>

            <div className="flex gap-8">
                {
                    user ? (
                        <>
                            <Link to='/dashboard'>
                                <FaHouse
                                    size={50}
                                    className="p-2 rounded-full bg-transparent hover:bg-[#3A276D] transition-colors duration-200 text-white"
                                />
                            </Link>

                            {
                                user.role == "admin" && (
                                    <Link to='/map'>
                                        <FaMap
                                            size={50}
                                            className="p-2 rounded-full bg-transparent hover:bg-[#3A276D] transition-colors duration-200 text-white"
                                        />
                                    </Link>
                                )   
                            }

                            {
                                user.role == "parent" && (
                                    <Link to='/notifications'>
                                        <FaBell
                                            size={50}
                                            className="p-2 rounded-full bg-transparent hover:bg-[#3A276D] transition-colors duration-200 text-white"
                                        />
                                    </Link>
                                )
                            }

                            <Link to='profile'>
                                <FaCircleUser
                                    size={50}
                                    className="p-2 rounded-full bg-transparent hover:bg-[#3A276D] transition-colors duration-200 text-white"
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>SignUp</Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar