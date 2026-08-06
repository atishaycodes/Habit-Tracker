import React from 'react'

const WeeklyProgress = () => {
  // Static 80% ring — plain UI only
  const rate = 80
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (rate / 100) * circumference

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4 shadow-lg sm:p-5">
      <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">This Week</h3>

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
              className="text-gray-800"
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
            <span className="text-lg font-bold text-white">{rate}%</span>
            <span className="text-[10px] leading-tight text-gray-400">Completion</span>
            <span className="text-[10px] leading-tight text-gray-400">Rate</span>
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold text-white sm:text-3xl">
            28 <span className="text-lg font-medium text-gray-400 sm:text-xl">/ 35</span>
          </p>
          <p className="mt-1 text-sm text-gray-400">Habits Completed</p>
        </div>
      </div>
    </div>
  )
}

export default WeeklyProgress
