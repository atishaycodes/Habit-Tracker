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
    <aside className="relative z-10 flex h-full w-72 shrink-0 flex-col border-r border-gray-800 bg-gray-900 px-5 py-6 text-gray-100 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.45)] sm:w-80 sm:px-6 sm:py-8">
      <div className="mb-10 flex shrink-0 items-center gap-3.5 px-1 sm:mb-12 sm:gap-4">
        <img
          src={logo}
          alt="Habitify"
          className="h-12 w-12 shrink-0 drop-shadow-[0_4px_12px_rgba(139,92,246,0.35)] sm:h-14 sm:w-14"
        />
        <div className="flex min-w-0 flex-col">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
            Habitify
          </h1>
          <span className="mt-0.5 text-sm font-normal leading-snug text-gray-400">
            Track your habits
          </span>
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2.5 sm:gap-3">
          {navItems.map(({ label, Icon, active }) => (
            <li key={label}>
              <a
                href="#"
                className={[
                  'flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-base font-semibold transition-colors sm:gap-4 sm:py-4',
                  active
                    ? 'bg-violet-500/15 text-violet-300'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                ].join(' ')}
              >
                <Icon
                  aria-hidden="true"
                  className={[
                    'h-5 w-5 shrink-0 transition-colors sm:h-6 sm:w-6',
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

      <div className="mt-6 shrink-0 border-t border-gray-800 px-1 pt-5 pb-1 sm:pt-6">
        <p className="text-base font-bold text-white">Keep going! 💪</p>
        <p className="mt-2 text-sm font-medium text-gray-400 sm:text-base">
          You&apos;re doing great.
        </p>
        <div className="mt-4 flex items-center gap-3 sm:mt-5">
          <div
            className="h-3.5 flex-1 overflow-hidden rounded-full bg-gray-800"
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
          <span className="w-10 text-sm font-bold text-gray-300 sm:text-base">
            {progress}%
          </span>
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar
