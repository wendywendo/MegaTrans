import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from './routes/authRoutes.js'
import busRoutes from './routes/busRoutes.js'
import routeRoutes from './routes/routeRoutes.js'
import tripRoutes from './routes/tripRoutes.js'
import { connectDB } from "./config/db.js"

import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use('/auth', authRoutes)
app.use('/routes', routeRoutes)
app.use('/buses', busRoutes)
app.use('/trips', tripRoutes)

const PORT = 8000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})