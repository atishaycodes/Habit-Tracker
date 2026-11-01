import React, { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react'

const AppContext = createContext()

// Clean categories with neutral / subtle accents
export const CATEGORIES = [
  { id: 'Health', label: 'Health', color: '#16A34A' },
  { id: 'Fitness', label: 'Fitness', color: '#D97706' },
  { id: 'Work', label: 'Work', color: '#2563EB' },
  { id: 'Learning', label: 'Learning', color: '#3B82F6' },
  { id: 'Personal', label: 'Personal', color: '#64748B' },
  { id: 'Mindfulness', label: 'Mindfulness', color: '#0EA5E9' },
]

export const TIME_OF_DAY_OPTIONS = [
  { id: 'morning', label: 'Morning' },
  { id: 'afternoon', label: 'Afternoon' },
  { id: 'evening', label: 'Evening' },
  { id: 'anytime', label: 'Anytime' },
]

// Date helper functions
export const getDaysAgoStr = (daysAgo) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

export const getTodayStr = () => new Date().toISOString().split('T')[0]

// Filter out old demo seed IDs from localStorage to guarantee clean slate for user
const filterDemoRecords = (arr) => {
  if (!Array.isArray(arr)) return []
  return arr.filter((item) => {
    if (!item || !item.id) return false
    const idStr = String(item.id)
    // Legacy mock IDs start with h_1, h_2... t_1, fs_1, g_1, routine_1
    return !/^(h_[0-9]|t_[0-9]|fs_[0-9]|g_[0-9]|routine_[0-9]|notif_[0-9])/.test(idStr)
  })
}

// Sample data bundle (ONLY loaded on explicit user request in Settings or empty state)
export const getSampleData = () => {
  const today = getTodayStr()
  const yesterday = getDaysAgoStr(1)
  const twoDaysAgo = getDaysAgoStr(2)

  return {
    habits: [
      {
        id: `sample_h_${Date.now()}_1`,
        title: 'Drink 2L water',
        category: 'Health',
        timeOfDay: 'morning',
        type: 'count',
        target: 4,
        currentCount: 4,
        unit: 'glasses',
        streak: 3,
        bestStreak: 7,
        frequency: 'daily',
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        reminderTime: '08:00 AM',
        difficulty: 'easy',
        notes: 'Stay hydrated throughout morning work block.',
        completed: true,
        history: [today, yesterday, twoDaysAgo],
        archived: false,
      },
      {
        id: `sample_h_${Date.now()}_2`,
        title: 'Read 15 pages',
        category: 'Learning',
        timeOfDay: 'evening',
        type: 'count',
        target: 15,
        currentCount: 0,
        unit: 'pages',
        streak: 2,
        bestStreak: 5,
        frequency: 'daily',
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        reminderTime: '09:00 PM',
        difficulty: 'medium',
        notes: '',
        completed: false,
        history: [yesterday, twoDaysAgo],
        archived: false,
      },
      {
        id: `sample_h_${Date.now()}_3`,
        title: 'Morning stretch',
        category: 'Fitness',
        timeOfDay: 'morning',
        type: 'duration',
        target: 15,
        currentCount: 15,
        unit: 'mins',
        streak: 1,
        bestStreak: 4,
        frequency: 'daily',
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        reminderTime: '07:30 AM',
        difficulty: 'easy',
        notes: 'Gentle mobility routine.',
        completed: true,
        history: [today],
        archived: false,
      },
    ],
    tasks: [
      {
        id: `sample_t_${Date.now()}_1`,
        title: 'Organize weekly priorities',
        description: 'Review calendar and set top goals for this week.',
        deadline: today,
        priority: 'high',
        status: 'todo',
        category: 'Work',
        subtasks: [
          { id: 'st_1', title: 'Check deadlines', completed: true },
          { id: 'st_2', title: 'Schedule deep work blocks', completed: false },
        ],
        createdAt: yesterday,
        completedAt: null,
      },
    ],
    routines: [
      {
        id: `sample_r_${Date.now()}_1`,
        title: 'Morning Kickoff',
        description: 'Hydrate, stretch, and get ready for the day.',
        timeOfDay: 'morning',
        habitIds: [],
        estimatedMinutes: 20,
        completedDates: [],
      },
    ],
    goals: [
      {
        id: `sample_g_${Date.now()}_1`,
        title: 'Read 12 books this year',
        description: 'Maintain regular non-fiction reading.',
        targetValue: 12,
        currentValue: 3,
        unit: 'books',
        deadline: '2026-12-31',
        category: 'Learning',
        milestones: [
          { id: 'm_1', title: 'Read 3 books (Q1)', target: 3, completed: true },
          { id: 'm_2', title: 'Read 6 books (Q2)', target: 6, completed: false },
        ],
      },
    ],
  }
}

const defaultUserSettings = {
  name: 'Atishay',
  email: 'atishay@example.com',
  notificationsEnabled: true,
  soundEnabled: false,
  weekStartsOn: 'Monday',
  defaultFocusTime: 25,
  workspace: 'My Workspace',
}

export const AppProvider = ({ children }) => {
  // Theme state: defaults to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('habitflow_theme') || 'light'
  })
  const isDark = theme === 'dark'

  useEffect(() => {
    localStorage.setItem('habitflow_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // User Settings
  const [userSettings, setUserSettings] = useState(() => {
    const saved = localStorage.getItem('habitflow_userSettings')
    return saved ? JSON.parse(saved) : defaultUserSettings
  })

  useEffect(() => {
    localStorage.setItem('habitflow_userSettings', JSON.stringify(userSettings))
  }, [userSettings])

  const updateUserSettings = (newSettings) => {
    setUserSettings((prev) => ({ ...prev, ...newSettings }))
    addToast('Settings updated', 'success')
  }

  // Habits: Empty by default for authentic user experience
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habitflow_habits')
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return filterDemoRecords(parsed)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('habitflow_habits', JSON.stringify(habits))
  }, [habits])

  // Routines: Empty by default
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem('habitflow_routines')
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return filterDemoRecords(parsed)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('habitflow_routines', JSON.stringify(routines))
  }, [routines])

  // Tasks: Empty by default
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('habitflow_tasks')
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return filterDemoRecords(parsed)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('habitflow_tasks', JSON.stringify(tasks))
  }, [tasks])

  // Goals: Empty by default
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('habitflow_goals')
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return filterDemoRecords(parsed)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('habitflow_goals', JSON.stringify(goals))
  }, [goals])

  // Focus Sessions: Empty by default
  const [focusSessions, setFocusSessions] = useState(() => {
    const saved = localStorage.getItem('habitflow_focus_sessions')
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return filterDemoRecords(parsed)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('habitflow_focus_sessions', JSON.stringify(focusSessions))
  }, [focusSessions])

  // Notifications: Empty by default
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('habitflow_notifications')
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return filterDemoRecords(parsed)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('habitflow_notifications', JSON.stringify(notifications))
  }, [notifications])

  // Toast System with Undo
  const [toast, setToast] = useState(null)
  const toastTimeoutRef = useRef(null)

  const addToast = (message, type = 'success', undoCallback = null) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast({
      id: Date.now(),
      message,
      type,
      undoCallback,
    })
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  const dismissToast = () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast(null)
  }

  const handleUndo = () => {
    if (toast?.undoCallback) {
      toast.undoCallback()
      dismissToast()
    }
  }

  // --- Habit Operations ---
  const addHabit = (habitData) => {
    const newHabit = {
      id: `usr_h_${Date.now()}`,
      streak: 0,
      bestStreak: 0,
      completed: false,
      history: [],
      currentCount: 0,
      archived: false,
      timeOfDay: habitData.timeOfDay || 'anytime',
      category: habitData.category || 'General',
      frequency: habitData.frequency || 'daily',
      type: habitData.type || 'boolean',
      target: habitData.target ? Number(habitData.target) : 1,
      unit: habitData.unit || (habitData.type === 'count' ? 'times' : habitData.type === 'duration' ? 'mins' : ''),
      difficulty: habitData.difficulty || 'medium',
      reminderTime: habitData.reminderTime || '',
      notes: habitData.notes || '',
      ...habitData,
    }
    setHabits((prev) => [newHabit, ...prev])
    addToast(`Habit "${newHabit.title}" created`, 'success')
    return newHabit
  }

  const editHabit = (id, updatedData) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updatedData } : h))
    )
    addToast('Habit updated', 'success')
  }

  const deleteHabit = (id) => {
    const habitToDelete = habits.find((h) => h.id === id)
    setHabits((prev) => prev.filter((h) => h.id !== id))
    addToast(`Deleted "${habitToDelete?.title || 'Habit'}"`, 'info', () => {
      if (habitToDelete) {
        setHabits((prev) => [habitToDelete, ...prev])
      }
    })
  }

  const toggleArchiveHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, archived: !h.archived } : h))
    )
    addToast('Habit status updated', 'info')
  }

  // Toggle habit completion with undo support
  const toggleHabitCompletion = (id) => {
    const todayStr = getTodayStr()
    const currentHabit = habits.find((h) => h.id === id)
    if (!currentHabit) return

    const wasCompleted = currentHabit.completed
    const willBeCompleted = !wasCompleted

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          let newStreak = habit.streak || 0
          let newBestStreak = habit.bestStreak || newStreak
          let newHistory = [...(habit.history || [])]
          let newCurrentCount = habit.currentCount || 0

          if (willBeCompleted) {
            newStreak += 1
            if (newStreak > newBestStreak) newBestStreak = newStreak
            if (!newHistory.includes(todayStr)) {
              newHistory.push(todayStr)
            }
            newCurrentCount = habit.target || 1
          } else {
            newStreak = Math.max(0, newStreak - 1)
            newHistory = newHistory.filter((d) => d !== todayStr)
            newCurrentCount = 0
          }

          return {
            ...habit,
            completed: willBeCompleted,
            streak: newStreak,
            bestStreak: newBestStreak,
            history: newHistory,
            currentCount: newCurrentCount,
          }
        }
        return habit
      })
    )

    if (willBeCompleted) {
      addToast(`Completed "${currentHabit.title}"`, 'success', () => {
        toggleHabitCompletion(id)
      })
    } else {
      addToast(`Marked "${currentHabit.title}" incomplete`, 'info', () => {
        toggleHabitCompletion(id)
      })
    }
  }

  const updateHabitProgress = (id, delta) => {
    const todayStr = getTodayStr()
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const newCount = Math.max(0, (habit.currentCount || 0) + delta)
          const target = habit.target || 1
          const isNowCompleted = newCount >= target
          let newStreak = habit.streak || 0
          let newBestStreak = habit.bestStreak || newStreak
          let newHistory = [...(habit.history || [])]

          if (isNowCompleted && !habit.completed) {
            newStreak += 1
            if (newStreak > newBestStreak) newBestStreak = newStreak
            if (!newHistory.includes(todayStr)) newHistory.push(todayStr)
          } else if (!isNowCompleted && habit.completed) {
            newStreak = Math.max(0, newStreak - 1)
            newHistory = newHistory.filter((d) => d !== todayStr)
          }

          return {
            ...habit,
            currentCount: newCount,
            completed: isNowCompleted,
            streak: newStreak,
            bestStreak: newBestStreak,
            history: newHistory,
          }
        }
        return habit
      })
    )
  }

  // --- Routine Operations ---
  const addRoutine = (routineData) => {
    const newRoutine = {
      id: `usr_routine_${Date.now()}`,
      completedDates: [],
      ...routineData,
    }
    setRoutines((prev) => [...prev, newRoutine])
    addToast(`Routine "${newRoutine.title}" created`, 'success')
  }

  const completeRoutineForToday = (routineId) => {
    const todayStr = getTodayStr()
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id === routineId) {
          const completedDates = r.completedDates?.includes(todayStr)
            ? r.completedDates
            : [...(r.completedDates || []), todayStr]
          return { ...r, completedDates }
        }
        return r
      })
    )
    addToast('Routine completed', 'success')
  }

  // --- Task Operations ---
  const addTask = (taskData) => {
    const newTask = {
      id: `usr_t_${Date.now()}`,
      status: 'todo',
      subtasks: [],
      createdAt: getTodayStr(),
      completedAt: null,
      ...taskData,
    }
    setTasks((prev) => [newTask, ...prev])
    addToast(`Task "${newTask.title}" added`, 'success')
  }

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
    addToast(`Deleted task "${taskToDelete?.title || ''}"`, 'info', () => {
      if (taskToDelete) setTasks((prev) => [taskToDelete, ...prev])
    })
  }

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'todo' : 'completed'
          return {
            ...t,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? getTodayStr() : null,
          }
        }
        return t
      })
    )
  }

  // --- Goal Operations ---
  const addGoal = (goalData) => {
    const newGoal = {
      id: `usr_g_${Date.now()}`,
      currentValue: 0,
      milestones: [],
      ...goalData,
    }
    setGoals((prev) => [...prev, newGoal])
    addToast(`Goal "${newGoal.title}" created`, 'success')
  }

  const updateGoalProgress = (id, newValue) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const updatedVal = Math.max(0, newValue)
          const updatedMilestones = (g.milestones || []).map((m) => ({
            ...m,
            completed: updatedVal >= m.target,
          }))
          return { ...g, currentValue: updatedVal, milestones: updatedMilestones }
        }
        return g
      })
    )
  }

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
    addToast('Goal removed', 'info')
  }

  // --- Focus Timer ---
  const [timerMode, setTimerMode] = useState('focus')
  const [timerDuration, setTimerDuration] = useState(25 * 60)
  const [timerLeft, setTimerLeft] = useState(25 * 60)
  const [timerIsRunning, setTimerIsRunning] = useState(false)
  const [timerLinkedHabit, setTimerLinkedHabit] = useState(null)
  const [timerLinkedTask, setTimerLinkedTask] = useState(null)

  useEffect(() => {
    let interval = null
    if (timerIsRunning && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => prev - 1)
      }, 1000)
    } else if (timerIsRunning && timerLeft === 0) {
      setTimerIsRunning(false)
      const durationMins = Math.round(timerDuration / 60)
      const newSession = {
        id: `usr_fs_${Date.now()}`,
        durationMinutes: durationMins,
        type: timerMode,
        habitId: timerLinkedHabit,
        taskId: timerLinkedTask,
        date: getTodayStr(),
        timestamp: Date.now(),
        notes: `Completed ${durationMins}m ${timerMode.replace('_', ' ')} session`,
      }
      setFocusSessions((prev) => [newSession, ...prev])
      addToast(`Focus session completed: ${durationMins} minutes`, 'success')

      if (timerLinkedHabit) {
        updateHabitProgress(timerLinkedHabit, durationMins)
      }
    }
    return () => clearInterval(interval)
  }, [timerIsRunning, timerLeft, timerDuration, timerMode, timerLinkedHabit, timerLinkedTask])

  const startTimer = () => setTimerIsRunning(true)
  const pauseTimer = () => setTimerIsRunning(false)
  const resetTimer = () => {
    setTimerIsRunning(false)
    setTimerLeft(timerDuration)
  }
  const changeTimerMode = (mode, customMinutes = null) => {
    setTimerIsRunning(false)
    setTimerMode(mode)
    let minutes = 25
    if (customMinutes) minutes = customMinutes
    else if (mode === 'focus') minutes = 25
    else if (mode === 'short_break') minutes = 5
    else if (mode === 'long_break') minutes = 15

    const secs = minutes * 60
    setTimerDuration(secs)
    setTimerLeft(secs)
  }

  // --- Command Palette & Modals State ---
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [quickAddModal, setQuickAddModal] = useState({ isOpen: false, type: 'habit', timeOfDay: null })
  const [activeRoutineRunner, setActiveRoutineRunner] = useState(null)

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // --- Derived Statistics from Actual Data Only (No fabricated numbers) ---
  const stats = useMemo(() => {
    const activeHabits = habits.filter((h) => !h.archived)
    const totalActive = activeHabits.length
    const completedToday = activeHabits.filter((h) => h.completed).length
    const todayCompletionRate = totalActive ? Math.round((completedToday / totalActive) * 100) : 0
    const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0, h.bestStreak || 0), 0)
    const currentStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0)

    // Focus time in last 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const weekFocusMinutes = focusSessions
      .filter((s) => s.timestamp >= sevenDaysAgo)
      .reduce((sum, s) => sum + (s.durationMinutes || 0), 0)

    // Weekly consistency (actual past 7 days)
    let weekTotalOpp = 0
    let weekTotalDone = 0
    for (let i = 0; i < 7; i++) {
      const dStr = getDaysAgoStr(i)
      activeHabits.forEach((h) => {
        weekTotalOpp++
        if (h.history?.includes(dStr)) weekTotalDone++
      })
    }
    const weeklyRate = weekTotalOpp ? Math.round((weekTotalDone / weekTotalOpp) * 100) : (totalActive ? todayCompletionRate : 0)

    const morningHabits = activeHabits.filter((h) => h.timeOfDay === 'morning')
    const afternoonHabits = activeHabits.filter((h) => h.timeOfDay === 'afternoon')
    const eveningHabits = activeHabits.filter((h) => h.timeOfDay === 'evening')

    return {
      totalActive,
      completedToday,
      todayCompletionRate,
      bestStreak,
      currentStreak,
      weekFocusMinutes,
      weeklyRate,
      morningCount: morningHabits.length,
      morningCompleted: morningHabits.filter((h) => h.completed).length,
      afternoonCount: afternoonHabits.length,
      afternoonCompleted: afternoonHabits.filter((h) => h.completed).length,
      eveningCount: eveningHabits.length,
      eveningCompleted: eveningHabits.filter((h) => h.completed).length,
    }
  }, [habits, focusSessions])

  // Current Time of day
  const currentTimeSlot = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 17) return 'afternoon'
    return 'evening'
  }, [])

  // Explicit Sample Data Loader (Optional for exploration)
  const loadSampleData = () => {
    const sample = getSampleData()
    setHabits(sample.habits)
    setTasks(sample.tasks)
    setRoutines(sample.routines)
    setGoals(sample.goals)
    addToast('Sample data loaded for exploration', 'info')
  }

  // Check if sample / mock data is present
  const hasSampleData = useMemo(() => {
    return (
      habits.some((h) => String(h.id).startsWith('sample_')) ||
      routines.some((r) => String(r.id).startsWith('sample_')) ||
      tasks.some((t) => String(t.id).startsWith('sample_')) ||
      goals.some((g) => String(g.id).startsWith('sample_'))
    )
  }, [habits, routines, tasks, goals])

  // Remove mock/sample data only
  const removeMockData = () => {
    setHabits((prev) => prev.filter((h) => !String(h.id).startsWith('sample_')))
    setTasks((prev) => prev.filter((t) => !String(t.id).startsWith('sample_')))
    setRoutines((prev) => prev.filter((r) => !String(r.id).startsWith('sample_')))
    setGoals((prev) => prev.filter((g) => !String(g.id).startsWith('sample_')))
    addToast('Mock sample data removed', 'info')
  }

  // Clear all data to start completely fresh
  const clearAllData = () => {
    setHabits([])
    setTasks([])
    setRoutines([])
    setGoals([])
    setFocusSessions([])
    setNotifications([])
    localStorage.removeItem('habitflow_habits')
    localStorage.removeItem('habitflow_tasks')
    localStorage.removeItem('habitflow_routines')
    localStorage.removeItem('habitflow_goals')
    localStorage.removeItem('habitflow_focus_sessions')
    localStorage.removeItem('habitflow_notifications')
    addToast('All data cleared. Welcome to your fresh workspace!', 'success')
  }

  // Export / Import
  const exportDataJSON = () => {
    const data = {
      habits,
      routines,
      tasks,
      goals,
      focusSessions,
      userSettings,
      exportedAt: new Date().toISOString(),
      version: 'HabitFlow-SaaS',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `HabitFlow_Backup_${getTodayStr()}.json`
    a.click()
    URL.revokeObjectURL(url)
    addToast('Data exported as JSON', 'success')
  }

  const exportDataCSV = () => {
    const headers = 'ID,Title,Category,TimeOfDay,Type,Target,CurrentCount,Streak,Completed\n'
    const rows = habits
      .map(
        (h) =>
          `"${h.id}","${(h.title || '').replace(/"/g, '""')}","${h.category}","${h.timeOfDay}","${h.type}",${h.target},${h.currentCount || 0},${h.streak},${h.completed}`
      )
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `HabitFlow_Habits_${getTodayStr()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    addToast('Habits exported as CSV', 'success')
  }

  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (parsed.habits) setHabits(parsed.habits)
      if (parsed.routines) setRoutines(parsed.routines)
      if (parsed.tasks) setTasks(parsed.tasks)
      if (parsed.goals) setGoals(parsed.goals)
      if (parsed.focusSessions) setFocusSessions(parsed.focusSessions)
      if (parsed.userSettings) setUserSettings(parsed.userSettings)
      addToast('Data imported successfully', 'success')
      return true
    } catch (_err) {
      addToast('Failed to parse JSON file', 'danger')
      return false
    }
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,

        userSettings,
        updateUserSettings,

        habits,
        addHabit,
        editHabit,
        deleteHabit,
        toggleHabitCompletion,
        updateHabitProgress,
        toggleArchiveHabit,

        routines,
        addRoutine,
        completeRoutineForToday,
        activeRoutineRunner,
        setActiveRoutineRunner,

        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,

        goals,
        addGoal,
        updateGoalProgress,
        deleteGoal,

        focusSessions,
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

        notifications,
        setNotifications,

        toast,
        addToast,
        dismissToast,
        handleUndo,

        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        quickAddModal,
        setQuickAddModal,

        stats,
        currentTimeSlot,

        loadSampleData,
        hasSampleData,
        removeMockData,
        clearAllData,
        exportDataJSON,
        exportDataCSV,
        importDataJSON,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
