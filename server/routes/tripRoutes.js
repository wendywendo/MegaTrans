import express from "express"

import { bookTrip, getMyTrips, getTripMembers, updateBookedTrip } from "../controllers/tripController.js"

const router = express.Router()

router.post('/book', bookTrip)
router.get('/parent', getMyTrips)

router.put("/:id", updateBookedTrip);

router.get('/:id', getTripMembers)

export default router