import React, { useState } from 'react'
import {
  Plus,
  Play,
  CheckCircle2,
  Check,
  Layers,
} from 'lucide-react'
import { useAppContext, getTodayStr } from '../context/AppContext'

const RoutinesPage = () => {
  const {
    routines,
    habits,
    addRoutine,
    setActiveRoutineRunner,
  } = useAppContext()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newTimeOfDay, setNewTimeOfDay] = useState('morning')
  const [newMinutes, setNewMinutes] = useState(20)
  const [selectedHabitIds, setSelectedHabitIds] = useState([])

  const handleToggleHabitSelect = (id) => {
    if (selectedHabitIds.includes(id)) {
      setSelectedHabitIds(selectedHabitIds.filter((hId) => hId !== id))
    } else {
      setSelectedHabitIds([...selectedHabitIds, id])
    }
  }

  const handleCreateRoutine = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    addRoutine({
      title: newTitle.trim(),
      description: newDesc.trim(),
      timeOfDay: newTimeOfDay,
      habitIds: selectedHabitIds,
      estimatedMinutes: Number(newMinutes) || 20,
    })

    setIsCreateOpen(false)
    setNewTitle('')
    setNewDesc('')
    setSelectedHabitIds([])
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Routines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Group related habits together to build consistent daily flows.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>New Routine</span>
        </button>
      </div>

      {/* Create Routine Form */}
      {isCreateOpen && (
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Create Routine
            </h3>
            <button
              onClick={() => setIsCreateOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateRoutine} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Routine Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Morning routine, Evening wind down"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Time of Day
                  </label>
                  <select
                    value={newTimeOfDay}
                    onChange={(e) => setNewTimeOfDay(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Minutes
                  </label>
                  <input
                    type="number"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {habits.length > 0 && (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                  Select habits to include
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {habits.map((h) => {
                    const isSelected = selectedHabitIds.includes(h.id)
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => handleToggleHabitSelect(h.id)}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs text-left transition-colors ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-medium'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="truncate">{h.title}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 shrink-0 ml-1" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="px-4 py-1.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
              >
                Save Routine
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Routines Grid */}
      {routines.length === 0 ? (
        <div className="p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
          <div className="h-10 w-10 rounded-lg mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No routines created yet
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Routines let you bundle morning, evening, or workout habits into a single step-by-step checklist.
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Create a routine
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.map((routine) => {
            const routineHabits = (routine.habitIds || [])
              .map((id) => habits.find((h) => h.id === id))
              .filter(Boolean)
            const completedCount = routineHabits.filter((h) => h.completed).length

            return (
              <div
                key={routine.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {routine.title}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400 capitalize">
                      {routine.timeOfDay} • {routine.estimatedMinutes || 20}m
                    </span>
                  </div>

                  {routine.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {routine.description}
                    </p>
                  )}

                  {routineHabits.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {routineHabits.map((h, i) => (
                        <div
                          key={h.id}
                          className="flex items-center gap-2 text-xs py-1 px-2 rounded bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300"
                        >
                          <span className="text-[10px] text-slate-400 font-mono">0{i + 1}</span>
                          <span className={`truncate flex-1 ${h.completed ? 'line-through text-slate-400' : ''}`}>
                            {h.title}
                          </span>
                          {h.completed && <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {completedCount}/{routineHabits.length} completed
                  </span>
                  <button
                    onClick={() => setActiveRoutineRunner(routine)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    <span>Start Routine</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RoutinesPage
