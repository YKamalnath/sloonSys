import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home'
import './App.css'

function Dashboard() {
  const [health, setHealth] = useState<string>('Checking backend health...')

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data.message))
      .catch(() => setHealth('Failed to connect to backend.'))
  }, [])

  return (
    <div className="app-container">
      <header className="hero-section">
        <h1 className="title">Sloon System Dashboard</h1>
        <p className="subtitle">Your details and tools are ready.</p>
      </header>

      <main className="content">
        <div className="status-card">
          <h2>System Status</h2>
          <div className="health-check">
            <span className="status-indicator"></span>
            <p>{health}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        
         <Route path="/" element={<Home />} />

        
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />

       
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  )
}

export default App
