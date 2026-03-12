import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './components/dashboard/Dashboard'
import CustomersView from './components/customers/CustomersView'
import AppointmentsView from './components/appointments/AppointmentsView'
import StaffView from './components/staff/StaffView'
import ServicesView from './components/services/ServicesView'
import BillingView from './components/billing/BillingView'
import ProductsView from './components/products/ProductsView'
import ReportsView from './components/reports/ReportsView'
import './App.css'

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <>
      {/* We only show the Navbar on the top level / public routes, not inside dashboard */}
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />

        <Route
          path="/login"
          element={!user ? <><Navbar /><Login /></> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/register"
          element={!user ? <><Navbar /><Register /></> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected Dashboard Routes nested under AdminLayout */}
        <Route
          path="/dashboard"
          element={user ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          {/* Default dashboard view */}
          <Route index element={<Dashboard />} />

          {/* Module placeholders */}
          <Route path="customers" element={<CustomersView />} />
          <Route path="appointments" element={<AppointmentsView />} />
          <Route path="staff" element={<StaffView />} />
          <Route path="services" element={<ServicesView />} />
          <Route path="billing" element={<BillingView />} />
          <Route path="products" element={<ProductsView />} />
          <Route path="reports" element={<ReportsView />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
