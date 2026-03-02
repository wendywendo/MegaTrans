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
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black">Notifications</h1>
                <p className="text-gray-500 text-sm">
                    Stay updated with important trip alerts and system messages.
                </p>
            </div>

            {
                notifications.length == 0 && (
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-gray-500">
                            No notifications available right now.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            New alerts will appear here.
                        </p>
                    </div>
                )
            }

            {/* Notifications list */}
            <div className="flex flex-col gap-4">
                {
                    notifications.map(notification => (
                        <div 
                            key={notification._id}
                            className="bg-white rounded-xl shadow p-4 flex justify-between items-start gap-4"
                        >
                            <div>
                                <p className="text-black font-medium">
                                    { notification.message }
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Unread notification
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => markNotificationAsRead(notification._id)}
                                className="shrink-0 bg-[#3A276D] hover:bg-[#2c1f55] text-white text-sm font-bold px-4 py-2 rounded transition-colors duration-200"
                            >
                                MARK AS READ
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notifications