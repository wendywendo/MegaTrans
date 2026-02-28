import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/auth/');

                if (!data?.error) {
                    setUser(data);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)