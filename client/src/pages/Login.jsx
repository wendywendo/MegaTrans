import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

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
            const { data } = await axios.post('/auth/login/', {
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
    <div>
        <h1>Login</h1>

        {
            error && (
                <p>{ error }</p>
            )
        }

        <form onSubmit={(e) => loginUser(e)}>
            <div>
                <label>Phone number: </label>
                <input 
                    type='tel' 
                    placeholder='0712345678' 
                    name="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div>
                <label>Password: </label>
                <input 
                    type='password' 
                    placeholder='*********' 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type='submit' disabled={loading}>
                { loading ? "Please wait..." : "LOG IN" }
            </button>
        </form>

        <p>Don't have an account? <Link to='/signup'>Go to signup</Link></p>
    </div>
  )
}

export default Login