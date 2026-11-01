import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Plus,
  Repeat2,
  Search,
  CheckCircle2,
  Trash2,
  Archive,
  Flame,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { useAppContext, CATEGORIES } from '../context/AppContext'

const HabitsPage = () => {
  const {
    habits,
    toggleHabitCompletion,
    deleteHabit,
    toggleArchiveHabit,
    setQuickAddModal,
    hasSampleData,
    removeMockData,
    clearAllData,
  } = useAppContext()

  const [searchParams, setSearchParams] = useSearchParams()
  const slotParam = searchParams.get('slot')

  const [timeFilter, setTimeFilter] = useState(slotParam || 'all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('streak')

  useEffect(() => {
    if (slotParam) {
      setTimeFilter(slotParam)
    }
  }, [slotParam])

  const processedHabits = useMemo(() => {
    return habits
      .filter((h) => {
        if (statusFilter === 'active') return !h.archived
        if (statusFilter === 'archived') return h.archived
        return true
      })
      .filter((h) => {
        if (timeFilter !== 'all') return h.timeOfDay === timeFilter
        return true
      })
      .filter((h) => {
        if (categoryFilter !== 'all') return h.category === categoryFilter
        return true
      })
      .filter((h) => {
        if (searchQuery.trim() !== '') {
          return (
            (h.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (h.notes && h.notes.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'streak') return (b.streak || 0) - (a.streak || 0)
        if (sortBy === 'name') return (a.title || '').localeCompare(b.title || '')
        return 0
      })
  }, [habits, statusFilter, timeFilter, categoryFilter, searchQuery, sortBy])

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Habits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your daily habits and tracking schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {habits.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Reset all habits and data to start completely fresh?')) {
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
            onClick={() =>
              setQuickAddModal({
                isOpen: true,
                type: 'habit',
                timeOfDay: timeFilter !== 'all' ? timeFilter : null,
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs w-fit"
          >
            <Plus className="h-4 w-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search habits..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-transparent text-slate-700 dark:text-slate-300 outline-none"
            >
              <option value="streak">Streak</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Time of Day */}
          <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px]">
            {['all', 'morning', 'afternoon', 'evening'].map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  setTimeFilter(slot)
                  if (slot === 'all') searchParams.delete('slot')
                  else searchParams.set('slot', slot)
                  setSearchParams(searchParams)
                }}
                className={`px-2.5 py-0.5 rounded capitalize font-medium transition-colors ${
                  timeFilter === slot
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2 py-1 text-[11px] rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Status */}
          <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] ml-auto">
            {['active', 'archived', 'all'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-0.5 rounded capitalize font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-2.5">
        {processedHabits.length === 0 ? (
          <div className="p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
            <div className="h-10 w-10 rounded-lg mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
              <Repeat2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No habits found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Get started by adding your first daily habit to build your routine.
            </p>
            <button
              onClick={() => setQuickAddModal({ isOpen: true, type: 'habit', timeOfDay: null })}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Add Habit
            </button>
          </div>
        ) : (
          processedHabits.map((habit) => {
            const isCompleted = habit.completed
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-xs"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
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
                        className={`font-medium ${
                          isCompleted
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {habit.title}
                      </span>

                      {habit.streak > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded">
                          <Flame className="h-2.5 w-2.5 fill-amber-500" />
                          {habit.streak}d
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>{habit.category || 'General'}</span>
                      {habit.timeOfDay && habit.timeOfDay !== 'anytime' && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{habit.timeOfDay}</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="capitalize">{habit.frequency || 'Daily'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={() => toggleArchiveHabit(habit.id)}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title={habit.archived ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default HabitsPage
