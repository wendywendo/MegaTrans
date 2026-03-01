import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AuthContextProvider from "./context/AuthContext"
import ProtectedRoutes from "./components/ProtectedRoutes"
import TrackingPage from "./pages/TrackingPage"
import StudentChecklist from "./pages/StudentChecklist"
import PageNotFound from "./pages/PageNotFound"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"

// Set axios defaults
const BASE_URL = "http://localhost:8000/"

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="map">
                <Route path=":id?" element={<TrackingPage />} />
              </Route>

              <Route path="passengers">
                <Route path=":id" element={<StudentChecklist />} />
              </Route>

              <Route path="notifications" element={<Notifications /> }/>

              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App
