import React, { useState, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const startDay = firstOfMonth.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = 0; i < 42; i++) {
    const indexFromStart = i - startDay
    if (indexFromStart < 0) {
      cells.push({
        day: prevMonthDays + indexFromStart + 1,
        muted: true,
        date: new Date(year, month - 1, prevMonthDays + indexFromStart + 1),
      })
    } else if (indexFromStart >= daysInMonth) {
      cells.push({
        day: indexFromStart - daysInMonth + 1,
        muted: true,
        date: new Date(year, month + 1, indexFromStart - daysInMonth + 1),
      })
    } else {
      cells.push({
        day: indexFromStart + 1,
        muted: false,
        date: new Date(year, month, indexFromStart + 1),
      })
    }
  }
  return cells
}

const CalendarPage = () => {
  const {
    habits,
    focusSessions,
  } = useAppContext()

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  const [selectedDate, setSelectedDate] = useState(() => {
    const s = new Date()
    s.setHours(0, 0, 0, 0)
    return s
  })

  const grid = useMemo(
    () => buildMonthGrid(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  )

  const monthLabel = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const prevMonth = () => {
    setCurrentDate((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    setSelectedDate(t)
    setCurrentDate(new Date(t.getFullYear(), t.getMonth(), 1))
  }

  const isSameDay = (a, b) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    )
  }

  const selectedDateStr = selectedDate.toISOString().split('T')[0]

  const habitsOnSelectedDate = useMemo(() => {
    return habits.map((h) => {
      const completedOnDate = h.history?.includes(selectedDateStr) || (isSameDay(selectedDate, today) && h.completed)
      return { ...h, completedOnDate }
    })
  }, [habits, selectedDateStr, selectedDate, today])

  const focusOnSelectedDate = useMemo(() => {
    return focusSessions.filter((f) => f.date === selectedDateStr)
  }, [focusSessions, selectedDateStr])

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Review past completions and day-by-day logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Today
          </button>
          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-white dark:bg-slate-900">
            <button onClick={prevMonth} className="p-1 rounded text-slate-500 hover:text-slate-900">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs font-semibold min-w-28 text-center text-slate-800 dark:text-slate-200">
              {monthLabel}
            </span>
            <button onClick={nextMonth} className="p-1 rounded text-slate-500 hover:text-slate-900">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="grid grid-cols-7 text-center font-medium text-xs text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {grid.map((cell, idx) => {
              const cellDateStr = cell.date.toISOString().split('T')[0]
              const isCellToday = isSameDay(cell.date, today)
              const isCellSelected = isSameDay(cell.date, selectedDate)

              let completedCount = 0
              habits.forEach((h) => {
                if (h.history?.includes(cellDateStr) || (isCellToday && h.completed)) {
                  completedCount++
                }
              })

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDate(cell.date)}
                  className={`min-h-12 p-1.5 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    isCellSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : isCellToday
                      ? 'border-slate-400 dark:border-slate-600 bg-slate-50/40 dark:bg-slate-800/40'
                      : cell.muted
                      ? 'border-transparent text-slate-300 dark:text-slate-700'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-medium">{cell.day}</span>
                  {completedCount > 0 && !cell.muted && (
                    <span className="text-[10px] text-blue-600 font-mono font-bold">
                      {completedCount}✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Date Log (1 col) */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {selectedDate.toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </h3>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Habits
            </span>
            {habitsOnSelectedDate.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No habits configured.</p>
            ) : (
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {habitsOnSelectedDate.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between p-2 rounded text-xs border border-slate-100 dark:border-slate-800"
                  >
                    <span className={`truncate ${h.completedOnDate ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-400'}`}>
                      {h.title}
                    </span>
                    {h.completedOnDate ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    ) : (
                      <span className="text-[10px] text-slate-400">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {focusOnSelectedDate.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Focus Logged
              </span>
              {focusOnSelectedDate.map((fs) => (
                <div key={fs.id} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 py-1">
                  <Clock3 className="h-3 w-3 text-blue-600" />
                  <span>{fs.durationMinutes}m focus session</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
