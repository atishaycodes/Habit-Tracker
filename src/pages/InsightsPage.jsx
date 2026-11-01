import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Lightbulb,
  ArrowRight,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const InsightsPage = () => {
  const {
    habits,
    focusSessions,
    stats,
  } = useAppContext()

  const navigate = useNavigate()

  // Real data only: Calculate honest observations
  const observations = useMemo(() => {
    const list = []
    if (habits.length === 0) return list

    // 1. Completion rate observation
    if (stats.totalActive > 0) {
      list.push({
        id: 'obs_completion',
        title: `Today's completion rate is ${stats.todayCompletionRate}%`,
        description: `You have completed ${stats.completedToday} of your ${stats.totalActive} active habits scheduled for today.`,
        stat: `${stats.todayCompletionRate}%`,
        actionText: 'View habits',
        action: () => navigate('/habits'),
      })
    }

    // 2. Longest streak habit
    const topStreakHabit = habits.reduce((best, h) =>
      (h.streak || 0) > (best?.streak || 0) ? h : best, null)

    if (topStreakHabit && topStreakHabit.streak > 0) {
      list.push({
        id: 'obs_streak',
        title: `"${topStreakHabit.title}" is your most consistent habit`,
        description: `Current streak of ${topStreakHabit.streak} days. Keep completing it daily to maintain momentum.`,
        stat: `${topStreakHabit.streak} days`,
        actionText: 'Go to habits',
        action: () => navigate('/habits'),
      })
    }

    // 3. Weekly focus logged
    if (stats.weekFocusMinutes > 0) {
      const hours = Math.floor(stats.weekFocusMinutes / 60)
      const mins = stats.weekFocusMinutes % 60
      const displayTime = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`

      list.push({
        id: 'obs_focus',
        title: `${displayTime} of focus time logged this week`,
        description: `Tracked across ${focusSessions.length} total sessions.`,
        stat: displayTime,
        actionText: 'Open focus timer',
        action: () => navigate('/focus'),
      })
    }

    return list
  }, [habits, focusSessions, stats, navigate])

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Observations derived from your actual habit completions.
        </p>
      </div>

      {observations.length === 0 ? (
        <div className="p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
          <div className="h-10 w-10 rounded-lg mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No insights available yet
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Insights will appear here as you log habits and focus sessions over time.
          </p>
          <button
            onClick={() => navigate('/habits')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Start tracking
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {observations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <span className="text-base font-bold text-blue-600 font-mono">
                  {item.stat}
                </span>
                <button
                  onClick={item.action}
                  className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InsightsPage
