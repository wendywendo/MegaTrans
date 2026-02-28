import Vehicle from "../models/Vehicle.js"

export async function getAllVehicles(req, res) {
    try {
        const vehicles = Vehicle.find({})

        res.json(vehicles)
    } catch (error) {
        console.error(error)
    }
}

export async function createVehicle(req, res) {
    try {
        const { vehicleName, from, to } = req.body

        const availableLocations = ["NA", "KS", "MOM"]
        
        // Check if from and to are in available locations
        if (!availableLocations.includes(from) || !availableLocations.includes(to)) {
            return res.json({ error: "Either from or to missing from available locations" })
        }

        // Mombasa -> lat = -4.043740, lng = 39.658871
        // Nairobi -> lat = -1.2921, lng = 36.8219
        // Kisumu -> lat = -0.0917, lng = 34.767956
        const latLng = { "NA": [-1.2921, 36.8219], "KS": [-0.0917, 34.767956], "MOM": [-4.043740, 39.658871] }

        const vehicle = await Vehicle.create({
            vehicleName,
            from,
            to, 
            location: {
                type: "Point",
                coordinates: latLng[from]
            }
        })

        res.json(vehicle)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}


export async function updateVehicleLocation(req, res) {
    try {
        const { vehicleId, latitude, longitude } = req.body

        const vehicle = await Vehicle.findOneAndUpdate(
            { vehicleId },
            {
                vehicleId,
                location: {
                    type: "Point",
                    coordinates: [latitude, longitude]
                }
            },
            {
                upsert: true,
                new: true
            }
        )

        res.json({ success: true, vehicle })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}