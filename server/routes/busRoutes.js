import express from "express"

import { createBus, deleteBus, getAllBuses } from "../controllers/busController.js"

const router = express.Router()

router.get('/', getAllBuses)
router.post('/', createBus)
router.delete('/:id', deleteBus)

export default router