import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    phone: {
        type: String,
        unique: true
    },
    password: String,
    isVerified: {
        type: "Boolean",
        default: false
    },
    role: {
        type: String,
        enum: ["parent", "driver", "admin"],
        default: "parent"
    },
})

const User = mongoose.model("User", UserSchema)

export default User