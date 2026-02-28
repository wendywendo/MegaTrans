import Bus from "../models/Bus.js"

export async function getAllBuses(req, res) {
    try {
        const buses = await Bus.find({})

        res.json(buses)
    } catch (error) {
        console.error(error)
    }
}

export async function createBus(req, res) {
    try {

        const { name } = req.body

        const bus = await Bus.create({
            name
        })

        res.json(bus)
    } catch (error) {
        console.error(error)
    }
}

export async function deleteBus(req, res) {
    try {
        const { id } = req.params

        const result = await Bus.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Bus not found" });
        }

        res.status(200).json({ success: "Bus deleted successfully" });
    } catch (error) {
        console.error(error)
    }
}