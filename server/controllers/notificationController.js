import Notification from "../models/Notification.js"

export async function getAllNotifications(req, res) {
    try {
        const { token } = req.cookies
        
        if (!token) {
            return res.json({ error: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // Find notifications sent to me and read = false
        const notifications = await Notification.find({ to: decoded.id, read: false })

        res.json(notifications)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function createNotification(req, res) {
    try {
        const { message, userId } = req.body

        const notification = await Notification.create({
            message,
            to: userId
        })

        res.json(notification)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}

export async function markNotificationAsRead(req, res) {
    try {
        const { id } = req.params

        const notification = await Notification.findById(id)
        if (!notification) {
            return res.json({ error: "Notification not found" })
        }

        if (notification.read == true) {
            return res.json({ error: "Notification has already been marked as read" })
        }

        notification.read = true
        notification.save()

        res.json(notification)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}