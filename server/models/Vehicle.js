import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    vehicleName: { // KAU088H123
        type: String,
        required: true,
        unique: true
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
            required: true 
        },
        coordinates: { 
            type: [Number], 
            required: true 
        }
    }
})

const Vehicle = mongoose.model("Vehicle", VehicleSchema)

export default Vehicle

