import React, { useState } from 'react'
import Login from './pages/Login/Login'
import { Routes, Route, Navigate, } from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'
import RefreshHandler from './RefreshHandler'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />

  }
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />


      </Routes>
    </div>
  )
}

export default App