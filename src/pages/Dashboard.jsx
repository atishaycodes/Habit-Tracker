import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  CheckCircle2,
  Repeat2,
  CalendarDays,
  Flame,
  CheckSquare,
  ArrowRight,
  Sparkles,
  MoreHorizontal,
  Trash2,
  Clock3,
  RotateCcw,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Dashboard = () => {
  const {
    habits,
    toggleHabitCompletion,
    updateHabitProgress,
    deleteHabit,
    stats,
    tasks,
    toggleTaskStatus,
    setQuickAddModal,
    loadSampleData,
    hasSampleData,
    removeMockData,
    clearAllData,
  } = useAppContext()

  const navigate = useNavigate()
  const [activeSlotFilter, setActiveSlotFilter] = useState('all') // 'all' | 'morning' | 'afternoon' | 'evening'
  const [menuOpenId, setMenuOpenId] = useState(null)

  // Dynamic greeting based on current time
  const greetingText = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning!'
    if (hour < 17) return 'Good afternoon!'
    return 'Good evening!'
  }, [])

  // Filtered habits for today
  const filteredHabits = useMemo(() => {
    return habits
      .filter((h) => !h.archived)
      .filter((h) => {
        if (activeSlotFilter === 'all') return true
        return h.timeOfDay === activeSlotFilter
      })
  }, [habits, activeSlotFilter])

  // Weekly overview days
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // ==========================================
  // 1. EMPTY STATE (First-time user experience)
  // ==========================================
  if (habits.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6 stroke-[2]" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Welcome to HabitFlow
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md mx-auto">
            Start building a routine that works for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setQuickAddModal({ isOpen: true, type: 'habit', timeOfDay: null })}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              Create your first habit
            </button>
            <button
              onClick={() => navigate('/templates')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Explore habit templates
            </button>
          </div>

          {/* Simple getting started guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="font-mono text-xs font-semibold text-blue-600 block mb-1">
                1. Create
              </span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Choose a small, achievable habit to start.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="font-mono text-xs font-semibold text-blue-600 block mb-1">
                2. Complete
              </span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Check it off daily to build momentum.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="font-mono text-xs font-semibold text-blue-600 block mb-1">
                3. Progress
              </span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Track streaks and review your consistency.
              </p>
            </div>
          </div>

          {/* Optional exploratory sample data button */}
          <div className="mt-8 pt-4">
            <button
              onClick={loadSampleData}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
            >
              Want to see an example? Load sample data
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // 2. ACTIVE DASHBOARD
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Sample Data Notice */}
      {hasSampleData && (
        <div className="flex items-center justify-between px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <span className="text-slate-600 dark:text-slate-400">
            You are previewing sample habit data.
          </span>
          <button
            onClick={() => {
              if (window.confirm('Reset all sample data and start fresh?')) {
                clearAllData()
              }
            }}
            className="px-3 py-1 rounded-md text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            Start Fresh
          </button>
        </div>
      )}

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {greetingText}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Build better habits, one day at a time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {habits.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Reset all habits and progress to start completely fresh?')) {
                  clearAllData()
                }
              }}
              title="Reset all habits and start fresh"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Start Fresh</span>
            </button>
          )}

          <button
            onClick={() => setQuickAddModal({ isOpen: true, type: 'habit', timeOfDay: null })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs w-fit"
          >
            <Plus className="h-4 w-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* 4 Compact Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider">Active Habits</span>
            <Repeat2 className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.totalActive}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">In your routine</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider">Completed Today</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.completedToday} <span className="text-xs font-normal text-slate-400">/ {stats.totalActive}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{stats.todayCompletionRate}% completed</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider">Current Streak</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.currentStreak} <span className="text-xs font-normal text-slate-400">days</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Best: {stats.bestStreak} days</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider">Weekly Progress</span>
            <CalendarDays className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.weeklyRate}%
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Past 7 days average</p>
        </div>
      </div>

      {/* Main Grid: Today's Habits (Left) + Weekly & Tasks (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Habits */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Today's Habits
            </h2>

            {/* Time of Day Filter Tabs */}
            <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
              {['all', 'morning', 'afternoon', 'evening'].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setActiveSlotFilter(slot)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors text-[11px] ${
                    activeSlotFilter === slot
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-semibold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Habits List */}
          <div className="space-y-2">
            {filteredHabits.length === 0 ? (
              <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-xs text-slate-400">
                No habits found for this time of day.
              </div>
            ) : (
              filteredHabits.map((habit) => {
                const isCompleted = habit.completed
                const isMenuOpen = menuOpenId === habit.id

                return (
                  <div
                    key={habit.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                      isCompleted
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Checkbox button */}
                      <button
                        type="button"
                        onClick={() => toggleHabitCompletion(habit.id)}
                        className={`h-5 w-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                          isCompleted
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 hover:border-blue-600'
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium truncate ${
                              isCompleted
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-slate-100'
                            }`}
                          >
                            {habit.title}
                          </span>

                          {habit.streak > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded">
                              <Flame className="h-2.5 w-2.5 fill-amber-500" />
                              {habit.streak}d
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
                          <span className="capitalize">{habit.category || 'General'}</span>
                          {habit.timeOfDay && habit.timeOfDay !== 'anytime' && (
                            <>
                              <span>•</span>
                              <span className="capitalize">{habit.timeOfDay}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stepper if Count / Duration habit */}
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {habit.type !== 'boolean' && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                          <button
                            onClick={() => updateHabitProgress(habit.id, -1)}
                            className="px-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          >
                            -
                          </button>
                          <span className="text-slate-700 dark:text-slate-300 font-medium px-1">
                            {habit.currentCount || 0}/{habit.target} {habit.unit}
                          </span>
                          <button
                            onClick={() => updateHabitProgress(habit.id, 1)}
                            className="px-1 text-blue-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}

                      {/* Options menu */}
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpenId(isMenuOpen ? null : habit.id)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-0 mt-1 w-28 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md p-1 z-20 text-xs">
                            <button
                              onClick={() => {
                                deleteHabit(habit.id)
                                setMenuOpenId(null)
                              }}
                              className="w-full text-left px-2 py-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Weekly Progress & Upcoming Tasks */}
        <div className="space-y-6">
          {/* Weekly Progress Overview */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Weekly Overview
              </h3>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {stats.weeklyRate}% completion
              </span>
            </div>

            {/* Simple neutral bars with blue active state */}
            <div className="flex items-end justify-between h-28 gap-2 pt-2">
              {weekDays.map((day, idx) => {
                // Today is Sunday/last index
                const isCurrentDay = idx === 6
                const heightPct = isCurrentDay ? Math.max(10, stats.todayCompletionRate) : (stats.totalActive ? 60 : 0)

                return (
                  <div key={day} className="flex flex-col items-center flex-1 h-full justify-end gap-1.5">
                    <div className="w-full max-w-[20px] h-full flex items-end rounded bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`w-full rounded transition-all duration-300 ${
                          isCurrentDay ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">
                      {day}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Upcoming Tasks (Only displayed if user has created tasks) */}
          {tasks.length > 0 && (
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tasks
                </h3>
                <button
                  onClick={() => navigate('/tasks')}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="space-y-2">
                {tasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`h-3.5 w-3.5 rounded flex items-center justify-center border ${
                          task.status === 'completed'
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {task.status === 'completed' && <CheckCircle2 className="h-2.5 w-2.5 stroke-[3]" />}
                      </button>
                      <span className={`truncate ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
