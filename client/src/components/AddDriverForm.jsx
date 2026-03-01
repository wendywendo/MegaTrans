import axios from "axios"
import { useState } from "react"

function AddDriverForm({ setDrivers }) {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")

    // Create driver
    const addDriver = async (e) => {
        e.preventDefault()

        console.log("Adding driver...")

        try {
        const { data } = await axios.post('auth/register/', {
            fname,
            lname,
            phone,
            role: "driver"
        })

        console.log(data)

        if (!data.error) {
            setDrivers(prevDrivers => [...prevDrivers, data])
            console.log("Created driver successfully")
        }
        } catch (error) {
        console.error(error)
        }
    }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
        <form onSubmit={(e) => addDriver(e)} className="mt-6 space-y-3">
            <h3 className="font-bold">Add Driver</h3>

            <input 
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="First Name"
                className="w-full p-2 border rounded"
            />

            <input 
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
            />

            <input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full p-2 border rounded"
            />
          
            <button type="submit" className="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
                ADD DRIVER
            </button>
        </form>
    </div>
  )
}

export default AddDriverForm