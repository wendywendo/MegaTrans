import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

const Bus = mongoose.model("Bus", BusSchema)

export default Bus