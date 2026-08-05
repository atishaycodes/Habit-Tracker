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
  { label: 'Dashboard', Icon: LayoutDashboard, active: true },
  { label: 'Habits', Icon: Repeat2 },
  { label: 'Statistics', Icon: BarChart3 },
  { label: 'Calendar', Icon: CalendarDays },
  { label: 'Insights', Icon: Lightbulb },
  { label: 'Settings', Icon: Settings },
]

const LeftSidebar = () => {
  const progress = 75

  return (
    <aside className="relative z-10 flex h-full w-64 shrink-0 flex-col border-r border-gray-800 bg-gray-900 px-4 py-5 text-gray-100 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.45)]">
      <div className="mb-8 flex shrink-0 items-center gap-3 px-2">
        <img src={logo} alt="Logo" className="mt-1 h-10 w-10 shrink-0" />
        <div className="flex min-w-0 flex-col">
          <h1 className="text-lg font-semibold leading-tight text-white">Habitify</h1>
          <span className="text-xs font-normal leading-snug text-gray-400">
            Track your habits
          </span>
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-3">
          {navItems.map(({ label, Icon, active }) => (
            <li key={label}>
              <a
                href="#"
                className={[
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-violet-500/15 text-violet-300'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                ].join(' ')}
              >
                <Icon
                  aria-hidden="true"
                  className={[
                    'h-5 w-5 shrink-0 transition-colors',
                    active ? 'text-violet-300' : 'text-gray-400',
                  ].join(' ')}
                  strokeWidth={2}
                />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 shrink-0 border-t border-gray-800 px-2 pt-4 pb-1">
        <p className="text-sm font-bold text-white">Keep going! 💪</p>
        <p className="mt-2 text-sm font-medium text-gray-400">You&apos;re doing great.</p>
        <div className="mt-4 flex items-center gap-3">
          <div
            className="h-3 flex-1 overflow-hidden rounded-full bg-gray-800"
            role="progressbar"
            aria-label="Habit progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-9 text-sm font-bold text-gray-300">{progress}%</span>
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar
