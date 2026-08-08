import React, { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Helper: build a 6x7 grid for the given month/year
function buildMonthGrid(year, month) {
  // month: 0-11
  const firstOfMonth = new Date(year, month, 1)
  const startDay = firstOfMonth.getDay() // 0-6 (Sun-Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // previous month tail
  const prevMonthDays = new Date(year, month, 0).getDate()

  const cells = []
  // 42 cells (6 weeks)
  for (let i = 0; i < 42; i++) {
    const indexFromStart = i - startDay
    if (indexFromStart < 0) {
      // previous month
      cells.push({
        day: prevMonthDays + indexFromStart + 1,
        muted: true,
        date: new Date(year, month - 1, prevMonthDays + indexFromStart + 1),
      })
    } else if (indexFromStart >= daysInMonth) {
      // next month
      cells.push({
        day: indexFromStart - daysInMonth + 1,
        muted: true,
        date: new Date(year, month + 1, indexFromStart - daysInMonth + 1),
      })
    } else {
      // current month
      cells.push({
        day: indexFromStart + 1,
        muted: false,
        date: new Date(year, month, indexFromStart + 1),
      })
    }
  }
  return cells
}

const Calender = ({ isDark, current, selected, onPrev, onNext, onSelectDate }) => {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  }

  const grid = useMemo(() => buildMonthGrid(current.getFullYear(), current.getMonth()), [current])
  const monthLabel = current.toLocaleString(undefined, { month: 'long', year: 'numeric' })

  return (
    <div
      className={[
        'rounded-2xl border p-4 shadow-sm transition-colors duration-300 sm:p-5',
        isDark
          ? 'border-gray-800 bg-gray-950/60 shadow-black/20'
          : 'border-gray-200 bg-white shadow-gray-200/80',
      ].join(' ')}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className={['text-base font-semibold sm:text-lg', isDark ? 'text-white' : 'text-gray-950'].join(' ')}>
          {monthLabel}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            className={[
              'rounded-lg p-1.5 transition-colors',
              isDark
                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-950',
            ].join(' ')}
            onClick={onPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className={[
              'rounded-lg p-1.5 transition-colors',
              isDark
                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-950',
            ].join(' ')}
            onClick={onNext}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {weekdays.map((label, index) => (
          <span key={`${label}-${index}`} className="text-xs font-medium text-gray-500">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {grid.map((cell, index) => {
          const isToday = isSameDay(cell.date, today)
          const isSelected = isSameDay(cell.date, selected)
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectDate(cell.date)}
              className={[
                'relative flex h-8 w-full flex-col items-center justify-center rounded-full text-sm',
                cell.muted ? 'text-gray-400' : isDark ? 'text-gray-200' : 'text-gray-700',
                isSelected ? 'bg-violet-500 font-semibold text-white' : '',
                !isSelected && isToday ? (isDark ? 'ring-1 ring-white/30' : 'ring-1 ring-gray-300') : '',
              ].join(' ')}
            >
              <span>{cell.day}</span>
              {isToday && !isSelected && <span className="sr-only">Today</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calender
