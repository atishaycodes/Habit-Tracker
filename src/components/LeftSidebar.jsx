import React, { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Repeat2,
  Layers,
  CheckSquare,
  Clock3,
  CalendarDays,
  Target,
  BarChart3,
  Lightbulb,
  Settings,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const primaryNavItems = [
  { label: 'Overview', path: '/dashboard', Icon: LayoutDashboard },
  { label: 'Habits', path: '/habits', Icon: Repeat2 },
  { label: 'Routines', path: '/routines', Icon: Layers },
  { label: 'Tasks', path: '/tasks', Icon: CheckSquare },
  { label: 'Focus', path: '/focus', Icon: Clock3 },
  { label: 'Calendar', path: '/calendar', Icon: CalendarDays },
]

const secondaryNavItems = [
  { label: 'Goals', path: '/goals', Icon: Target },
  { label: 'Analytics', path: '/analytics', Icon: BarChart3 },
  { label: 'Insights', path: '/insights', Icon: Lightbulb },
  { label: 'Settings', path: '/settings', Icon: Settings },
]

const LeftSidebar = ({ mobileOpen, setMobileOpen }) => {
  const {
    isDark,
    userSettings,
    stats,
    setQuickAddModal,
  } = useAppContext()

  const navigate = useNavigate()
  const location = useLocation()
  const [moreExpanded, setMoreExpanded] = useState(true)

  const { totalActive, completedToday, todayCompletionRate, morningCount, morningCompleted, afternoonCount, afternoonCompleted, eveningCount, eveningCompleted } = stats

  const handleTimeSlotClick = (slot) => {
    navigate(`/habits?slot=${slot}`)
    if (setMobileOpen) setMobileOpen(false)
  }

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto">
      <div>
        {/* Brand & Workspace Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                HabitFlow
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate">
                {userSettings.workspace || 'My Workspace'}
              </span>
            </div>
          </NavLink>

          <button
            onClick={() => setQuickAddModal({ isOpen: true, type: 'habit', timeOfDay: null })}
            aria-label="Add Habit"
            title="Add Habit"
            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Small Daily Progress (only shown if habits exist) */}
        {totalActive > 0 && (
          <div className="px-3 pt-3 pb-1">
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                <span>Today's Progress</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">
                  {completedToday}/{totalActive} ({todayCompletionRate}%)
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${todayCompletionRate}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <div className="px-2 pt-2 pb-1">
          <div className="px-2.5 pb-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Menu
          </div>
          <nav className="space-y-0.5">
            {primaryNavItems.map(({ label, path, Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={({ isActive }) => [
                  'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-950/40 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60 font-normal',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" strokeWidth={1.9} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Time of Day quick filters (clean and unobtrusive) */}
        {totalActive > 0 && (
          <div className="px-2 py-2">
            <div className="px-2.5 pb-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Time of Day
            </div>
            <div className="space-y-0.5 text-[12px]">
              {[
                { id: 'morning', label: 'Morning', count: morningCount, done: morningCompleted },
                { id: 'afternoon', label: 'Afternoon', count: afternoonCount, done: afternoonCompleted },
                { id: 'evening', label: 'Evening', count: eveningCount, done: eveningCompleted },
              ].map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSlotClick(slot.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg transition-colors text-left ${
                    location.pathname === '/habits' && location.search.includes(`slot=${slot.id}`)
                      ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-950/40 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{slot.label}</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {slot.done}/{slot.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Navigation (Collapsible 'More' section) */}
        <div className="px-2 py-2">
          <button
            onClick={() => setMoreExpanded(!moreExpanded)}
            className="w-full flex items-center justify-between px-2.5 pb-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <span>More</span>
            {moreExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>

          {moreExpanded && (
            <nav className="space-y-0.5 mt-0.5">
              {secondaryNavItems.map(({ label, path, Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  className={({ isActive }) => [
                    'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-950/40 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60 font-normal',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" strokeWidth={1.9} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* User Profile at Bottom */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <NavLink
          to="/settings"
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className={({ isActive }) => [
            'flex items-center justify-between p-2 rounded-lg text-left transition-colors',
            isActive
              ? 'bg-blue-50 dark:bg-blue-950/40'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800',
          ].join(' ')}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-semibold text-xs text-slate-700 dark:text-slate-200 shrink-0">
              {userSettings.name ? userSettings.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-[13px] font-medium text-slate-800 dark:text-slate-200 truncate leading-tight">
                {userSettings.name || 'Account'}
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                {userSettings.email || 'Settings'}
              </span>
            </div>
          </div>
          <Settings className="h-4 w-4 text-slate-400 shrink-0" />
        </NavLink>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-full w-56 lg:w-60 shrink-0 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 select-none transition-all duration-150">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 h-full flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

export default LeftSidebar
