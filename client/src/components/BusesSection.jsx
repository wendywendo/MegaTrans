import axios from "axios"
import { useState } from "react"
import { FaTrash } from "react-icons/fa";

function BusesSection({ buses, setBuses }) {

    const [bus, setBus] = useState("")

    // Create bus
    const createBus = async () => {
        try {
        const { data } = await axios.post('buses/', {
            name: bus
        })

        // Update buses list
        setBuses(prevBuses => [...prevBuses, data])

        // Update bus input
        setBus("")
        } catch (error) {
        console.error(error)
        }
    }

    // Delete bus
    const deleteBus = async (bus) => {
        if (window.confirm("Are you sure?")) {
        try {
            const { data } = await axios.delete(`buses/${bus._id}`)

            if (data.error) {
            return alert("Unexpected error occured!")
            }

            // Update buses list
            setBuses(prevBuses => prevBuses.filter(b => b._id !== bus._id))
        } catch (error) {
            console.error(error)
        }
        }
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">All Buses</h2>

            {buses.length === 0 && (
                <p className="text-gray-400">No buses added</p>
            )}

            <ul className="space-y-2">
                {
                    buses?.map((bus, ind) => (
                        <li 
                            key={bus._id}
                            className="flex justify-between items-center px-4 py-2 border rounded"
                        >
                            <span>{ind+1}. { bus.name }</span>
                            <button 
                                onClick={() => deleteBus(bus)}
                                className="text-red-400 hover:text-red-600"
                            >
                                <FaTrash />
                            </button>
                        </li>
                    ))
                }
            </ul>

            <div className="mt-4 flex gap-2">
                <input 
                    type="text"
                    placeholder="Bus Name"
                    value={bus}
                    onChange={(e) => setBus(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />

                <button 
                    onClick={createBus}
                    className="bg-[#3A276D] hover:bg-[#2c1f55] px-4 rounded font-bold text-white"
                >
                    ADD
                </button>
            </div>
        </div>
    )
}

export default BusesSection