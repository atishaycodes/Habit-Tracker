import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="habits" element={<div className="p-8 text-2xl font-bold">Habits Page (Coming Soon)</div>} />
            <Route path="calendar" element={<div className="p-8 text-2xl font-bold">Calendar Page (Coming Soon)</div>} />
            <Route path="insights" element={<div className="p-8 text-2xl font-bold">Insights Page (Coming Soon)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
