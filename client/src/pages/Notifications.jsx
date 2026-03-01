import axios from "axios"
import { useEffect, useState } from "react"

function Notifications() {

    const [notifications, setNotifications] = useState([])

    const markNotificationAsRead = async (notificationId) => {
        try {
            const { data } = await axios.put(`notifications/${notificationId}`)

            if (!data.error) {
                // Update UI
                setNotifications(prev => prev.filter(notification => notification._id != notificationId))
            }
        } catch (error) {
            console.error(error)
        }
    }   

    useEffect(() => {
        const fetchAllNotifications = async () => {
            try {
                const { data } = await axios.get('notifications')

                if (!data?.error) {
                    setNotifications(data)
                }  
                
            } catch (error) {
                console.error(error)
            }
        }

        fetchAllNotifications()
    }, [])

    return (
        <div>
            <h1>NOTIFICATIONS</h1>

            {
                notifications.length == 0 && (
                    <p>No notifications available for now. Try to reload the page.</p>
                )
            }

            {
                notifications.map(notification => (
                    <div key={notification._id}>
                        <p>{ notification.message }</p>
                        <button onClick={() => markNotificationAsRead(notification._id)}>MARK AS READ</button>
                        <br />
                        <br />
                    </div>
                ))
            }
        </div>
    )
}

export default Notifications