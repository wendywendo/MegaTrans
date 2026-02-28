import jwt, { decode } from "jsonwebtoken"
import { comparePassword, hashPassword } from "../helpers/auth.js"
import User from "../models/User.js"

export async function getUser(req, res) {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.json({ error: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded.id)
        res.json(user)
    } catch (error) {
        console.error(error)
    }
}

export async function registerUser(req, res) {
    try {
        var { password } = req.body
        const { fname, lname, phone, role } = req.body

        // Check if phone number is unique
        const existingPhone = await User.findOne({ phone })
        if (existingPhone) {
            return res.json({ error: "Phone number already exists in the database" })
        } 

        if (role == "driver") {
            password = `${fname}@123`
        }

        // Check password validity
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be greater than 6 characters" })
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Admin creation
        if (role == "admin" || role == "driver") {

            const user = await User.create({
                fname,
                lname,
                phone,
                password: hashedPassword,
                isVerified: true,
                role
            })

            return res.json(user)

        } else {

            const user = await User.create({
                fname,
                lname,
                phone,
                password: hashedPassword
            })

            return res.json(user)
        }
    } catch (error) {
        console.error(error)
    }
}

export async function loginUser(req, res) {
    try {
        const { phone, password } = req.body

        // Find user
        const user = await User.findOne({ phone })
        if (!user) {
            return res.json({ error: "User does not exist" })
        }

        // Verify user password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.json({ error: "Password incorrect" })
        }

        jwt.sign(
            {
                id: user._id,
                fname: user.fname,
                lname: user.lname,
                phone: user.phone
            },
            process.env.SECRET_KEY, {}, 
            (err, token) => {
                if (err) throw err

                res.cookie('token', token, {
                    httpOnly: true,  
                }).json(user)
            }
        )
    } catch (error) {
        console.error(error)
    }
}

export async function logoutUser(req, res) {
    try {
        res.clearCookie('token', {
            httpOnly:true
        }).json({ message: "Logged out successfully!" })
    } catch (error) {
        console.error(error)
    }
}

export async function getAllDrivers(req, res) {
    try {
        const drivers = await User.find({ role: "driver" })

        res.json(drivers)
    } catch (error) {
        console.error(error)
    }
}