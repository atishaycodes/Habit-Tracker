import React, { useState, useEffect } from 'react'
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const RoutineRunnerModal = () => {
  const {
    activeRoutineRunner,
    setActiveRoutineRunner,
    habits,
    toggleHabitCompletion,
    completeRoutineForToday,
  } = useAppContext()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [stepTimer, setStepTimer] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [completedSteps, setCompletedSteps] = useState({})
  const [isFinished, setIsFinished] = useState(false)

  const routine = activeRoutineRunner

  const routineHabits = routine
    ? (routine.habitIds || [])
        .map((id) => habits.find((h) => h.id === id))
        .filter(Boolean)
    : []

  const currentHabit = routineHabits[currentStepIndex]

  useEffect(() => {
    if (activeRoutineRunner) {
      setCurrentStepIndex(0)
      setCompletedSteps({})
      setIsFinished(false)
      setIsTimerRunning(false)
      setStepTimer(60)
    }
  }, [activeRoutineRunner])

  useEffect(() => {
    let interval = null
    if (isTimerRunning && stepTimer > 0) {
      interval = setInterval(() => setStepTimer((t) => t - 1), 1000)
    } else if (isTimerRunning && stepTimer === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, stepTimer])

  if (!activeRoutineRunner || routineHabits.length === 0) return null

  const handleStepDone = () => {
    if (currentHabit) {
      if (!currentHabit.completed) {
        toggleHabitCompletion(currentHabit.id)
      }
      setCompletedSteps((prev) => ({ ...prev, [currentHabit.id]: true }))
    }

    if (currentStepIndex < routineHabits.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
      setStepTimer(60)
      setIsTimerRunning(false)
    } else {
      setIsFinished(true)
      completeRoutineForToday(routine.id)
    }
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        onClick={() => setActiveRoutineRunner(null)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {routine.title}
            </h3>
            <span className="text-[11px] text-slate-400">
              {isFinished ? 'Routine Complete' : `Step ${currentStepIndex + 1} of ${routineHabits.length}`}
            </span>
          </div>

          <button
            onClick={() => setActiveRoutineRunner(null)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isFinished ? (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 stroke-[2]" />
              </div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Routine Completed
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                All {routineHabits.length} habits in this routine were completed.
              </p>
              <button
                onClick={() => setActiveRoutineRunner(null)}
                className="px-5 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-2"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Progress bars */}
              <div className="flex gap-1.5">
                {routineHabits.map((h, i) => (
                  <div
                    key={h.id}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < currentStepIndex || completedSteps[h.id]
                        ? 'bg-blue-600'
                        : i === currentStepIndex
                        ? 'bg-blue-300 dark:bg-blue-800'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* Current Step */}
              <div className="text-center py-2 space-y-1">
                <span className="text-[11px] uppercase font-semibold text-blue-600 dark:text-blue-400 tracking-wider">
                  Step {currentStepIndex + 1}
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {currentHabit.title}
                </h2>
                {currentHabit.notes && (
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    {currentHabit.notes}
                  </p>
                )}
              </div>

              {/* Timer */}
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center space-y-2">
                <div className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-100">
                  {formatTime(stepTimer)}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  >
                    {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false)
                      setStepTimer(60)
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleStepDone}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <span>{currentStepIndex === routineHabits.length - 1 ? 'Finish' : 'Next Step'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoutineRunnerModal
