import React, { useMemo, useState } from 'react'
import {
  BarChart3,
  Flame,
  CheckCircle2,
  Clock3,
} from 'lucide-react'
import { useAppContext, CATEGORIES, getDaysAgoStr } from '../context/AppContext'

const StatisticsPage = () => {
  const {
    habits,
    focusSessions,
    stats,
  } = useAppContext()

  const [dateRange, setDateRange] = useState('28') // '28' | '90'

  // Heatmap based on real data
  const heatmapData = useMemo(() => {
    const daysCount = Number(dateRange) || 28
    const cells = []
    for (let i = daysCount - 1; i >= 0; i--) {
      const dStr = getDaysAgoStr(i)
      let count = 0
      habits.forEach((h) => {
        if (h.history?.includes(dStr)) count++
      })
      cells.push({ date: dStr, count })
    }
    return cells
  }, [habits, dateRange])

  // Total all-time completions
  const totalCompletions = useMemo(() => {
    return habits.reduce((sum, h) => sum + (h.history?.length || 0), 0)
  }, [habits])

  // Category completion rates
  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catHabits = habits.filter((h) => h.category === cat.id)
      if (catHabits.length === 0) return null
      const completedCount = catHabits.filter((h) => h.completed).length
      const rate = Math.round((completedCount / catHabits.length) * 100)
      return {
        ...cat,
        habitCount: catHabits.length,
        completionRate: rate,
      }
    }).filter(Boolean)
  }, [habits])

  if (habits.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="h-10 w-10 rounded-lg mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Analytics
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Your activity will appear here as you build and complete your habits.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Consistency metrics and habit completion history.
          </p>
        </div>

        {/* Date range filter */}
        <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          {[
            { id: '28', label: 'Last 28 days' },
            { id: '90', label: 'Last 90 days' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setDateRange(r.id)}
              className={`px-3 py-1 rounded-md transition-colors ${
                dateRange === r.id
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Total Completions
          </span>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {totalCompletions}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Best Streak
          </span>
          <div className="text-2xl font-bold text-amber-500 mt-1 flex items-center gap-1">
            <Flame className="h-5 w-5 fill-amber-500" />
            <span>{stats.bestStreak}d</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Weekly Rate
          </span>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {stats.weeklyRate}%
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Focus Logged
          </span>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {stats.weekFocusMinutes}m
          </div>
        </div>
      </div>

      {/* Activity Heatmap Grid */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Activity Heatmap
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-[10px]">Less</span>
            <span className="h-2.5 w-2.5 rounded-xs bg-slate-100 dark:bg-slate-800" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-200 dark:bg-blue-900" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-400 dark:bg-blue-700" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-600" />
            <span className="text-[10px]">More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {heatmapData.map((cell, idx) => {
              let bg = 'bg-slate-100 dark:bg-slate-800'
              if (cell.count === 1) bg = 'bg-blue-200 dark:bg-blue-900'
              else if (cell.count === 2) bg = 'bg-blue-400 dark:bg-blue-700'
              else if (cell.count >= 3) bg = 'bg-blue-600'

              return (
                <div
                  key={idx}
                  title={`${cell.date}: ${cell.count} habits completed`}
                  className={`h-3.5 w-3.5 rounded-xs ${bg} cursor-pointer hover:ring-1 hover:ring-blue-500`}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Habit Breakdown Table */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Habit Performance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium uppercase text-[10px]">
                <th className="py-2 px-2">Habit</th>
                <th className="py-2 px-2">Category</th>
                <th className="py-2 px-2">Current Streak</th>
                <th className="py-2 px-2">Total Completions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {habits.map((h) => (
                <tr key={h.id}>
                  <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-slate-100">
                    {h.title}
                  </td>
                  <td className="py-2.5 px-2 text-slate-400">
                    {h.category || 'General'}
                  </td>
                  <td className="py-2.5 px-2 font-mono">
                    {h.streak || 0} days
                  </td>
                  <td className="py-2.5 px-2 font-mono">
                    {h.history?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage
