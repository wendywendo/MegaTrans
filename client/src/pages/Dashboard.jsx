import axios from "axios"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Dashboard() {

  const navigate = useNavigate()

  const { user } = useAuth()

  const logoutUser = async () => {
    try {
      const { data } = await axios.post('/auth/logout/')

      if (data.message) {
        alert("Logged out successfully")
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>DASHBOARD</h1>
      {
        user && (
          <>
            <p>First name: { user.fname }</p>
            <p>Last name: { user.lname }</p>
            <p>Phone number: { user.phone }</p>
            <p>Role: { user.role }</p>

            <button onClick={logoutUser}>Logout</button>
          </>
        )
      }
      
    </div>
  )
}

export default Dashboard