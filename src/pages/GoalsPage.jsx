import React, { useState } from 'react'
import {
  Target,
  Plus,
  Trash2,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const GoalsPage = () => {
  const {
    goals,
    addGoal,
    updateGoalProgress,
    deleteGoal,
  } = useAppContext()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [goalTarget, setGoalTarget] = useState(10)
  const [goalUnit, setGoalUnit] = useState('Sessions')
  const [goalCategory, setGoalCategory] = useState('General')
  const [goalDeadline, setGoalDeadline] = useState('2026-12-31')

  const handleCreateGoal = (e) => {
    e.preventDefault()
    if (!goalTitle.trim()) return

    const targetVal = Number(goalTarget) || 10

    addGoal({
      title: goalTitle.trim(),
      description: goalDesc.trim(),
      targetValue: targetVal,
      currentValue: 0,
      unit: goalUnit.trim() || 'Units',
      category: goalCategory,
      deadline: goalDeadline,
      milestones: [],
    })

    setIsAddOpen(false)
    setGoalTitle('')
    setGoalDesc('')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Goals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Connect daily habits to long-term targets.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Add Goal Drawer */}
      {isAddOpen && (
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Create Goal
            </h3>
            <button
              onClick={() => setIsAddOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Read 12 books this year"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value)}
                  placeholder="Learning, Fitness, Career"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Target</label>
                <input
                  type="number"
                  min="1"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Unit</label>
                <input
                  type="text"
                  value={goalUnit}
                  onChange={(e) => setGoalUnit(e.target.value)}
                  placeholder="Books, km, Sessions"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!goalTitle.trim()}
                className="px-4 py-1.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
          <div className="h-10 w-10 rounded-lg mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No goals set yet
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Set quarterly or annual targets and measure your progress.
          </p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Create a goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const pct = Math.min(100, Math.round(((goal.currentValue || 0) / (goal.targetValue || 1)) * 100))

            return (
              <div
                key={goal.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {goal.category}
                    </span>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {goal.title}
                  </h3>

                  <div className="space-y-1 my-3">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>{pct}%</span>
                      <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Due {goal.deadline}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateGoalProgress(goal.id, (goal.currentValue || 0) - 1)}
                      className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, (goal.currentValue || 0) + 1)}
                      className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-blue-600 font-semibold hover:bg-blue-50"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GoalsPage
