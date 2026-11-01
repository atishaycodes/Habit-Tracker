import React from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Clock3,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const FocusPage = () => {
  const {
    timerMode,
    timerDuration,
    timerLeft,
    timerIsRunning,
    timerLinkedHabit,
    timerLinkedTask,
    setTimerLinkedHabit,
    setTimerLinkedTask,
    startTimer,
    pauseTimer,
    resetTimer,
    changeTimerMode,
    focusSessions,
    habits,
    tasks,
  } = useAppContext()

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
  }

  const progressPercent = timerDuration > 0
    ? ((timerDuration - timerLeft) / timerDuration) * 100
    : 0

  const radius = 100
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Focus
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Pomodoro timer for distraction-free deep work sessions.
        </p>
      </div>

      {/* Timer Container Card */}
      <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center">
        {/* Mode Selector */}
        <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs font-medium mb-6">
          {[
            { id: 'focus', label: 'Pomodoro (25m)', duration: 25 },
            { id: 'short_break', label: 'Short Break (5m)', duration: 5 },
            { id: 'long_break', label: 'Long Break (15m)', duration: 15 },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => changeTimerMode(mode.id, mode.duration)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timerMode === mode.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Circular Progress */}
        <div className="relative flex items-center justify-center my-3">
          <svg className="w-56 h-56 transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-100 dark:text-slate-800"
            />
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="#2563EB"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-mono font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {formatTime(timerLeft)}
            </span>
            <span className="text-[11px] font-medium text-slate-400 mt-1 capitalize">
              {timerMode.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={resetTimer}
            title="Reset"
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={timerIsRunning ? pauseTimer : startTimer}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xs"
          >
            {timerIsRunning ? (
              <>
                <Pause className="h-4 w-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white ml-0.5" />
                <span>Start</span>
              </>
            )}
          </button>
        </div>

        {/* Link to habit or task */}
        {(habits.length > 0 || tasks.length > 0) && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            <span>Link to:</span>
            {habits.length > 0 && (
              <select
                value={timerLinkedHabit || ''}
                onChange={(e) => setTimerLinkedHabit(e.target.value || null)}
                className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="">Habit (None)</option>
                {habits.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.title}
                  </option>
                ))}
              </select>
            )}

            {tasks.length > 0 && (
              <select
                value={timerLinkedTask || ''}
                onChange={(e) => setTimerLinkedTask(e.target.value || null)}
                className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="">Task (None)</option>
                {tasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      {/* Session History */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Session History
        </h3>

        {focusSessions.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            No focus sessions logged yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {focusSessions.map((session) => (
              <div key={session.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {session.durationMinutes}m {session.type.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {session.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FocusPage
