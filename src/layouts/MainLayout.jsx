import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/rightSidebar'
import { useAppContext } from '../context/AppContext'

const MainLayout = () => {
  const { isDark, theme } = useAppContext()

  return (
    <div
      data-theme={theme}
      className={[
        'flex h-screen overflow-hidden transition-colors duration-300',
        isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-950',
      ].join(' ')}
    >
      <LeftSidebar isDark={isDark} />
      
      <main className="min-w-0 flex-1 overflow-y-auto relative">
        {/* Subtle background glow effect for SaaS feel */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 ${isDark ? 'bg-purple-900' : 'bg-purple-200'}`}></div>
          <div className={`absolute top-[40%] -right-[10%] w-[40%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 ${isDark ? 'bg-blue-900' : 'bg-blue-200'}`}></div>
        </div>
        
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </main>

      <RightSidebar isDark={isDark} />
    </div>
  )
}

export default MainLayout
