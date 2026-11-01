import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  Flame,
  Clock3,
  BarChart3,
  CheckSquare,
  Repeat2,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'

const TABS = [
  { id: 'overview', label: 'Daily Habits', icon: Repeat2 },
  { id: 'focus', label: 'Focus Timer', icon: Clock3 },
  { id: 'analytics', label: 'Activity Heatmap', icon: BarChart3 },
  { id: 'tasks', label: 'Kanban Tasks', icon: CheckSquare },
]

const InteractiveProductDemo = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Cursor animation coordinates & click state
  const [cursorPos, setCursorPos] = useState({ x: 12, y: 12, opacity: 0, isClicking: false })
  const containerRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const autoScriptRef = useRef(null)

  // Interactive state for Scene 1 (Habits)
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 2L water', category: 'Health', count: '4/4 glasses', completed: true, streak: 7 },
    { id: 2, name: 'Morning stretch & movement', category: 'Fitness', count: '15 mins', completed: true, streak: 4 },
    { id: 3, name: 'Read 15 pages', category: 'Learning', count: '0/15 pages', completed: false, streak: 2 },
  ])

  // Interactive state for Scene 2 (Focus Timer)
  const [focusSeconds, setFocusSeconds] = useState(25 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [focusMode, setFocusMode] = useState('pomodoro')

  // Interactive state for Scene 3 (Heatmap hovered square)
  const [hoveredSquare, setHoveredSquare] = useState(null)

  // Interactive state for Scene 4 (Tasks)
  const [taskDone, setTaskDone] = useState(false)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning) return
    const interval = setInterval(() => {
      setFocusSeconds((prev) => (prev > 0 ? prev - 1 : 25 * 60))
    }, 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Handle manual user interaction: pause automated cursor tour
  const handleUserInteraction = useCallback(() => {
    setIsUserInteracting(true)
    setCursorPos((prev) => ({ ...prev, opacity: 0 }))

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, 8000) // Resume tour after 8 seconds of inactivity
  }, [])

  // Toggle habit checkmark
  const toggleHabit = (id) => {
    handleUserInteraction()
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const next = !h.completed
          return {
            ...h,
            completed: next,
            count: next ? (h.id === 3 ? '15/15 pages' : h.count) : (h.id === 3 ? '0/15 pages' : h.count),
            streak: next ? h.streak + 1 : Math.max(0, h.streak - 1),
          }
        }
        return h
      })
    )
  }

  // Automated Script: Cycles through the 4 features with realistic mouse glide & clicks
  useEffect(() => {
    if (isUserInteracting || prefersReducedMotion) {
      if (autoScriptRef.current) clearTimeout(autoScriptRef.current)
      return
    }

    let isMounted = true

    // Step sequence with realistic timings
    const sequence = [
      // 1. Move to "Daily Habits" tab and click
      {
        delay: 500,
        action: () => {
          setCursorPos({ x: 14, y: 10, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 1100,
        action: () => {
          setCursorPos({ x: 14, y: 10, opacity: 1, isClicking: true })
          setActiveTab('overview')
        },
      },
      {
        delay: 1400,
        action: () => {
          setCursorPos({ x: 14, y: 10, opacity: 1, isClicking: false })
        },
      },
      // Move to third habit ("Read 15 pages") checkbox and click it
      {
        delay: 2200,
        action: () => {
          setCursorPos({ x: 12, y: 72, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 2900,
        action: () => {
          setCursorPos({ x: 12, y: 72, opacity: 1, isClicking: true })
          setHabits((prev) =>
            prev.map((h) =>
              h.id === 3
                ? { ...h, completed: true, count: '15/15 pages', streak: 3 }
                : h
            )
          )
        },
      },
      {
        delay: 3200,
        action: () => {
          setCursorPos({ x: 12, y: 72, opacity: 1, isClicking: false })
        },
      },

      // 2. Move to "Focus Timer" tab and click
      {
        delay: 5000,
        action: () => {
          setCursorPos({ x: 38, y: 10, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 5600,
        action: () => {
          setCursorPos({ x: 38, y: 10, opacity: 1, isClicking: true })
          setActiveTab('focus')
        },
      },
      {
        delay: 5900,
        action: () => {
          setCursorPos({ x: 38, y: 10, opacity: 1, isClicking: false })
        },
      },
      // Move to "Start" timer button and click
      {
        delay: 6800,
        action: () => {
          setCursorPos({ x: 50, y: 76, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 7400,
        action: () => {
          setCursorPos({ x: 50, y: 76, opacity: 1, isClicking: true })
          setIsTimerRunning(true)
        },
      },
      {
        delay: 7700,
        action: () => {
          setCursorPos({ x: 50, y: 76, opacity: 1, isClicking: false })
        },
      },

      // 3. Move to "Activity Heatmap" tab and click
      {
        delay: 10500,
        action: () => {
          setCursorPos({ x: 62, y: 10, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 11100,
        action: () => {
          setCursorPos({ x: 62, y: 10, opacity: 1, isClicking: true })
          setActiveTab('analytics')
        },
      },
      {
        delay: 11400,
        action: () => {
          setCursorPos({ x: 62, y: 10, opacity: 1, isClicking: false })
        },
      },
      // Hover over a heatmap cell
      {
        delay: 12300,
        action: () => {
          setCursorPos({ x: 54, y: 58, opacity: 1, isClicking: false })
          setHoveredSquare({ date: 'Today', completions: 4 })
        },
      },

      // 4. Move to "Kanban Tasks" tab and click
      {
        delay: 15500,
        action: () => {
          setHoveredSquare(null)
          setCursorPos({ x: 88, y: 10, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 16100,
        action: () => {
          setCursorPos({ x: 88, y: 10, opacity: 1, isClicking: true })
          setActiveTab('tasks')
        },
      },
      {
        delay: 16400,
        action: () => {
          setCursorPos({ x: 88, y: 10, opacity: 1, isClicking: false })
        },
      },
      // Move to task checklist and complete
      {
        delay: 17200,
        action: () => {
          setCursorPos({ x: 25, y: 55, opacity: 1, isClicking: false })
        },
      },
      {
        delay: 17800,
        action: () => {
          setCursorPos({ x: 25, y: 55, opacity: 1, isClicking: true })
          setTaskDone(true)
        },
      },
      {
        delay: 18100,
        action: () => {
          setCursorPos({ x: 25, y: 55, opacity: 1, isClicking: false })
        },
      },

      // 5. Reset demo loop
      {
        delay: 21500,
        action: () => {
          setCursorPos({ x: 14, y: 10, opacity: 0, isClicking: false })
          setHabits([
            { id: 1, name: 'Drink 2L water', category: 'Health', count: '4/4 glasses', completed: true, streak: 7 },
            { id: 2, name: 'Morning stretch & movement', category: 'Fitness', count: '15 mins', completed: true, streak: 4 },
            { id: 3, name: 'Read 15 pages', category: 'Learning', count: '0/15 pages', completed: false, streak: 2 },
          ])
          setIsTimerRunning(false)
          setFocusSeconds(25 * 60)
          setTaskDone(false)
          setActiveTab('overview')
        },
      },
    ]

    const timeouts = sequence.map(({ delay, action }) =>
      setTimeout(() => {
        if (isMounted) action()
      }, delay)
    )

    // Repeat entire sequence continuously
    const loopTimeout = setTimeout(() => {
      if (isMounted) {
        setActiveTab('overview')
      }
    }, 22000)

    return () => {
      isMounted = false
      timeouts.forEach(clearTimeout)
      clearTimeout(loopTimeout)
    }
  }, [isUserInteracting, prefersReducedMotion])

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const completedHabitsCount = habits.filter((h) => h.completed).length
  const completionPercentage = Math.round((completedHabitsCount / habits.length) * 100)

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleUserInteraction}
      onClick={handleUserInteraction}
      className="relative rounded-2xl border border-[#E2E8F0] bg-white shadow-xl shadow-slate-200/50 overflow-hidden select-none"
    >
      {/* =========================================================================
          1. Clean Browser Frame
         ========================================================================= */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
        </div>

        {/* Minimal URL Bar */}
        <div className="px-3.5 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
          <span className="text-[#94A3B8]">https://</span>
          <span>app.habitflow.com/{activeTab}</span>
        </div>

        {/* Real "Try Live" Action */}
        <Link
          to="/dashboard"
          className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>Try live app</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* =========================================================================
          2. SaaS Feature Navigation Tabs
         ========================================================================= */}
      <div className="flex border-b border-[#E2E8F0] bg-white text-xs font-medium divide-x divide-[#E2E8F0]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => {
                handleUserInteraction()
                setActiveTab(tab.id)
              }}
              className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 transition-all relative ${
                isActive
                  ? 'bg-blue-50/60 text-blue-700 font-semibold border-b-2 border-b-blue-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* =========================================================================
          3. Dynamic Feature Stage
         ========================================================================= */}
      <div className="relative min-h-[385px] bg-[#F8FAFC] p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
        {/* ==========================================================
            FEATURE 1: DAILY HABITS
           ========================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-medium">HabitFlow / Overview</span>
                <h3 className="text-base font-bold text-slate-900">Good afternoon, Atishay</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200/60 font-mono">
                {completedHabitsCount}/{habits.length} ({completionPercentage}%)
              </span>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Habits</span>
                <span className="text-base font-bold text-slate-900">{habits.length} active</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Completed</span>
                <span className="text-base font-bold text-emerald-600 font-mono">{completedHabitsCount} / {habits.length}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Streak</span>
                <span className="text-base font-bold text-amber-500 flex items-center gap-1">
                  7d <Flame className="h-3 w-3 fill-amber-500" />
                </span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Consistency</span>
                <span className="text-base font-bold text-blue-600">{completionPercentage}%</span>
              </div>
            </div>

            {/* Today's Habits List */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>Today's Habits</span>
                <span className="text-[11px] text-slate-400 font-normal">Morning routine</span>
              </div>

              {habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border bg-white transition-all cursor-pointer text-xs ${
                    habit.completed ? 'border-slate-200' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-5 w-5 rounded-md flex items-center justify-center transition-all ${
                        habit.completed
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'border border-slate-300 bg-white hover:border-blue-400'
                      }`}
                    >
                      {habit.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <span className={`font-medium ${habit.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {habit.name}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-2">
                        {habit.category} • {habit.count}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50 flex items-center gap-1 font-mono">
                    🔥 {habit.streak}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            FEATURE 2: FOCUS POMODORO TIMER
           ========================================================== */}
        {activeTab === 'focus' && (
          <div className="space-y-4 flex flex-col items-center justify-center py-2">
            {/* Presets */}
            <div className="inline-flex p-0.5 rounded-lg border border-slate-200 bg-white text-xs">
              <button
                onClick={() => {
                  handleUserInteraction()
                  setFocusMode('pomodoro')
                  setFocusSeconds(25 * 60)
                }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  focusMode === 'pomodoro' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pomodoro (25m)
              </button>
              <button
                onClick={() => {
                  handleUserInteraction()
                  setFocusMode('short')
                  setFocusSeconds(5 * 60)
                }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  focusMode === 'short' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => {
                  handleUserInteraction()
                  setFocusMode('long')
                  setFocusSeconds(15 * 60)
                }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  focusMode === 'long' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Circular Timer Visual */}
            <div className="relative h-44 w-44 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center bg-white shadow-xs">
              <div
                className={`absolute inset-0 rounded-full border-4 border-blue-600 transition-all ${
                  isTimerRunning ? 'opacity-100' : 'opacity-40'
                }`}
                style={{
                  clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)',
                }}
              />
              <span className="text-3xl font-bold font-mono text-slate-900 tracking-tight">
                {formatTimer(focusSeconds)}
              </span>
              <span className="text-[11px] text-slate-400 capitalize mt-1 font-medium">
                {isTimerRunning ? 'Focusing...' : 'Ready to start'}
              </span>
            </div>

            {/* Timer Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  handleUserInteraction()
                  setFocusSeconds(25 * 60)
                  setIsTimerRunning(false)
                }}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  handleUserInteraction()
                  setIsTimerRunning(!isTimerRunning)
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
              >
                {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400">Linked to: Deep Work & Priority Study</span>
          </div>
        )}

        {/* ==========================================================
            FEATURE 3: ACTIVITY HEATMAP
           ========================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-medium">HabitFlow / Analytics</span>
                <h3 className="text-base font-bold text-slate-900">Consistency & Activity Heatmap</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200/50">
                Weekly: 85%
              </span>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Logs</span>
                <span className="text-base font-bold text-slate-900">24 completions</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Best Streak</span>
                <span className="text-base font-bold text-amber-500">7 days 🔥</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Weekly Rate</span>
                <span className="text-base font-bold text-blue-600">85%</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Focus Time</span>
                <span className="text-base font-bold text-emerald-600">125 mins</span>
              </div>
            </div>

            {/* Contribution Grid */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Daily Habit Heatmap</span>
                <span className="text-[10px] text-slate-400">Past 16 weeks</span>
              </div>

              <div className="grid grid-cols-16 gap-1 pt-1.5">
                {Array.from({ length: 80 }).map((_, i) => {
                  const level =
                    i === 42 || i === 43 || i === 79
                      ? 'bg-blue-600'
                      : i % 11 === 0
                      ? 'bg-blue-600'
                      : i % 5 === 0
                      ? 'bg-blue-500'
                      : i % 3 === 0
                      ? 'bg-blue-300'
                      : i % 2 === 0
                      ? 'bg-blue-100'
                      : 'bg-slate-100'
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredSquare({ date: `Day ${i + 1}`, completions: (i % 4) + 1 })}
                      onMouseLeave={() => setHoveredSquare(null)}
                      className={`h-3 w-3 rounded-xs ${level} hover:ring-2 hover:ring-blue-400 cursor-pointer transition-all`}
                    />
                  )
                })}
              </div>

              {hoveredSquare && (
                <div className="text-[10px] text-blue-600 font-medium pt-1">
                  {hoveredSquare.completions} habits completed on {hoveredSquare.date}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-xs bg-slate-100" />
                  <span className="h-2 w-2 rounded-xs bg-blue-100" />
                  <span className="h-2 w-2 rounded-xs bg-blue-300" />
                  <span className="h-2 w-2 rounded-xs bg-blue-600" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================
            FEATURE 4: KANBAN TASKS
           ========================================================== */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-medium">HabitFlow / Tasks</span>
                <h3 className="text-base font-bold text-slate-900">Task Management & Boards</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200/50">
                4 tasks active
              </span>
            </div>

            {/* Fast Add Input */}
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="Plan quarterly milestone review..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-600 outline-none"
              />
              <button
                onClick={handleUserInteraction}
                className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-2xs hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              {/* To Do */}
              <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-700 pb-1 border-b border-slate-100">
                  <span>To Do</span>
                  <span className="text-[10px] text-slate-400 font-mono">1</span>
                </div>
                <div
                  onClick={() => {
                    handleUserInteraction()
                    setTaskDone(!taskDone)
                  }}
                  className="p-2.5 rounded-md border border-slate-200 bg-slate-50/70 space-y-1.5 cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${taskDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      Organize weekly priorities
                    </span>
                    <span className="text-[9px] font-semibold text-amber-700 bg-amber-100 px-1 py-0.5 rounded">High</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <CheckSquare className={`h-3 w-3 ${taskDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{taskDone ? 'Completed' : '2/2 subtasks'}</span>
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-700 pb-1 border-b border-slate-100">
                  <span>In Progress</span>
                  <span className="text-[10px] text-slate-400 font-mono">1</span>
                </div>
                <div className="p-2.5 rounded-md border border-blue-200 bg-blue-50/30 space-y-1">
                  <span className="font-medium text-slate-800 block">Review reading summary</span>
                  <span className="text-[10px] text-blue-600 font-medium">In focus session</span>
                </div>
              </div>

              {/* Completed */}
              <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-700 pb-1 border-b border-slate-100">
                  <span>Completed</span>
                  <span className="text-[10px] text-slate-400 font-mono">2</span>
                </div>
                <div className="p-2 rounded-md border border-slate-100 bg-slate-50 text-slate-400 line-through">
                  Morning workout logged
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. Realistic Simulated Mouse Cursor (Autoplay Tour)
         ========================================================================= */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute z-40 transition-all duration-700 ease-out"
          style={{
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            opacity: cursorPos.opacity,
            transform: `translate(-2px, -2px) scale(${cursorPos.isClicking ? 0.88 : 1})`,
          }}
        >
          {/* Mouse Pointer Arrow */}
          <svg
            className="w-5 h-5 text-slate-900 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M3 3l7 18 3-7 7-3L3 3z" />
          </svg>

          {/* Click Ripple Effect */}
          {cursorPos.isClicking && (
            <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-500/20 animate-ping pointer-events-none" />
          )}
        </div>
      )}
    </div>
  )
}

export default InteractiveProductDemo
