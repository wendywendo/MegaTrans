import Route from "../models/Route.js"
import Bus from "../models/Bus.js"
import User from "../models/User.js"

export async function getAllRoutes(req, res) {
    try {
        const routes = await Route.find({})
            .populate("bus")
            .populate("driver", "fname lname")
        res.json(routes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function getActiveRoutes(req, res) {
    try {
        const routes = await Route.find({ status: "active" })
            .populate("bus")
            .populate("driver", "fname lname")
        res.json(routes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function createRoute(req, res) {
    try {
        const { bus, driver, from, to, deptTime, eta, date } = req.body;

        const existingBus = await Bus.findById(bus)
        if (!existingBus) {
            return res.json({ error: "Invalid bus ID" });
        }

        const existingDriver = await User.findById(driver)
        if (!existingDriver) {
            return res.json({ error: "Invalid driver ID" });
        }

        const availableLocations = ["NA", "KS", "MOM"];

        if (!availableLocations.includes(from)) {
            return res.status(400).json({ error: "Invalid 'from' location" });
        }

        if (!availableLocations.includes(to)) {
            return res.status(400).json({ error: "Invalid 'to' location" });
        }

        // longitude, latitude
        const coordinatesMap = {
            NA: [36.8219, -1.2921],     // Nairobi
            KS: [34.767956, -0.0917],   // Kisumu
            MOM: [39.658871, -4.043740] // Mombasa
        };

        const route = await Route.create({
            bus,
            driver,
            from,
            to,
            location: {
                coordinates: coordinatesMap[from]
            },
            deptTime,
            eta,
            date
        });

        res.json(route);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// Marking route as either open or closed [trip ended]
export async function updateRoute(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const allowedStatus = ["active", "closed"];
        if (!allowedStatus.includes(status)) {
            return res.json({
                error: "Status must be either 'active' or 'closed'"
            });
        }

        const route = await Route.findById(id);
        if (!route) {
            return res.json({ error: "Route not found" });
        }

        // Prevent reopening a closed route
        if (route.status === "closed") {
            return res.json({
                error: "Closed routes cannot be reopened"
            });
        }

        // Prevent skipping states (upcoming -> closed)
        if (route.status === "upcoming" && status === "closed") {
            return res.json({
                error: "Route must be active before it can be closed"
            });
        }

        route.status = status;
        await route.save();

        res.json(route);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}