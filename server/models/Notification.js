import mongoose from "mongoose";

// message, to: user, read: boolean
const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
})

const Notification = mongoose.model("Notification", NotificationSchema)

export default Notification