import express from "express"
import { createRoute, getActiveRoutes, getAllRoutes, getDriverRoutes, getRoute, getRouteLocation, updateRoute, updateRouteLocation } from "../controllers/routeController.js"

const router = express.Router()

router.get('/', getAllRoutes)
router.put('/update/:id', updateRoute)
router.get('/active', getActiveRoutes)
router.post('/create', createRoute)

router.get('/driver', getDriverRoutes)

router.get('/:id', getRoute)
router.get('/:id/location', getRouteLocation)

router.post("/update-location", updateRouteLocation)


export default router