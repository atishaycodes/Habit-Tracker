import React, { useMemo } from 'react'

const WeeklyProgress = ({ isDark, selectedDate }) => {
  // Compute week start (Sunday) and end (Saturday) for selectedDate
  const { weekStart, weekEnd, completed, totalPossible, rate } = useMemo(() => {
    const s = new Date(selectedDate)
    s.setHours(0, 0, 0, 0)
    const day = s.getDay()
    const weekStart = new Date(s)
    weekStart.setDate(s.getDate() - day)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    // deterministic per-day completions (0-5) derived from date to avoid randomness
    let completed = 0
    const totalPossible = 5 * 7
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      // values 0..5 based on date to vary data
      const perDay = d.getDate() % 6
      completed += perDay
    }
    const rate = Math.round((completed / totalPossible) * 100)
    return { weekStart, weekEnd, completed, totalPossible, rate }
  }, [selectedDate])

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (rate / 100) * circumference

  function fmt(d) {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <div
      className={[
        'rounded-2xl border p-4 shadow-sm transition-colors duration-300 sm:p-5',
        isDark
          ? 'border-gray-800 bg-gray-950/60 shadow-black/20'
          : 'border-gray-200 bg-white shadow-gray-200/80',
      ].join(' ')}
    >
      <h3 className={['mb-2 text-sm font-semibold sm:text-base', isDark ? 'text-white' : 'text-gray-950'].join(' ')}>
        This Week • {fmt(weekStart)} — {fmt(weekEnd)}
      </h3>

      <div className="flex items-center gap-4">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className={isDark ? 'text-gray-800' : 'text-gray-200'}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-violet-500"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={['text-lg font-bold', isDark ? 'text-white' : 'text-gray-950'].join(' ')}>
              {rate}%
            </span>
            <span className={['text-[10px] leading-tight', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
              Completion
            </span>
            <span className={['text-[10px] leading-tight', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
              Rate
            </span>
          </div>
        </div>

        <div>
          <p className={['text-2xl font-bold sm:text-3xl', isDark ? 'text-white' : 'text-gray-950'].join(' ')}>
            {completed}{' '}
            <span className={['text-lg font-medium sm:text-xl', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
              / {totalPossible}
            </span>
          </p>
          <p className={['mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
            Habits Completed
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeeklyProgress
