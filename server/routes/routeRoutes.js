import express from "express"
import { createRoute, getActiveRoutes, getAllRoutes, updateRoute } from "../controllers/routeController.js"

const router = express.Router()

router.get('/', getAllRoutes)
router.put('/update/:id', updateRoute)
router.get('/active', getActiveRoutes)
router.post('/create', createRoute)

export default router