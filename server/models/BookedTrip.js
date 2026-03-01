import mongoose from "mongoose";

const BookedTripSchema = new mongoose.Schema({
    user: { // Parent
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "boarded", "en-route", "arrived"],
        default: "booked"
    }
})

const BookedTrip = mongoose.model("BookedTrip", BookedTripSchema)

export default BookedTrip