import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AuthContextProvider from "./context/AuthContext"
import ProtectedRoutes from "./components/ProtectedRoutes"
import DriverTrackingPage from "./pages/DriverTrackingPage"
import AdminDashboard from "./pages/Admin/AdminDashboard"

// Set axios defaults
const BASE_URL = "http://localhost:8000/"

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="map" element={<DriverTrackingPage />} />
          </Route>

          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
          </Route>
  
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App
