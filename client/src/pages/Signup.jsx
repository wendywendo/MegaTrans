import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import vector from "../assets/vector.png"

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

            const { data } = await axios.post('auth/register/', {
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
    <div className="bg-[#F5F7FB] h-screen flex items-center">
        <div className="flex items-center w-fit m-auto bg-black text-white justify-between rounded-3xl">
            {/* Image */}
            <img
                src={vector}
                className="h-120"
            />

            <div className="p-8">
                <h1 className="text-2xl font-bold">Create an account</h1>

                <p className="text-sm text-[#716E70]">Already have an account? 
                    <Link to='/login' className="underline"> Login here</Link>
                </p>

                {
                    error && (
                        <p>{ error }</p>
                    )
                }

                {/* Form Section */}
                <form onSubmit={(e) => registerUser(e)} className="mt-4 flex gap-2 flex-col">

                    {/* Names Section */}
                    <div className="flex gap-3 w-full">
                        <div className="flex flex-col">
                            <label>First name</label>
                            <input 
                                type='text' 
                                placeholder='John' 
                                name='fname' 
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                className="bg-white text-black p-1 rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Last name</label>
                            <input 
                                type='text' 
                                placeholder='Doe' 
                                name='lname' 
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                className="bg-white text-black p-1 rounded"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label>Phone number</label>
                        <input 
                            type='tel' 
                            placeholder='0712345678' 
                            name='phone' 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-white text-black p-1 rounded w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label>Password</label>
                        <input 
                            type='password' 
                            placeholder='*********' 
                            name='password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white text-black p-1 rounded w-full"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col">
                        <label>Confirm password</label>

                        <div>
                            <input 
                                type='password' 
                                placeholder='*********' 
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="bg-white text-black p-1 rounded w-full"
                            />
                            <span>
                                { password && password === confirmPassword ? "✅" : "❌" }
                                Password must match
                            </span>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <button type='submit' disabled={registering} 
                        className="bg-[#3A276D] text-white rounded p-2 mt-3 font-bold hover:bg-[#2c1f55] transition duration-200"
                    >
                        { registering ? "Please wait..." : "SIGN UP" }
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup