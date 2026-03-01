import BookedTrip from "../models/BookedTrip.js"
import Route from "../models/Route.js"
import User from "../models/User.js"

import jwt from "jsonwebtoken"

export async function bookTrip(req, res) {
    try {
        const { user, route } = req.body

        const existingUser = await User.findById(user)
        if (!existingUser) {
            return res.json({ error: "User does not exist" })
        }

        const existingRoute = await Route.findById(route)
        if (!existingRoute) {
            return res.json({ error: "Route does not exist" })
        }

        const bookedTrip = await BookedTrip.create({
            user,
            route
        })

        res.json(bookedTrip)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function getMyTrips(req, res) {
    try {
        const { token } = req.cookies
                
        if (!token) {
            return res.json({ error: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const trips = await BookedTrip.find({ user: decoded.id })
            .populate({
                path: "route",
                populate: { path: "bus" }
            });
            

        res.json(trips)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function getTripMembers(req, res) {
    try {
        const { id } = req.params

        const bookedTrips = await BookedTrip.find({ route: id })
            .populate("user")

        res.json(bookedTrips)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}


export async function updateBookedTrip(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["booked", "boarded", "en-route", "arrived"];

    if (!allowedStatuses.includes(status)) {
      return res.json({ error: "Invalid status value" });
    }

    const trip = await BookedTrip.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.json({ error: "Booked trip does not exist" });
    }

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}