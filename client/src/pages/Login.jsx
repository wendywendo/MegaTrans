import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import vector from "../assets/vector.png"

function Login() {

    const navigate = useNavigate()

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { setUser } = useAuth()

    const loginUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await axios.post('auth/login/', {
                phone,
                password
            })

            if (data.error) {
                return setError(e.target.value)
            }

            setUser(data)

            navigate('/', { replace: true })
        } catch (error) {
            setError("Server error")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="bg-[#F5F7FB] h-screen flex items-center">
        <div className="flex w-fit m-auto bg-black text-white justify-between rounded-3xl">
            <div className="p-8">
                <h1 className="text-2xl font-bold">Log In</h1>

                <p className="text-sm text-[#716E70]">Don't have an account? 
                    <Link to='/signup' className="underline">Signup here</Link>
                </p>

                {
                    error && (
                        <p>{ error }</p>
                    )
                }

                <form onSubmit={(e) => loginUser(e)} className="mt-4 flex gap-2 flex-col">
                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label>Phone number: </label>
                        <input 
                            type='tel' 
                            placeholder='0712345678' 
                            name="phone" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-white text-black p-1 rounded w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label>Password: </label>
                        <input 
                            type='password' 
                            placeholder='*********' 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white text-black p-1 rounded w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type='submit' 
                        disabled={loading}
                        className="bg-[#3A276D] text-white rounded p-2 mt-3 font-bold hover:bg-[#2c1f55] transition duration-200"
                    >
                        { loading ? "Please wait..." : "LOG IN" }
                    </button>
                </form>
            </div>

            {/* Image */}
            <img
                src={vector}
                className="h-120"
            />
        </div>
    </div>
  )
}

export default Login