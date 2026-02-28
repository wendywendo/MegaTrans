import express from "express"
import { createVehicle, getAllVehicles, updateVehicleLocation } from "../controllers/vehicleController.js"

const router = express.Router()

router.get('/', getAllVehicles)
router.post('/createVehicle', createVehicle)
router.post('/update-location', updateVehicleLocation)

export default router