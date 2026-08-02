import React from 'react'
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Lightbulb,
  Repeat2,
  Settings,
} from 'lucide-react'
import logo from '../assets/icons/logo.svg'

const navItems = [
  { label: 'Dashboard', Icon: LayoutDashboard },
  { label: 'Habits', Icon: Repeat2 },
  { label: 'Statistics', Icon: BarChart3 },
  { label: 'Calendar', Icon: CalendarDays },
  { label: 'Insights', Icon: Lightbulb },
  { label: 'Settings', Icon: Settings },
]

const LeftSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 border-r border-gray-800 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.45)] flex flex-col px-4 py-5 text-gray-100 relative z-10">
      <div className="flex items-center gap-3 px-2 mb-8">
        <img src={logo} alt="Logo" className="w-10 h-10 mt-1 shrink-0" />
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-semibold leading-tight text-white">Habitify</h1>
          <span className="text-xs font-normal text-gray-400 leading-snug">
            Track your habits
          </span>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          {navItems.map(({ label, Icon }) => (
            <li key={label}>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gray-400 transition-colors"
                  strokeWidth={2}
                />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default LeftSidebar
