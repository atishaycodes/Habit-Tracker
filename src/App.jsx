import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import HabitsPage from './pages/HabitsPage'
import RoutinesPage from './pages/RoutinesPage'
import TasksPage from './pages/TasksPage'
import FocusPage from './pages/FocusPage'
import CalendarPage from './pages/CalendarPage'
import GoalsPage from './pages/GoalsPage'
import StatisticsPage from './pages/StatisticsPage'
import InsightsPage from './pages/InsightsPage'
import TemplatesPage from './pages/TemplatesPage'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public SaaS Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* HabitFlow Application Shell */}
          <Route element={<MainLayout />}>
            <Route path="app" element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="habits" element={<HabitsPage />} />
            <Route path="routines" element={<RoutinesPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="focus" element={<FocusPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="analytics" element={<StatisticsPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
