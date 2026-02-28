import express from "express"
import { getUser, registerUser, loginUser, logoutUser, getAllDrivers } from "../controllers/authController.js"

const router = express.Router()

router.get('/', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.get('/drivers', getAllDrivers)

export default router