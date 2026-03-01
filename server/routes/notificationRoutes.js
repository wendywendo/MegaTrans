import express from "express"

import { createNotification, getAllNotifications, markNotificationAsRead } from "../controllers/notificationController.js"

const router = express.Router()

router.get('/', getAllNotifications)
router.post('/', createNotification)
router.put('/:id', markNotificationAsRead)

export default router