import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AuthContextProvider from "./context/AuthContext"
import ProtectedRoutes from "./components/ProtectedRoutes"
import DriverTrackingPage from "./pages/DriverTrackingPage"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import DriverDashboard from "./pages/Driver/DriverDashboard"
import StudentChecklist from "./pages/Driver/StudentChecklist"
import PageNotFound from "./pages/PageNotFound"

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
            <Route path="map">
              <Route path=":id?" element={<DriverTrackingPage />} />
            </Route>
          </Route>

          <Route path="admin" element={<AdminDashboard />} />

          <Route path="driver" element={<DriverDashboard />} />

          <Route path="passengers">
            <Route path=":id" element={<StudentChecklist />} />
          </Route>
  
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App
