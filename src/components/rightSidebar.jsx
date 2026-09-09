import React, { useMemo, useState } from 'react'
import { Bell, Moon, Sun } from 'lucide-react'
import Calender from './Calender'
import QuoteCard from './QuoteCard'
import WeeklyProgress from './WeeklyProgress'
import { useAppContext } from '../context/AppContext'

const RightSidebar = ({ isDark }) => {
  const { toggleTheme, userSettings } = useAppContext()

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [current, setCurrent] = useState(() => {
    const d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  const [selected, setSelected] = useState(() => {
    const s = new Date()
    s.setHours(0, 0, 0, 0)
    return s
  })

  function prevMonth() {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))
  }

  function nextMonth() {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))
  }

  return (
    <aside
      className={[
        'relative z-10 flex h-full w-72 shrink-0 flex-col gap-6 overflow-y-auto border-l px-5 py-6 transition-colors duration-300 sm:w-80 sm:px-6 sm:py-8 backdrop-blur-md',
        isDark
          ? 'border-gray-800/60 bg-gray-900/90 text-gray-100'
          : 'border-gray-200/80 bg-white/90 text-gray-950',
      ].join(' ')}
    >
      <div className="flex shrink-0 items-center justify-end gap-4 mb-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={[
            'flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300',
            isDark
              ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-yellow-500/20'
              : 'bg-gray-100 text-purple-600 hover:bg-gray-200 hover:shadow-lg hover:shadow-purple-500/20',
          ].join(' ')}
        >
          {isDark ? (
            <Sun className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={2.5} />
          )}
        </button>
        
        <button
          type="button"
          aria-label="Notifications"
          className={[
            'flex h-11 w-11 relative items-center justify-center rounded-2xl transition-all duration-300',
            isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-950',
          ].join(' ')}
        >
          <Bell className="h-5 w-5" strokeWidth={2.5} />
          {userSettings.notificationsEnabled && (
            <span className="absolute top-2.5 right-3 h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900 dark:ring-white"></span>
          )}
        </button>
        
        <div className="h-11 w-11 rounded-2xl p-0.5 bg-linear-to-tr from-purple-500 to-indigo-500 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30">
          <img
            src={userSettings.avatarUrl}
            alt="Profile"
            className="h-full w-full rounded-[14px] object-cover bg-white dark:bg-gray-900"
          />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <Calender
          isDark={isDark}
          current={current}
          selected={selected}
          onPrev={prevMonth}
          onNext={nextMonth}
          onSelectDate={setSelected}
        />
        <WeeklyProgress isDark={isDark} selectedDate={selected} />
        <QuoteCard isDark={isDark} />
      </div>
    </aside>
  )
}

export default RightSidebar
