import Route from "../models/Route.js"
import Bus from "../models/Bus.js"
import User from "../models/User.js"

import jwt from "jsonwebtoken"
import BookedTrip from "../models/BookedTrip.js"

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

export async function getRoute(req, res) {
    try {
        const { id } = req.params;

        const route = await Route.findById(id)
            .populate("bus")
            .populate("driver", "fname lname")

        res.json(route)
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

// GetDriverRoutes
export async function getDriverRoutes(req, res) {
    try {
        const { token } = req.cookies
        
        if (!token) {
            return res.json({ error: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const routes = await Route.find({ driver: decoded.id }) 
            .populate("bus")
            .populate("driver", "fname lname")

        res.json(routes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// Driver updates location
export async function updateRouteLocation (req, res) {
  try {
    const { routeId, latitude, longitude } = req.body;

    const route = await Route.findOneAndUpdate(
      { _id: routeId },
      {
        location: { type: "Point", coordinates: [longitude, latitude] },
      },
      { upsert: true }
    );

    res.json({ success: true, route });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get location
export async function getRouteLocation (req, res) {
    try {
        const { id } = req.params

        const route = await Route.findById(id)

        res.json({
            latitude: route.location.coordinates[1],
            longitude: route.location.coordinates[0]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// ===================================


// Start route
export async function startRoute(req, res) {
    try {
        const { routeId } = req.body

        const route = await Route.findById(routeId)
        if (!route) {
            res.json({ error: "Route does not exist" })
        }

        // Update route status to active
        route.status = "active"
        route.save()

        // Update all passengers status in the trip (if boarded) to en-route
        const trips = await BookedTrip.find({ route: route._id })
            .populate("user")
            .populate("route")

        
        const sendNotification = async (trip, message) => {
            await Notification.create({
                message,
                to: trip.user
            })
        }

        trips.forEach(trip => {
            if (trip.status == "boarded") {
                trip.status = "en-route"
                trip.save()
                
                const message = `Your booked trip from ${trip.route.from} -> ${trip.route.to} scheduled to depart at ${trip.route.deptTime} is en-route`;

                // Send notifications to parents that students are en-route
                sendNotification(trip, message)
            } 
            
            else if (trip.status == "booked") {
                const message = `Your booked trip from ${trip.route.from} -> ${trip.route.to} scheduled to depart at ${trip.route.deptTime} has still not yet been boarded! Note: You have 10mins to arrive at the bus!`;

                // Send notifications to parents that students are en-route
                sendNotification(trip, message)
            }
        })

        


        // Send notifications to parents whose children have not boarded


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}


// Complete trip
export async function completeRoute(req, res) {
    try {
        const { routeId } = req.body

        const route = await Route.findById(routeId)
        if (!route) {
            res.json({ error: "Route does not exist" })
        }

        // Update route status to closed
        route.status = "closed"
        route.save()

        // Update all passengers status in the trip (if en-route) to arrived
        const trips = await BookedTrip.find({ route: route._id })

        trips.forEach(trip => {
            if (trip.status == "en-route") {
                trip.status = "arrived"
                trip.save()
            }
        })

        // Send notifications to parents that students have arrived

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}