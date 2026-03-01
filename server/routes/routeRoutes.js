import express from "express"
import { completeRoute, createRoute, getActiveRoutes, getAllRoutes, getDriverRoutes, getRoute, getRouteLocation, startRoute, updateRoute, updateRouteLocation } from "../controllers/routeController.js"

const router = express.Router()

router.get('/', getAllRoutes)
router.put('/update/:id', updateRoute)
router.get('/active', getActiveRoutes)
router.post('/create', createRoute)

router.get('/driver', getDriverRoutes)

router.post("/update-location", updateRouteLocation)

router.post('/start', startRoute)
router.post('/complete', completeRoute)

router.get('/:id', getRoute)
router.get('/:id/location', getRouteLocation)

export default router