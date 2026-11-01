import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from '../components/LeftSidebar'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import CommandPalette from '../components/CommandPalette'
import QuickAddModal from '../components/QuickAddModal'
import RoutineRunnerModal from '../components/RoutineRunnerModal'
import { useAppContext } from '../context/AppContext'

const MainLayout = () => {
  const { isDark, theme } = useAppContext()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div
      data-theme={theme}
      className={`flex h-screen w-screen overflow-hidden ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Sleek, unmagnified Left Sidebar */}
      <LeftSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main View Area */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <Navbar onToggleMobile={() => setMobileSidebarOpen((prev) => !prev)} />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <Toast />
      <CommandPalette />
      <QuickAddModal />
      <RoutineRunnerModal />
    </div>
  )
}

export default MainLayout
