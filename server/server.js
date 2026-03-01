import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from './routes/authRoutes.js'
import busRoutes from './routes/busRoutes.js'
import routeRoutes from './routes/routeRoutes.js'
import tripRoutes from './routes/tripRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

import { connectDB } from "./config/db.js"

import path from "path"

import dotenv from "dotenv"

dotenv.config()

const app = express()
const __dirname = path.resolve()

// Middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))

}

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRoutes)
app.use('/api/routes', routeRoutes)
app.use('/api/buses', busRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/notifications', notificationRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.get((req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

const PORT = process.env.PORT || 8000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})