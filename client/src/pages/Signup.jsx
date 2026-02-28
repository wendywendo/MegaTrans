import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup() {

    const navigate = useNavigate()

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [registering, setRegistering] = useState(false)
    const [error, setError] = useState("")

    const registerUser = async (e) => {
        e.preventDefault()
        setRegistering(true)

        try {
            // Check if password matches confirm password
            if (password !== confirmPassword) {
                setPassword("")
                setConfirmPassword("")

                return setError("Password does not match confirm password")
            }

            const { data } = await axios.post('/auth/register/', {
                fname,
                lname,
                phone,
                password
            })

            if (data.error) {
                return setError(data.error)
            }

            // Clear inputs
            setFname("")
            setLname("")
            setPhone("")
            setPassword("")

            // Navigate to login
            navigate('/login')
        } catch (error) {
            setError("Server error")
            console.error(error)
        } finally {
            setRegistering(false)
        }
    }

  return (
    <div>
        <h1>Sign up</h1>

        {
            error && (
                <p>{ error }</p>
            )
        }

        <form onSubmit={(e) => registerUser(e)}>
            <div>
                <label>First name: </label>
                <input 
                    type='text' 
                    placeholder='John' 
                    name='fname' 
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
            </div>

            <div>
                <label>Last name: </label>
                <input 
                    type='text' 
                    placeholder='Doe' 
                    name='lname' 
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
            </div>

            <div>
                <label>Phone number: </label>
                <input 
                    type='tel' 
                    placeholder='0712345678' 
                    name='phone' 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div>
                <label>Password: </label>
                <input 
                    type='password' 
                    placeholder='*********' 
                    name='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <label>Confirm password: </label>
                <input 
                    type='password' 
                    placeholder='*********' 
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span>
                    { password && password === confirmPassword ? "✅" : "❌" }
                </span>
            </div>

            <button type='submit' disabled={registering}>
                { registering ? "Please wait..." : "SIGN UP" }
            </button>
        </form>

        <p>Already have an account? <Link to='/login'>Login here</Link></p>
    </div>
  )
}

export default Signup