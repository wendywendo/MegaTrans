import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

function Profile() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const logoutUser = async () => {
    try {
      const { data } = await axios.post('auth/logout/')
      if (data.message) {
        alert("Logged out successfully")
        setUser(null)
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          User Profile
        </h1>

        {user ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">First Name:</span>
              <span className="text-gray-900">{user.fname}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Last Name:</span>
              <span className="text-gray-900">{user.lname}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Phone Number:</span>
              <span className="text-gray-900">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Role:</span>
              <span className="text-gray-900">{user.role}</span>
            </div>

            <button
              onClick={logoutUser}
              className="mt-6 w-full bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">No user logged in</p>
        )}
      </div>
    </div>
  )
}

export default Profile