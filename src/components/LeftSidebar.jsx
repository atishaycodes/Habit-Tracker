import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Lightbulb,
  Repeat2,
  Settings,
} from 'lucide-react'
import logo from '../assets/icons/logo.svg'
import { useAppContext } from '../context/AppContext'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', Icon: LayoutDashboard },
  { label: 'Habits', path: '/habits', Icon: Repeat2 },
  { label: 'Statistics', path: '/statistics', Icon: BarChart3 },
  { label: 'Calendar', path: '/calendar', Icon: CalendarDays },
  { label: 'Insights', path: '/insights', Icon: Lightbulb },
  { label: 'Settings', path: '/settings', Icon: Settings },
]

const LeftSidebar = () => {
  const { isDark, habits } = useAppContext()

  const totalHabits = habits.length
  const completedToday = habits.filter((h) => h.completed).length
  const progress = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <aside
      className={[
        'relative z-10 flex h-full w-72 shrink-0 flex-col border-r px-5 py-6 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.18)] transition-colors duration-300 sm:w-80 sm:px-6 sm:py-8 backdrop-blur-md',
        isDark
          ? 'border-gray-800/60 bg-gray-900/90 text-gray-100'
          : 'border-gray-200/80 bg-white/90 text-gray-950',
      ].join(' ')}
    >
      <div className="mb-10 flex shrink-0 items-center gap-3.5 px-1 sm:mb-12 sm:gap-4">
        <img
          src={logo}
          alt="Habitify"
          className="h-12 w-12 shrink-0 drop-shadow-[0_4px_12px_rgba(139,92,246,0.35)] sm:h-14 sm:w-14"
        />
        <div className="flex min-w-0 flex-col">
          <h1
            className={[
              'text-xl font-bold leading-tight tracking-tight sm:text-2xl',
              isDark ? 'text-white' : 'text-gray-950',
            ].join(' ')}
          >
            Habitify
          </h1>
          <span
            className={[
              'mt-0.5 text-sm font-medium leading-snug',
              isDark ? 'text-gray-400' : 'text-gray-500',
            ].join(' ')}
          >
            Track your habits
          </span>
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2.5 sm:gap-3">
          {navItems.map(({ label, path, Icon }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) => [
                  'flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-base font-semibold transition-all duration-200 sm:gap-4 sm:py-4',
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400 shadow-sm border border-purple-500/20'
                    : isDark
                      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 border border-transparent',
                ].join(' ')}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      aria-hidden="true"
                      className={[
                        'h-5 w-5 shrink-0 transition-colors sm:h-6 sm:w-6',
                        isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400',
                      ].join(' ')}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={[
          'mt-6 shrink-0 border-t px-1 pt-6 pb-1 sm:pt-8',
          isDark ? 'border-gray-800/60' : 'border-gray-200',
        ].join(' ')}
      >
        <p className={['text-base font-bold', isDark ? 'text-white' : 'text-gray-950'].join(' ')}>
          Keep going! 💪
        </p>
        <p
          className={[
            'mt-2 text-sm font-medium sm:text-base',
            isDark ? 'text-gray-400' : 'text-gray-500',
          ].join(' ')}
        >
          {progress === 100 ? "You've crushed it today!" : "You're doing great."}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div
            className={['h-3.5 flex-1 overflow-hidden rounded-full shadow-inner', isDark ? 'bg-gray-800' : 'bg-gray-200'].join(' ')}
            role="progressbar"
            aria-label="Habit progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={['w-10 text-sm font-bold sm:text-base', isDark ? 'text-gray-300' : 'text-gray-600'].join(' ')}>
            {progress}%
          </span>
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar
