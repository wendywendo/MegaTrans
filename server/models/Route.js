import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    from: {
        type: String,
        enum: ["NA", "KS", "MOM"],
        default: "NA"
    },
    to: {
        type: String,
        enum: ["NA", "KS", "MOM"],
        default: "KS"
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: { 
            type: [Number], 
            required: true  // lng, lat
        }
    },
    deptTime: String,
    eta: String,
    date: Date,
    status: {
        type: String,
        enum: ["upcoming", "active", "closed"],
        default: "upcoming"
    }
})

RouteSchema.index({ location: "2dsphere" });

const Route = mongoose.model("Route", RouteSchema)

export default Route
