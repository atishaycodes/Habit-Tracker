import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Static June 2024 grid (plain UI — no date logic)
const days = [
  // prev month tail
  { day: 26, muted: true },
  { day: 27, muted: true },
  { day: 28, muted: true },
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 31, muted: true },
  { day: 1 },
  // week 2
  { day: 2, dot: true },
  { day: 3, dot: true },
  { day: 4, dot: true },
  { day: 5, dot: true },
  { day: 6, dot: true },
  { day: 7, dot: true },
  { day: 8 },
  // week 3
  { day: 9, dot: true },
  { day: 10, dot: true },
  { day: 11, dot: true },
  { day: 12, selected: true, dot: true },
  { day: 13, dot: true },
  { day: 14, dot: true },
  { day: 15 },
  // week 4
  { day: 16, dot: true },
  { day: 17, dot: true },
  { day: 18, dot: true },
  { day: 19, dot: true },
  { day: 20, dot: true },
  { day: 21, dot: true },
  { day: 22 },
  // week 5
  { day: 23, dot: true },
  { day: 24, dot: true },
  { day: 25, dot: true },
  { day: 26, dot: true },
  { day: 27, dot: true },
  { day: 28, dot: true },
  { day: 29 },
  // week 6
  { day: 30 },
  { day: 1, muted: true },
  { day: 2, muted: true },
  { day: 3, muted: true },
  { day: 4, muted: true },
  { day: 5, muted: true },
  { day: 6, muted: true },
]

const Calender = () => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4 shadow-lg sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white sm:text-lg">June 2024</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
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
        {days.map((cell, index) => (
          <div
            key={index}
            className={[
              'relative flex h-8 flex-col items-center justify-center rounded-full text-sm',
              cell.muted ? 'text-gray-600' : 'text-gray-200',
              cell.selected ? 'bg-violet-500 font-semibold text-white' : '',
            ].join(' ')}
          >
            {cell.day}
            {cell.dot && !cell.selected && (
              <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-violet-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calender
