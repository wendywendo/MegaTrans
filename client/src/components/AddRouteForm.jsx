import axios from "axios"
import { useState } from "react"

function AddRouteForm({ setRoutes, buses, drivers }) {
    const [routeData, setRouteData] = useState({
        bus: "",
        driver: "",
        from: "NA",
        to: "KS",
        deptTime: "",
        eta: "",
        date: ""
    })

    const availableLocations = ["NA", "KS", "MOM"]

    const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

    const addRoute = async (e) => {
        e.preventDefault()

        try {
        // Departure time cannot be in the past
        const selectedDateTime = new Date(`${routeData.date}T${routeData.deptTime}`)
        if (selectedDateTime < new Date()) {
            alert("Departure cannot be in the past!")
            return
        }

        const {data} = await axios.post('routes/create',
            {
            bus: routeData.bus,
            driver: routeData.driver,
            from: routeData.from,
            to: routeData.to,
            deptTime: routeData.deptTime,
            eta: routeData.eta,
            date: routeData.date
            }
        )

        if (data.error) {
            return alert(data.error)
        }

        setRoutes(prev => [...prev, data])

        // Reset inputs
        setRouteData({
            bus: "",
            driver: "",
            from: "NA",
            to: "KS",
            deptTime: "",
            eta: "",
            date: ""
        })
        } catch (error) {
        console.error(error)
        }
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Add Route</h2>

            <form 
                onSubmit={(e) => addRoute(e)} 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {/* Bus Selection */}
                <select 
                    value={routeData.bus} 
                    onChange={(e) => setRouteData({...routeData, bus: e.target.value})}
                    className="p-2 border rounded"
                >
                    <option value="">Select bus</option>
                    {
                        buses.map(bus => (
                            <option key={bus._id} value={bus._id}>{bus.name}</option>
                        ))
                    }
                </select>

                {/* Driver Select */}
                <select 
                    value={routeData.driver} 
                    onChange={(e) => setRouteData({...routeData, driver: e.target.value})}
                    className="p-2 border rounded"
                >
                    <option value="">Select driver</option>
                    {
                        drivers?.map(driver => (
                        <option 
                            key={driver._id} 
                            value={driver._id}
                        >{driver.fname} {driver.lname}</option>
                        ))
                    }
                </select>

                {/* From */}
                <div className="flex gap-4 items-center">
                    From:
                    <select 
                        value={routeData.from} 
                        onChange={(e) => setRouteData({...routeData, from: e.target.value})}
                        className="p-2 border rounded"
                    >
                        <option value="">Select</option>
                        {
                            availableLocations?.map((loc, ind) => (
                            <option key={ind} value={loc}>{ loc }</option>
                            ))
                        }
                    </select>
                </div>

                {/* To */}
                <div className="flex gap-4 items-center">
                    To:
                    <select 
                        value={routeData.to} 
                        onChange={(e) => setRouteData({...routeData, to: e.target.value})}
                        className="p-2 border rounded"
                    >
                        <option value="">Select</option>
                        {
                            availableLocations?.map((loc, ind) => (
                            <option key={ind} value={loc}>{ loc }</option>
                            ))
                        }
                    </select>
                </div>
                
                {/* Departure time */}
                <div className="flex gap-4 items-center">
                    Dept Time:
                    <input 
                        type="time"
                        value={routeData.deptTime} 
                        onChange={(e) => setRouteData({...routeData, deptTime: e.target.value})}
                        className="p-2 border rounded"
                    />
                </div>

                {/* ETA */}
                <div className="flex gap-4 items-center">
                    ETA:
                    <input 
                        type="time"
                        value={routeData.eta} 
                        onChange={(e) => setRouteData({...routeData, eta: e.target.value})}
                        className="p-2 border rounded"
                    />
                </div>

                {/* Date */}
                <input 
                    type="date"
                    value={routeData.date} 
                    min={today}
                    className="p-2 border rounded"
                    onChange={(e) => setRouteData({...routeData, date: e.target.value})}
                />

                <button 
                    type="submit"
                    className="bg-[#3A276D] hover:bg-[#2c1f55] text-white rounded font-bold"
                >
                    ADD ROUTE
                </button>
            </form>
        </div>
    )
}

export default AddRouteForm